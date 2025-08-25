import { SignOutButton, useUser } from "@clerk/clerk-react"
import {  useNavigate } from "react-router-dom"
import Loader from "../components/ui/loader"
import { Separator } from "../components/ui/separator"
import { Button } from "../components/ui/button"
import { CheckCheck, Image, LogOut, Pencil, PencilOff, } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import { Input } from "../components/ui/input"
import { Navbar } from "@/components/shared/navbar"
import { ImageCropper } from "@/components/shared/image-cropper"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR from "swr"
import type { OrderTypes } from "@/types/types"
import { fetcher } from "@/middlewares/Fetcher"
import { format } from "date-fns";

export const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [firstNameLoading, setFirstNameLoading] = useState(false)
  const [editName, setEditName] = useState(false)
  const [lastName, setLastName] = useState('')
  const [lastNameLoading, setLastNameLoading] = useState(false)
  const [editLastName, setEditLastName] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    setSelectedImage(reader.result as string);
  };
  reader.readAsDataURL(file);
};

  const handleChangeFirstName = async () => {
    if (!firstName.trim()) return toast.warning("First name cannot be empty")
    try {
      setFirstNameLoading(true)
      await user?.update({
        firstName,
        lastName: user?.lastName || ""
      })
      setFirstName("")
      setEditName(false)
      toast.success("First name updated successfully!")
    } catch (error) {
      console.error("Error updating first name:", error)
      toast.error("There was a problem updating the first name.")
    } finally {
      setFirstNameLoading(false)
    }
  }

  const handleChangeLastName = async () => {
    if (!lastName.trim()) return toast.warning("Last name cannot be empty")
    try {
      setLastNameLoading(true)
      await user?.update({
        lastName,
        firstName: user?.firstName || ""
      })
      setLastName("")
      setEditLastName(false)
      toast.success("Last name updated successfully!")
    } catch (error) {
      console.error("Error updating last name:", error)
      toast.error("There was a problem updating the last name.")
    } finally {
      setLastNameLoading(false)
    }
  }

  const handleSaveCropped = async (croppedBase64: string) => {
  try {
    setLoading(true);
    const response = await fetch(croppedBase64);
    const blob = await response.blob();
    const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
    await user?.setProfileImage({ file });
    toast.success("Profile image updated successfully!");
    setSelectedImage(null);
  } catch (err) {
    console.error(err);
    toast.error("Failed to update profile image.");
  } finally {
    setLoading(false);
  }
};

const { data, isLoading, error } = useSWR(`/order/my-orders/${user?.id}`, fetcher);

const myOrders = data as OrderTypes[] || [];

if (!isLoaded ) {
    return (
      <div>
        <Navbar />
        <div className="p-6 px-[5%] space-y-6 mt-14">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-9 w-24" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoaded && !isSignedIn) {
    navigate("/sign-in")
  }

  return (
    <div>
      <Navbar />
      <div className="h-screen p-2 pt-20  px-[5%]">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <h1>First Name:</h1>
          {
            firstNameLoading ? <div><Loader /> </div> : <div className="flex items-center gap-4">
              {!editName && <h1>{user?.firstName}</h1>}
              <div>
                {editName ? <div className="flex items-center gap-2">
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
                  <Button onClick={handleChangeFirstName}><CheckCheck /></Button>
                  <Button onClick={() => setEditName(false)} variant={'destructive'}><PencilOff /></Button>
                </div> :
                  <Button variant={"outline"} onClick={() => setEditName(true)}><Pencil /> Edit</Button>
                }
              </div>
            </div>
          }
        </div>
        <Separator className="mt-2" />
        <div className="mt-2 flex items-center gap-2 text-sm">
          <h1>Last Name:</h1>
          {
            lastNameLoading ? <div><Loader /> </div> : <div className="flex items-center gap-4">
              {!editLastName && <h1>{user?.lastName}</h1>}
              <div>
                {editLastName ? <div className="flex items-center gap-2">
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
                  <Button onClick={handleChangeLastName}><CheckCheck /></Button>
                  <Button onClick={() => setEditLastName(false)} variant={'destructive'}><PencilOff /></Button>
                </div> :
                  <Button variant={"outline"} onClick={() => setEditLastName(true)}><Pencil /> Edit</Button>
                }
              </div>
            </div>
          }
        </div>
        <Separator className="mt-2" />
        <div className="flex items-center gap-2 text-sm">
          <h1>Image:</h1>
          <div className="mt-2 flex items-center gap-4">
            {loading ? <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full"><Loader /></div> : <img src={user?.imageUrl} alt="logo" className="w-8 h-8 rounded-full" />}
            <div>
              <label htmlFor="profile-upload" className="cursor-pointer">
                <Button variant={"outline"} asChild>
                  <div className="flex items-center gap-2">
                    <Image />
                    Upload
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={loading}
                      className="hidden"
                    />
                  </div>
                </Button>
              </label>
            </div>
          </div>
        </div>
        <Separator className="my-2" />

        <div className="flex items-center gap-2 text-sm">
          <h1>Sign out:</h1>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="profile-upload" className="cursor-pointer">
                <SignOutButton>
                  <Button variant={"outline"}>
                    <LogOut />
                    Sign out
                  </Button>
                </SignOutButton>
              </label>
            </div>
          </div>
        </div>
        {selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCancel={() => setSelectedImage(null)}
          onSave={handleSaveCropped}
          loading={loading}
        />
      )}
      <div className="mt-6 pb-10">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        {isLoading ? (
           <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="bg-white shadow-sm rounded-2xl border p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" /> 
            <Skeleton className="h-4 w-32" /> 
            <Skeleton className="h-4 w-28" /> 
            <Skeleton className="h-4 w-28" /> 
            <Skeleton className="h-4 w-36" />
          </div>

          <div className="flex items-center md:flex-col md:items-end gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full hidden md:block" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" /> 
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
        ) : error ? (
          <div>Error loading orders</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      {myOrders.map((order: OrderTypes) => (
        <div
          key={order._id}
          className="bg-white shadow-sm rounded-2xl border p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 "
        >
          <div className="flex-1 ">
            <h2 className="text-lg font-semibold ">
              {order.car?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Order ID:{" "}
              <span className="uppercase font-medium text-black ">
                #{order.orderId}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Tracking:{" "}
              <span className="font-medium text-black">${Number(order.trackingNumber).toLocaleString()}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Contact:{" "}
              <span className="font-medium text-black">{order.contact}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Date:{" "}
              <span className="font-medium text-black">
                {order.createdAt ? format(new Date(order.createdAt), "dd MMMM yyyy") : ""}
              </span>
            </p>
          </div>

          <div className="flex items-center md:flex-col md:items-end gap-4">
            <div className="flex items-center gap-2">
              <div className="block">
                <p className="text-sm font-medium">{order.user?.name}</p>
                <p className="text-xs text-muted-foreground">{order.user?.email}</p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
              ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-500"
                  : order.status === "delivering"
                  ? "bg-blue-100 text-blue-500"
                  : order.status === "completed"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
        )}
      </div>
      </div>
    </div>
  )
}
