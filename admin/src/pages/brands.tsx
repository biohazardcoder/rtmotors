import { Navbar } from "@/components/shared/navbar"
import { fetcher } from "@/middlewares/Fetcher";
import {  EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { BrandTypes } from "@/types/RootTypes";
import { AddBrand } from "@/modules/AddBrand";
import { Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState } from "react";
import { EditBrand } from "@/modules/EditBrand";

export const Brands = () => {
    const { data, error,isLoading,mutate } = useSWR("brand", fetcher)
    const brands = data as BrandTypes[] || []
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
  const [selectedMenu, setSelectedMenu] = useState<BrandTypes | null>(null)

    if (error) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar/>
      <h1 className="text-center text-destructive">Error loading brand data</h1>
    </div>;

    if (isLoading) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar/>
      <div className="flex items-center justify-center bg  h-[50vh]">
        <Loader2 className="animate-spin text-blue-500" size={30}/>
      </div>
    </div>;

    const handleDelete = async (id: string) => {
        try {
            await Fetch.delete(`/brand/${id}`);
            toast.success("Brand deleted successfully!");
            mutate();
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
     <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar button={true} component={<AddBrand/>}/>
      <div>
        <Table>
        <TableCaption>A list of your brands.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>URL</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                brands.map(({_id,image,title,url}) => (
                    <TableRow key={_id} className="cursor-pointer ">
                        <TableCell>
                            <img src={image} alt={url} className="w-32 h-14 object-contain border border-[#003939] rounded-md"/>
                        </TableCell>
                        <TableCell>{title}</TableCell>
                        <TableCell>
                              <Link to={url} target="_blank" className="underline ">
                                {url}
                            </Link>
                        </TableCell>
                        <TableCell className="max-w-[100px] flex items-center gap-2 relative">
                             <DropdownMenu>
                                <DropdownMenuTrigger className="absolute top-4 right-3">
                                    <EllipsisVertical size={24} className="text-zinc-400 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-none">
                                    <DropdownMenuItem
                                        className="flex items-center gap-2 text-red-600 cursor-pointer"
                                    >
                                         <Button className="bg-blue-500 hover:bg-blue-600 w-full"
                                         onClick={()=>handleEditMenu({ _id, image, title, url } as BrandTypes)}
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
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
        </Table>
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
