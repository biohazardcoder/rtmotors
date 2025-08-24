import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { OrderTypes } from "@/types/RootTypes";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditOrderProps {
  order: OrderTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditOrder({ order, open, onOpenChange }: EditOrderProps) {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWR("order", fetcher);
  const [formData, setFormData] = useState<OrderTypes>({
    contact: order.contact,
    trackingNumber: order.trackingNumber,
    status: order.status,
    orderId: order.orderId,
  });
  
  useEffect(() => {
    setFormData({
      contact: order.contact,
      trackingNumber: order.trackingNumber,
      status: order.status,
      orderId: order.orderId,
    });
  }, [order]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleUpdate = async () => {
    try {
      setLoading(true);
      const body = new FormData();

      body.append("contact", formData.contact || "");
      body.append("trackingNumber", String(formData.trackingNumber) || "");
      body.append("status", formData.status || "");


      await Fetch.put(`/order/${order._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      mutate();
      onOpenChange(false);
      toast.success("Order updated successfully");
    } catch (error) {
      console.error(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update order");
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

        <h2 className="text-2xl mb-4">Edit Order</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Contact</Label>
            <Input
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Tracking Number</Label>
            <Input
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as OrderTypes["status"] }))}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
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
