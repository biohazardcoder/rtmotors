import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useDispatch } from "react-redux";
import { setAuction, setError, setLoading } from "@/toolkit/auctionSlicer";
import type { ErrorTypes } from "@/types/RootTypes";
import { cn } from "@/lib/utils";

export function AddAuction() {
  const [formData, setFormData] = useState({
    url: "",
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
       const dispatch = useDispatch()
    const GetAuctions = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("auction")).data
            dispatch(setAuction(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all auction"))
            console.log(error);
        }
    }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.url.trim()) newErrors.url = "Url is required.";
    if (!images || images.length === 0) newErrors.images = "At least one image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const body = new FormData();
      body.append("url", formData.url);

      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

        await Fetch.post("/auction", body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        GetAuctions()
        toast.success("Auction added successfully!");
        setIsSheetOpen(false)
    } catch (error) {
      toast.error("Error adding auction.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="default" className="bg-[#003939] hover:bg-[#003939] cursor-pointer">Add Auction</Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Auction</SheetTitle>
        <SheetDescription>All fields are required</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 mt-2">
          {["url"].map((field) => (
            <div className="space-y-1" key={field}>
              <Label htmlFor={field}>
                {{
                  url: "Url *",
                }[field]}
              </Label>
              <Input
                  id={field}
                  value={(formData as any)[field]}
                  onChange={handleInputChange}
                  className={errors[field] ? "border-red-500" : ""}
                />
              {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
            </div>
          ))}

          <div className="space-y-1">
            <Label htmlFor="images">Logo</Label>
            <Input
              id="images"
              type="file"
              onChange={handleImageChange}
              className={cn("file:cursor-pointer file:px-2 file:rounded file:border-0 file:bg-white file:text-sm file:text-black hover:file:bg-gray-200", errors.images ? "border-red-500" : "" )}
            />
            {errors.images && (
              <span className="text-red-500 text-sm">{errors.images}</span>
            )}
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
