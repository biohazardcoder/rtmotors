import {  EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { BrandTypes, ErrorTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
import { EditBrand } from "@/modules/EditBrand";
import { setBrand, setError, setLoading } from "@/toolkit/brandSlicer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";

export const Brands = () => {
    const dispatch = useDispatch()
    const {data, loading,error } = useSelector((state:RootState)=>state.brand)
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
    useEffect(() => {
        GetBrands()
    }, [])
    

  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
  const [selectedMenu, setSelectedMenu] = useState<BrandTypes | null>(null)
   if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading brand data, {error}</h1>
        </div>;

        if (loading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;
    const handleDelete = async (id: string) => {
        try {
            await Fetch.delete(`/brand/${id}`);
            GetBrands()
            toast.success("Brand deleted successfully!");
        } catch (error) {
            toast.error("Error deleting brand.");
            console.error(error);
        }
    }
    const handleEditMenu = (brand: BrandTypes) => {
        setSelectedMenu(brand)
        setEditMenuOpen(true)
    }

  return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-8">
            {
                data.map(({_id,image}) => (
                    <div key={_id} className=" relative border-l-2">
                            <img src={image} alt={_id.slice(0,4)} className="w-32 h-14 object-contain rounded-md"/>
                        <li className="max-w-[100px] flex items-center gap-2 ">
                             <DropdownMenu>
                                <DropdownMenuTrigger className="absolute top-4 right-3">
                                    <EllipsisVertical size={24} className="text-zinc-400 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-none">
                                    <DropdownMenuItem
                                        className="flex items-center gap-2 text-red-600 cursor-pointer"
                                    >
                                         <Button className="bg-blue-500 hover:bg-blue-600 w-full"
                                         onClick={()=>handleEditMenu({ _id, image } as BrandTypes)}
                                         >
                                            <Pen className="text-white"/>
                                        </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="flex items-center gap-2 text-red-600 cursor-pointer"
                                    >
                                        <Button 
                                        onClick={() => handleDelete(_id)}
                                        variant={"destructive"} className="w-full">
                                            <Trash2 className="text-white"/>
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </div>
                ))
            }
      </div>
         {editMenuOpen && selectedMenu && (
            <EditBrand
                brand={selectedMenu!}
                open={editMenuOpen}
                onOpenChange={setEditMenuOpen} 
            />
            )}
    </div>
  )
}
