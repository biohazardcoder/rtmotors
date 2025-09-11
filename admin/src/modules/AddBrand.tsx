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
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setBrand, setError, setLoading } from "@/toolkit/brandSlicer";
import type { ErrorTypes } from "@/types/RootTypes";

export function AddBrand() {
  const [images, setImages] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
    const dispatch = useDispatch()
    const GetBrands = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("brand")).data
            dispatch(setBrand(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all brands"))
            console.log(error);
        }
    }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!images || images.length === 0) newErrors.images = "At least one image is required.";
    if (!width || width === 0) newErrors.width = "Width must be greater than 0.";
    if (!height || height === 0) newErrors.height = "Height must be greater than 0.";
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
      body.append("width", width.toString() || "");
      body.append("height", height.toString() || "");
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
      GetBrands()
      toast.success("Brand added successfully!");
      setIsSheetOpen(false)
      console.log(isSheetOpen);
      
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
          <div className="space-y-1">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              onChange={(e) => setWidth(Number(e.target.value))}
              className={errors.width ? "border-red-500" : ""}

            />
            {errors.width && (
              <span className="text-red-500 text-sm">{errors.width}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              onChange={(e) => setHeight(Number(e.target.value))}
              className={errors.height ? "border-red-500" : ""}

            />
            {errors.height && (
              <span className="text-red-500 text-sm">{errors.height}</span>
            )}
          </div>
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
