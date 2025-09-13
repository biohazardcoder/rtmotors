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
    import type { CarTypes, ErrorTypes } from "@/types/RootTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setCar, setError, setLoading } from "@/toolkit/carSlicer";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch()
    const GetCars = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("car")).data
            dispatch(setCar(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all cars"))
            console.log(error);
        }
    }
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
    setFormData((prev) => ({
      ...prev,
      [id]: ["year", "currentPrice", "oldPrice", "miles", "stock"].includes(id)
        ? Number(value)
        : value,
    }));
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
        if (typeof val === "object" && val !== null) {
          Object.entries(val).forEach(([k, v]) => {
            body.append(`status[${k}]`, String(v));
          });
        } else {
          body.append(key, String(val));
        }
      });

      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.post("/car", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      GetCars()
      toast.success("Car added successfully!");
      setIsSheetOpen(false);
      setFormData({
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
      setImages(null);
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

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[90vh] p-4">
          {["name", "description", "brand", "year", "currentPrice", "miles", "oldPrice", "stock"].map((field) => (
            <div className="space-y-1" key={field}>
              <Label htmlFor={field}>
                {{
                  name: "Name *",
                  description: "Description *",
                  brand: "Brand *",
                  currentPrice: "Current Price *",
                  miles: "Distance *",
                  oldPrice: "Old Price *",
                  stock: "Stock *",
                  year: "Year *",
                }[field]}</Label>
              <Input
                id={field}
                value={
                  typeof formData[field as keyof typeof formData] === "number"
                    ? formData[field as keyof typeof formData] === 0
                      ? ""
                      : String(formData[field as keyof typeof formData])
                    : (formData[field as keyof typeof formData] as string)
                }
                type={["year", "currentPrice", "oldPrice", "miles", "stock"].includes(field) ? "number" : "text"}
                onChange={handleInputChange}
              />
              {errors[field] && <span className="text-red-500 text-xs">{errors[field]}</span>}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div>
              <Label className="mb-2">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as "used" | "new" }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">Fuel Type *</Label>
              <Select value={formData.fuelType} onValueChange={(value) => setFormData((prev) => ({ ...prev, fuelType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">Transmission *</Label>
              <Select value={formData.transmission} onValueChange={(value) => setFormData((prev) => ({ ...prev, transmission: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Image *</Label>
            <Input
              name="images"
              type="file"
              className="file:cursor-pointer file:rounded file:border-0 file:bg-white file:text-sm file:text-black hover:file:bg-gray-200"
              onChange={handleImageChange}
              multiple
            />
            {errors.images && <span className="text-red-500 text-xs">{errors.images}</span>}
          </div>
          <Button
            className="mt-4 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Car"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
