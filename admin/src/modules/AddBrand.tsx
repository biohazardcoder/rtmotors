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
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";

export function AddBrand() {
  const [formData, setFormData] = useState({
    url: "",
    title: ""
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { mutate } = useSWR("/brand", fetcher)
  
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.url.trim()) newErrors.url = "Url is required.";
    if (!formData.title.trim()) newErrors.title = "Title is required.";
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
      body.append("title", formData.title);

      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.post("/brand", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      mutate()
      toast.success("Brand added successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error adding brand.");
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
        <Button variant="default" className="bg-[#003939] hover:bg-[#003939] cursor-pointer">Add Brand</Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Brand</SheetTitle>
        <SheetDescription>All fields are required</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 mt-2">
          {["url", "title"].map((field) => (
            <div className="space-y-1" key={field}>
              <Label htmlFor={field}>
                {{
                  url: "Url *",
                  title: "Title *",
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
              className={errors.images ? "border-red-500" : ""}
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
