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
import type { AuctionTypes, ErrorTypes } from "@/types/RootTypes";
import { Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
import { EditAuction } from "@/modules/EditAuction";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setAuction, setError, setLoading } from "@/toolkit/auctionSlicer";

export const Auctions = () => {
        const dispatch = useDispatch()
    const {data, loading,error } = useSelector((state:RootState)=>state.auction)
    const GetAuctions = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("auction")).data
            dispatch(setAuction(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all auction"))
            console.log(error);
        }
    }
    useEffect(() => {
        GetAuctions()
    }, [])
        const auctions = data as AuctionTypes[] || []
        const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
        const [selectedMenu, setSelectedMenu] = useState<AuctionTypes | null>(null)
        if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading auction data</h1>
        </div>;

        if (loading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;

        const handleDelete = async (id: string) => {
                try {
                        await Fetch.delete(`/auction/${id}`);
                        toast.success("Auction deleted successfully!");
                        GetAuctions();
                } catch (error) {
                        toast.error("Error deleting auction.");
                        console.error(error);
                }
        }

        const handleEditMenu = (auction: AuctionTypes) => {
                setSelectedMenu(auction)
                setEditMenuOpen(true)
        }

    return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div>
                <Table>
                <TableCaption>A list of your auctions.</TableCaption>
                <TableHeader>
                        <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>URL</TableHead>
                        </TableRow>
                </TableHeader>
                <TableBody>
                    {
                    auctions.map(({_id, image, url}) => (
                            <TableRow key={_id}>
                                    <TableCell>
                                            <img src={image} alt={url} className="w-32 h-14 object-contain border border-[#003939] rounded-md"/>
                                    </TableCell>
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
                                                                    onClick={()=>handleEditMenu({ _id, image, url } as AuctionTypes)}
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
                        <EditAuction
                                auction={selectedMenu!}
                                open={editMenuOpen}
                                onOpenChange={setEditMenuOpen} 
                        />
                )}
        </div>
    )
}
