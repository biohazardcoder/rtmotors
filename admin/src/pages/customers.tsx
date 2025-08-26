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
import type { CustomerTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState } from "react";
import { EditCustomer } from "@/modules/EditCustomer";

export const Customers = () => {
        const { data, error, isLoading, mutate } = useSWR("customer", fetcher)
        const customers = data as CustomerTypes[] || []
        const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
        const [selectedMenu, setSelectedMenu] = useState<CustomerTypes | null>(null)

        if (error) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
            <Navbar/>
            <h1 className="text-center text-destructive">Error loading customer data</h1>
        </div>;

        if (isLoading) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
            <Navbar/>
            <div className="flex items-center justify-center bg  h-[50vh]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;

        const handleDelete = async (id: string) => {
                try {
                        await Fetch.delete(`/customer/${id}`);
                        toast.success("Customer deleted successfully!");
                        mutate();
                } catch (error) {
                        toast.error("Error deleting customer.");
                        console.error(error);
                }
        }
        const handleEditMenu = (customer: CustomerTypes) => {
                setSelectedMenu(customer)
                setEditMenuOpen(true)
        }

    return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div>
                <Table>
                <TableCaption>A list of your customers.</TableCaption>
                <TableHeader>
                        <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Job</TableHead>
                        <TableHead>Message</TableHead>
                        </TableRow>
                </TableHeader>
                <TableBody>
                        {
                                customers.map(({_id, image,name,job,message}) => (
                                        <TableRow key={_id} className="cursor-pointer ">
                                                <TableCell>
                                                        <img src={image} alt={name} className="w-22 h-32 py-2 object-contain border border-[#003939] rounded-md"/>
                                                </TableCell>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>
                                                                {job}
                                                </TableCell>
                                                <TableCell>
                                                                {message}
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
                                                                                 onClick={()=>handleEditMenu({ _id, image, name, job,message } as CustomerTypes)}
                                                                                 >
                                                                                        <Pen className="text-white"/>
                                                                                </Button>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                                className="flex items-center gap-2 text-red-600 cursor-pointer"
                                                                        >
                                                                                <Button 
                                                                                onClick={() => handleDelete(_id||"")}
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
                        <EditCustomer
                                customer={selectedMenu!}
                                open={editMenuOpen}
                                onOpenChange={setEditMenuOpen} 
                        />
                        )}
        </div>
    )
}
