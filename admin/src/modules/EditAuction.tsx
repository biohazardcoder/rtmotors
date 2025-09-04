import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { AuctionTypes, ErrorTypes } from "@/types/RootTypes";
import { useDispatch } from "react-redux";
import { setAuction, setError } from "@/toolkit/auctionSlicer";

interface EditAuctionProps {
  auction: AuctionTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAuction({ auction, open, onOpenChange }: EditAuctionProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
       const dispatch = useDispatch()
    const GetAuctions = async () => {
        try {
            const response = (await Fetch.get("auction")).data
            dispatch(setAuction(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all auction"))
            console.log(error);
        }
    }
  const [formData, setFormData] = useState<{
    url: string
  }>({
    url: auction.url
  });

  useEffect(() => {
    setFormData({
      url: auction.url
    });
  }, [auction]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" && files ? files[0] : value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("url", formData.url);
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.put(`auction/${auction._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      GetAuctions();
      onOpenChange(false);
      toast.success("Auction updated successfully");
    } catch (error) {
      console.error(error);
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response.data.message || "Failed to update auction");
    } finally {
      setLoading(false);
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

        <h2 className="text-2xl mb-4">Edit auction</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Label>URL</Label>
            <Input
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Image</Label>
            <Input
              name="images"
              type="file"
              className="file:cursor-pointer file:rounded file:border-0 file:bg-white file:text-sm file:text-black hover:file:bg-gray-200"
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
