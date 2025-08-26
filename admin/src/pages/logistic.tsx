import { Navbar } from "@/components/shared/navbar"
import { fetcher } from "@/middlewares/Fetcher";
import {  EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import useSWR from "swr";
import {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { LogisticTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState } from "react";
import { EditLogistic } from "@/modules/EditLogistic";

export const Logistics = () => {
                const { data, error, isLoading, mutate } = useSWR("logistic", fetcher)
                const logistics = data as LogisticTypes[] || []
                const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
                const [selectedMenu, setSelectedMenu] = useState<LogisticTypes | null>(null)
                if (error) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
                        <Navbar/>
                        <h1 className="text-center text-destructive">Error loading logistic data</h1>
                </div>;

                if (isLoading) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
                        <Navbar/>
                        <div className="flex items-center justify-center bg  h-[50vh]">
                                <Loader2 className="animate-spin text-blue-500" size={30}/>
                        </div>
                </div>;

                const handleDelete = async (id: string) => {
                                try {
                                                await Fetch.delete(`/logistic/${id}`);
                                                toast.success("Logistic deleted successfully!");
                                                mutate();
                                } catch (error) {
                                                toast.error("Error deleting logistic.");
                                                console.error(error);
                                }
                }

                const handleEditMenu = (logistic: LogisticTypes) => {
                                setSelectedMenu(logistic)
                                setEditMenuOpen(true)
                }

        return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                                {logistics.map(({ _id, image }) => (
                                        <div key={_id} className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center relative">
                                                <img
                                                        src={image}
                                                        alt="logistic"
                                                        className="w-full h-40 object-cover object-center rounded-md mt-6"
                                                />
                                                <div className="absolute top-2 right-2">
                                                        <DropdownMenu>
                                                                <DropdownMenuTrigger>
                                                                        <EllipsisVertical size={24} className="text-black cursor-pointer" />
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="border-none">
                                                                        <DropdownMenuItem className="flex items-center gap-2 text-blue-600 cursor-pointer">
                                                                                <Button
                                                                                        className="bg-blue-500 hover:bg-blue-600 w-full"
                                                                                        onClick={() => handleEditMenu({ _id, image } as LogisticTypes)}
                                                                                >
                                                                                        <Pen className="text-white" />
                                                                                </Button>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
                                                                                <Button
                                                                                        onClick={() => handleDelete(_id || "")}
                                                                                        variant={"destructive"}
                                                                                        className="w-full"
                                                                                >
                                                                                        <Trash2 className="text-white" />
                                                                                </Button>
                                                                        </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                        </DropdownMenu>
                                                </div>
                                        </div>
                                ))}
                        </div>
                        {editMenuOpen && selectedMenu && (
                                                <EditLogistic
                                                                logistic={selectedMenu!}
                                                                open={editMenuOpen}
                                                                onOpenChange={setEditMenuOpen} 
                                                />
                                )}
                </div>
        )
}
