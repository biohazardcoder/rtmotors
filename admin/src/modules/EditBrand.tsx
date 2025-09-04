import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { BrandTypes, ErrorTypes } from "@/types/RootTypes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setBrand, setError, setLoading } from "@/toolkit/brandSlicer";

interface EditBrandProps {
  brand: BrandTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBrand({ brand, open, onOpenChange }: EditBrandProps) {
    const [images, setImages] = useState<FileList | null>(null);

    const dispatch = useDispatch()
    const {loading } = useSelector((state:RootState)=>state.brand)
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
 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };
  const handleUpdate = async () => {
    try {
      const body = new FormData();
       if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.put(`brand/${brand._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      GetBrands()
      onOpenChange(false);
      toast.success("Brand updated successfully");
    } catch (error) {
      console.error(error);
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response.data.message || "Failed to update brand");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-[#202020] text-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 "
        >
          ✕
        </Button>

        <h2 className="text-2xl mb-4">Edit brand</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Image</Label>
            <Input
              name="images"
              type="file"
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
