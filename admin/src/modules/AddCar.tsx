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
import type { CarTypes } from "@/types/RootTypes";

export function AddCar() {
  const [formData, setFormData] = useState<CarTypes>({
    _id: "",
    currentPrice: 0,
    description: "",
    fuelType: "",
    miles: 0,
    name: "",
    oldPrice: 0,
    stock: 0,
    transmission: "",
    type: "new",
    year: 0,
    brand: "",
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { mutate } = useSWR("/car", fetcher);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (formData.year <= 0) newErrors.year = "Year is required.";
    if (formData.currentPrice <= 0) newErrors.currentPrice = "Current price is required.";
    if (!images || images.length === 0) newErrors.images = "At least one image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === "year" || id.toLowerCase().includes("price") || id === "miles" || id === "stock"
        ? Number(value) // raqamli inputlar
        : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        body.append(key, String(val));
      });

      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      const res = await Fetch.post("/car", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      mutate((data: any) => [...(data || []), res.data], false); 
      toast.success("Car added successfully!");
      window.location.reload();
      setIsSheetOpen(false);
    } catch (error) {
      toast.error("Error adding car.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="default" className="bg-[#003939] hover:bg-[#003939] cursor-pointer">
          Add Car
        </Button>
      </SheetTrigger>
      <SheetContent className="min-h-screen overflow-y-auto pb-10 w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Car</SheetTitle>
          <SheetDescription>All fields are required</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 mt-2">
          {["name", "brand", "description", "fuelType", "transmission", "type", "year", "currentPrice", "oldPrice", "miles", "stock"].map((field) => (
            <div className="space-y-1" key={field}>
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </Label>
              <Input
                id={field}
                type={["year", "currentPrice", "oldPrice", "miles", "stock"].includes(field) ? "number" : "text"}
                value={(formData as any)[field]}
                onChange={handleInputChange}
                className={errors[field] ? "border-red-500" : ""}
              />
              {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
            </div>
          ))}

          <div className="space-y-1">
            <Label htmlFor="images">Images *</Label>
            <Input
              id="images"
              type="file"
              multiple
              onChange={handleImageChange}
              className={errors.images ? "border-red-500" : ""}
            />
            {errors.images && <span className="text-red-500 text-sm">{errors.images}</span>}
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
