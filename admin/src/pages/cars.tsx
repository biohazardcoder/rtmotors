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
import type { CarTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState } from "react";
import { EditCar } from "@/modules/EditCar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const Cars = () => {
        const { data, error, isLoading, mutate } = useSWR("car", fetcher)
        const cars = data as CarTypes[] || []
        const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
        const [selectedMenu, setSelectedMenu] = useState<CarTypes | null>(null)
        if (error) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
            <Navbar/>
            <h1 className="text-center text-destructive">Error loading car data</h1>
        </div>;

        if (isLoading) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
            <Navbar/>
            <div className="flex items-center justify-center h-[80vh]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;
                
        const handleDelete = async (id: string) => {
                try {
                        await Fetch.delete(`/car/${id}`);
                        toast.success("Car deleted successfully!");
                        mutate();
                } catch (error) {
                        toast.error("Error deleting car.");
                        console.error(error);
                }
        }

        const handleEditMenu = (car: CarTypes) => {
                setSelectedMenu(car)
                setEditMenuOpen(true)
        }

    return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div>
                <Table>
                <TableCaption>A list of your cars.</TableCaption>
                <TableHeader>
                        <TableRow>
                        <TableHead>Images</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>Old Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        </TableRow>
                </TableHeader>
                <TableBody>
                        {
                        cars.map(({_id,images,name,year,status,currentPrice,brand,stock,description,fuelType,miles,oldPrice,transmission,type}) => (
                                <TableRow key={_id}>
                                        <TableCell>
                                        <Carousel>
                                                <CarouselContent>
                                                {images?.map((image, index) => (
                                                <CarouselItem key={index} className="w-[30px]">
                                                <img
                                                        src={image}
                                                        alt={name}
                                                        className="w-full h-28 rounded-md"
                                                />
                                                </CarouselItem>
                                                ))}
                                                </CarouselContent>
                                                <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600"/>
                                                <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600"/>
                                        </Carousel>
                                        </TableCell>
                                        <TableCell>
                                                {name}
                                        </TableCell>
                                        <TableCell>
                                                {brand}
                                        </TableCell>
                                        <TableCell>
                                                {currentPrice}
                                        </TableCell>
                                        <TableCell>
                                                {oldPrice}
                                        </TableCell>
                                        <TableCell>
                                                {stock}
                                        </TableCell>
                                        <TableCell>
                                                {stock === 0 ? (<span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                                                Sold out
                                                </span>) : status?.text?.length && status?.text?.length > 0 ? (
                                                <span
                                                className="text-sm font-semibold px-3 py-1 rounded-full shadow"
                                                style={{ color: `#${status?.color}`, backgroundColor: `#${status?.bg}` }}
                                                >
                                                {status?.text}
                                                </span>
                                                ) : "No Status"}
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
                                                                        onClick={()=>handleEditMenu({ _id,brand,currentPrice,description,fuelType,images,miles,name,oldPrice,stock,transmission,type,year,status } as CarTypes)}
                                                                        >
                                                                                <Pen className="text-white"/>
                                                                        </Button>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                        className="flex items-center gap-2 text-red-600 cursor-pointer"
                                                                >
                                                                        <Button 
                                                                        onClick={() => handleDelete(_id || "")}
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
                <EditCar
                        car={selectedMenu!}
                        open={editMenuOpen}
                        onOpenChange={setEditMenuOpen} 
                />
                )}
        </div>
    )
}
