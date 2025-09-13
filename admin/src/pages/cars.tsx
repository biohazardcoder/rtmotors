import {  EllipsisVertical, Loader2, Pen, Trash2, Video, VideoOff } from "lucide-react";
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
import type { CarTypes, ErrorTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
import { EditCar } from "@/modules/EditCar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setCar, setError, setLoading } from "@/toolkit/carSlicer";
import { AddVideoCar } from "@/modules/AddVideoCar";

export const Cars = () => {
         const dispatch = useDispatch()
        const {data, loading,error } = useSelector((state:RootState)=>state.car)
        const [addVideo, setAddVideo] = useState<boolean>(false);

    const GetCars = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("car")).data
            dispatch(setCar(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all cars"))
            console.log(error);
        }
    }
    useEffect(() => {
        GetCars()
    }, [])
    

        const cars = data as CarTypes[] || []
        const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
        const [selectedMenu, setSelectedMenu] = useState<CarTypes | null>(null)
         if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading car data</h1>
        </div>;

        if (loading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;
                
        const handleDelete = async (id: string) => {
                try {
                        await Fetch.delete(`/car/${id}`);
                        toast.success("Car deleted successfully!");
                        GetCars();
                } catch (error) {
                        toast.error("Error deleting car.");
                        console.error(error);
                }
        }

        const handleEditMenu = (car: CarTypes) => {
                setSelectedMenu(car)
                setEditMenuOpen(true)
        }

                 const handleAddVideo = (car: CarTypes) => {
                            setSelectedMenu(car);
                            setAddVideo(true);
                          };
        
          const handleDeleteVideo = async (id: string) => {
            try {
              await Fetch.delete(`/car/video/${id}`);
              toast.success("Video deleted successfully!");
              GetCars();
            } catch (error) {
              toast.error("Error deleting video.");
              console.error(error);
            }
          };

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
                        cars.map(({_id,images,name,year,status,currentPrice,brand,stock,description,fuelType,miles,oldPrice,transmission,type,video}) => (
                                <TableRow key={_id}>
                                        <TableCell>
                                        <Carousel>
                                                <CarouselContent>
                                                {video? (
                                                       <CarouselItem className="w-[0px]">
                                                           <video
                                                                muted
                                                                controls
                                                                className="w-[200px] h-28 object-cover object-center rounded-md mt-6"
                                                        >
                                                                <source src={video} type="video/mp4" />
                                                        </video>
                                                       </CarouselItem>
                                                ) : ( images?.map((image, index) => (
                                                <CarouselItem key={index} className="w-[0px]">
                                                <img
                                                        src={image}
                                                        alt={name}
                                                        className="w-[200px] h-28 rounded-md"
                                                />
                                                </CarouselItem>)
                                                ))}
                                                </CarouselContent>
                                        </Carousel>
                                        </TableCell>
                                        <TableCell>
                                                {name.slice(0,20)}
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
                                                                 <DropdownMenuItem className="flex items-center gap-2 text-green-600 cursor-pointer">
                                                                <Button
                                                                className={`w-full ${video ? "bg-pink-500 hover:bg-pink-600" : "bg-green-500 hover:bg-green-600"}`}
                                                                onClick={() =>
                                                                { video ? handleDeleteVideo(_id || "") : handleAddVideo({
                                                                        _id,
                                                                        images,
                                                                        video
                                                                        } as CarTypes)
                                                                }}
                                                                >
                                                                {video ? <VideoOff className="text-white" /> : <Video className="text-white" />}
                                                                </Button>
                                                                </DropdownMenuItem>
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
                {addVideo && selectedMenu && (
                                                        <AddVideoCar
                                                          open={addVideo}
                                                          id={selectedMenu._id||""}
                                                          onOpenChange={setAddVideo}
                                                        />
                                                      ) }
        </div>
    )
}
