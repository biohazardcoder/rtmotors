import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { CustomerTypes, ErrorTypes } from "@/types/RootTypes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setCustomer, setError, setLoading } from "@/toolkit/customerSlicer";

interface EditCustomerProps {
  customer: CustomerTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCustomer({ customer, open, onOpenChange }: EditCustomerProps) {
    const dispatch = useDispatch()
    const {loading } = useSelector((state:RootState)=>state.customer)
    const GetCusomers = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("customer")).data
            dispatch(setCustomer(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all customers"))
            console.log(error);
        }
    }
  const [formData, setFormData] = useState({
    name: customer.name,
    message: customer.message,
  });

  useEffect(() => {
    setFormData({
      name: customer.name,
      message: customer.message,
    });
  }, [customer]);
  

  const handleUpdate = async () => {
    try {
   
      await Fetch.put(`customer/${customer._id}`, formData)
      GetCusomers();
      toast.success("Customer updated successfully");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update customer");
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
            <Label>Message</Label>
            <Input
              name="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
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
