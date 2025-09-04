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
import type { AdminTypes, ErrorTypes } from "@/types/RootTypes";
import { useDispatch } from "react-redux";
import { setAdmin, setError, setLoading } from "@/toolkit/adminSlicer";

export function AddAdmin() {
  const [formData, setFormData] = useState<AdminTypes>({
    _id: "",
    email :"",
    firstName :"",
    password :"",
    role:"admin"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
         const dispatch = useDispatch()
       
      const GetAdmins = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("admin")).data
            dispatch(setAdmin(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all admins"))
            console.log(error);
        }
      }
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.message = "Email is required.";
    if (!formData.password.trim()) newErrors.message = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await Fetch.post("/admin/register", formData,);
      GetAdmins();
      toast.success("Admin added successfully!");
      setIsSheetOpen(false)
   } catch (error) {
      toast.error("Error adding admin.");
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
        <Button variant="default" className="bg-[#003939] hover:bg-[#003939] cursor-pointer">Add Admin</Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Admin</SheetTitle>
          <SheetDescription>All fields are required</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 mt-2">
          {["firstName", "email", "password"].map((field) => (
            <div className="space-y-1" key={field}>
              <Label htmlFor={field}>
                {{
                  firstName: "Name *",
                  email: "Email *",
                  password: "Password *",
                }[field]}
              </Label>
              <Input
                id={field}
                value={(formData as any)[field]}
                onChange={handleInputChange}
                className={errors[field] ? "border-red-500" : ""}
              />
              {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
            </div>
          ))}

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
