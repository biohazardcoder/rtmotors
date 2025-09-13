import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { CarTypes,  } from "@/types/RootTypes";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditCarProps {
  car: CarTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCar({ car, open, onOpenChange }: EditCarProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const { mutate } = useSWR('car', fetcher);

  
  
  const [formData, setFormData] = useState<CarTypes>({
    brand: car.brand,
    currentPrice: car.currentPrice,
    description: car.description,
    fuelType: car.fuelType,
    miles: car.miles,
    name: car.name,
    oldPrice: car.oldPrice,
    stock: car.stock,
    transmission: car.transmission,
    type: car.type,
    year: car.year,
    images: car.images,
    status: car.status
  });
  console.log(formData);

  useEffect(() => {
    setFormData({
      brand: car.brand,
      currentPrice: car.currentPrice,
      description: car.description,
      fuelType: car.fuelType,
      miles: car.miles,
      name: car.name,
      oldPrice: car.oldPrice,
      stock: car.stock,
      transmission: car.transmission,
      type: car.type,
      year: car.year,
      images: car.images,
      status: car.status
    });
  }, [car]);

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("brand", formData.brand);
      body.append("currentPrice", formData.currentPrice.toString());
      body.append("description", formData.description);
      body.append("fuelType", formData.fuelType);
      body.append("miles", formData.miles.toString());
      body.append("name", formData.name);
      body.append("oldPrice", formData.oldPrice.toString());
      body.append("stock", formData.stock.toString());
      body.append("transmission", formData.transmission);
      body.append("type", formData.type);
      body.append("status[bg]", formData.status?.bg || "ff0");
      body.append("status[color]", formData.status?.color || "white");
      body.append("status[text]", formData.status?.text || "");
      body.append("year", formData.year.toString());
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.put(`car/${car._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      mutate();
      onOpenChange(false);
      toast.success("Car updated successfully");
      setTimeout(() => {
        mutate();
      }, 2000);
    } catch (error) {
      console.error(error);
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response.data.message || "Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto  flex items-center justify-center p-4 bg-black/50">
      <div className="bg-[#202020] text-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 "
        >
          ✕
        </Button>

        <h2 className="text-2xl mb-4">Edit partner</h2>

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-2">
           {["name", "description",  "brand",  "year", "currentPrice", "miles",  "oldPrice", "stock"].map((field) => (
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
                }[field]}
              </Label>
              <Input
                  id={field}
                  value={(formData as any)[field]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
                />
            </div>
          ))}
          <div className="flex gap-2 flex-col md:flex-row md:items-center">
            <div>
            <Label className="mb-2">Type *</Label>
            <Select  value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as "used" | "new" }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select type"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">Fuel Type *</Label>
            <Select  value={formData.fuelType} onValueChange={(value) => setFormData((prev) => ({ ...prev, fuelType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="gasoline">Gasoline</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">Transmission *</Label>
            <Select  value={formData.transmission} onValueChange={(value) => setFormData((prev) => ({ ...prev, transmission: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select transmission type"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="automatic">Automatic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>
          <div>
            <div>
            <Label className="mb-2">Status *</Label>
             <Input
                  id="status"
                  value={(formData as any).status?.text}
                  className="my-2"
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: { ...prev.status, text: e.target.value  } }))}
                />
           <div className="flex items-center gap-2 mt-2">
            <Label className="mb-2">Status Color *</Label>
             <Select  value={formData.status?.color} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: { ...prev.status, color: value as "fff" | "000" } }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status color"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fff"> <span className="block w-4 h-4 bg-white border border-gray-300 rounded"></span> White</SelectItem>
                <SelectItem value="000"> <span className="block w-4 h-4 bg-black border border-gray-300 rounded"></span> Black</SelectItem>
              </SelectContent>
            </Select>
           </div>
           <div className="flex items-center gap-2 mt-2">
            <Label className="mb-2">Status Background *</Label>
            <Select  value={formData.status?.bg} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: { ...prev.status, bg: value as "0f0"| "00f"|"ff0" } }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status background"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0f0"> <span className="block w-4 h-4 bg-[#0f0] border border-gray-300 rounded"></span> Green</SelectItem>
                <SelectItem value="00f"> <span className="block w-4 h-4 bg-[#00f] border border-gray-300 rounded"></span> Blue</SelectItem>
                <SelectItem value="ff0"> <span className="block w-4 h-4 bg-[#ff0] border border-gray-300 rounded"></span> Yellow</SelectItem>
              </SelectContent>
            </Select>
           </div>
          </div>
          </div>
          <div>
            <Label>Image</Label>
            <Input
              name="images"
              type="file"
              multiple
              className="file:cursor-pointer file:px-2 file:rounded file:border-0 file:bg-white file:text-sm file:text-black hover:file:bg-gray-200"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
