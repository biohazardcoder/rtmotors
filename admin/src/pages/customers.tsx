import {  EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
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
import type { CustomerTypes, ErrorTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
import { EditCustomer } from "@/modules/EditCustomer";
import { setCustomer, setLoading,setError } from "@/toolkit/customerSlicer";
import type { RootState } from "@/store/RootStore";
import { useDispatch, useSelector } from "react-redux";

export const Customers = () => {
    const dispatch = useDispatch()
    const {data, loading,error } = useSelector((state:RootState)=>state.customer)
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
    useEffect(() => {
        GetCusomers()
    }, [])

        const customers = data as CustomerTypes[] || []
        const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
        const [selectedMenu, setSelectedMenu] = useState<CustomerTypes | null>(null)

           if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading customer data</h1>
        </div>;

        if (loading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;

        const handleDelete = async (id: string) => {
                try {
                        await Fetch.delete(`/customer/${id}`);
                        toast.success("Customer deleted successfully!");
                        GetCusomers()
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
                        <TableHead>Name</TableHead>
                        <TableHead>Message</TableHead>
                        </TableRow>
                </TableHeader>
                <TableBody>
                        {
                                customers.map(({_id,name,message}) => (
                                        <TableRow key={_id} className="cursor-pointer ">
                                                <TableCell>{name}</TableCell>
                                                <TableCell>
                                                                {message}
                                                </TableCell>
                                                <TableCell className="max-w-[100px] flex items-center gap-2 relative">
                                                         <DropdownMenu>
                                                                <DropdownMenuTrigger className="absolute top-2 right-3">
                                                                        <EllipsisVertical size={24} className="text-zinc-400 cursor-pointer" />
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="border-none">
                                                                        <DropdownMenuItem
                                                                                className="flex items-center gap-2 text-red-600 cursor-pointer"
                                                                        >
                                                                                 <Button className="bg-blue-500 hover:bg-blue-600 w-full"
                                                                                 onClick={()=>handleEditMenu({ _id,  name, message } as CustomerTypes)}
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
