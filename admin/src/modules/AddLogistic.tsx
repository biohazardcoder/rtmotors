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
import { setError, setLogistic } from "@/toolkit/logisticSlicer";
import { useDispatch } from "react-redux";
import type { ErrorTypes } from "@/types/RootTypes";
import { cn } from "@/lib/utils";

export function AddLogistic() {
  const [images, setImages] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
    const dispatch = useDispatch()
    const GetLogistics = async () => {
        try {
            const response = (await Fetch.get("logistic")).data
            dispatch(setLogistic(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all logistics"))
            console.log(error);
        }
    }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!images || images.length === 0) newErrors.images = "At least one image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const body = new FormData();
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.post("/logistic", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      GetLogistics();
      toast.success("Logistic images added successfully!");
      setIsSheetOpen(false)
    } catch (error) {
      toast.error("Error adding logistic images.");
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
        <Button variant="default" className="bg-[#003939] hover:bg-[#003939] cursor-pointer">Add Logistic</Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Logistic</SheetTitle>
          <SheetDescription>Choose only one image</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="images">Image *</Label>
            <Input
              id="images"
              type="file"
              multiple
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
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
