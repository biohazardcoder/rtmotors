import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { CustomerTypes } from "@/types/RootTypes";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";

interface EditCustomerProps {
  customer: CustomerTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCustomer({ customer, open, onOpenChange }: EditCustomerProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const { mutate } = useSWR('customer', fetcher);
  const [formData, setFormData] = useState({
    name: customer.name,
    job: customer.job,
    message: customer.message,
    image: customer.image,
  });

  useEffect(() => {
    setFormData({
      name: customer.name,
      job: customer.job,
      message: customer.message,
      image: customer.image,
    });
    setImages(null);
  }, [customer]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("name", formData.name);
      body.append("job", formData.job);
      body.append("message", formData.message);

      if (images && images.length > 0) {
        body.append("images", images[0]);
      }

      await Fetch.put(`customer/${customer._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      mutate();
      onOpenChange(false);
      toast.success("Customer updated successfully");
    } catch (error) {
      console.error(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update customer");
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

        <h2 className="text-2xl mb-4">Edit customer</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>Job</Label>
            <Input
              name="job"
              value={formData.job}
              onChange={(e) => setFormData((prev) => ({ ...prev, job: e.target.value }))}
            />
          </div>
          <div>
            <Label>Message</Label>
            <Input
              name="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            />
          </div>
          <div>
            <Label>Image</Label>
            <Input
              name="image"
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
