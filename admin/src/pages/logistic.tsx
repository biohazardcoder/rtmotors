import {  EllipsisVertical, Loader2, Pen, Trash2, Video, VideoOff } from "lucide-react";
import {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { ErrorTypes, LogisticTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
import { EditLogistic } from "@/modules/EditLogistic";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setError, setLoading, setLogistic } from "@/toolkit/logisticSlicer";
import { AddVideoCL } from "@/modules/AddVideoCL";

export const Logistics = () => {
    const dispatch = useDispatch()
    const {data, loading,error } = useSelector((state:RootState)=>state.logistic)
      const [addVideo, setAddVideo] = useState<boolean>(false);

    const GetLogistics = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("logistic")).data
            dispatch(setLogistic(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all logistics"))
            console.log(error);
        }
    }
    useEffect(() => {
        GetLogistics()
    }, [])
                const logistics = data as LogisticTypes[] || []
                const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
                const [selectedMenu, setSelectedMenu] = useState<LogisticTypes | null>(null)
                  if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading logistic data</h1>
        </div>;

        if (loading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;

                const handleDelete = async (id: string) => {
                                try {
                                                await Fetch.delete(`/logistic/${id}`);
                                                toast.success("Logistic deleted successfully!");
                                                GetLogistics();
                                } catch (error) {
                                                toast.error("Error deleting logistic.");
                                                console.error(error);
                                }
                }

                const handleEditMenu = (logistic: LogisticTypes) => {
                                setSelectedMenu(logistic)
                                setEditMenuOpen(true)
                }

                const handleAddVideo = (logictic: LogisticTypes) => {
                    setSelectedMenu(logictic);
                    setAddVideo(true);
                  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await Fetch.delete(`/logistic/video/${id}`);
      toast.success("Video deleted successfully!");
      GetLogistics();
    } catch (error) {
      toast.error("Error deleting video.");
      console.error(error);
    }
  };
        return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                                {logistics.map(({ _id, image,video }) => (
                                        <div key={_id} className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center relative">
                                               {video ? (
                                                        <video
                                                                muted
                                                                controls
                                                                className="w-full h-40 object-cover object-center rounded-md mt-6"
                                                        >
                                                                <source src={video} type="video/mp4" />
                                                        </video>
                                                        ) : (
                                                                <img
                                                                src={image}
                                                                alt={"image"}
                                                                className="w-full h-40 object-cover object-center rounded-md mt-6"
                                                                />
                                                        )}

                                                <div className="absolute top-2 right-2">
                                                        <DropdownMenu>
                                                                <DropdownMenuTrigger>
                                                                        <EllipsisVertical size={24} className="text-black cursor-pointer" />
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="border-none">
                                                                        <DropdownMenuItem className="flex items-center gap-2 text-green-600 cursor-pointer">
                                                                                <Button
                                                                                className={`w-full ${video ? "bg-pink-500 hover:bg-pink-600" : "bg-green-500 hover:bg-green-600"}`}
                                                                                onClick={() =>
                                                                                { video ? handleDeleteVideo(_id || "") : handleAddVideo({
                                                                                        _id,
                                                                                        image,
                                                                                        video,
                                                                                        } as LogisticTypes)
                                                                                }}
                                                                                >
                                                                                {video ? <VideoOff className="text-white" /> : <Video className="text-white" />}
                                                                                </Button>
                                                                                </DropdownMenuItem>
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
                                 {addVideo && selectedMenu && (
                                        <AddVideoCL
                                          open={addVideo}
                                          id={selectedMenu._id||""}
                                          onOpenChange={setAddVideo}
                                        />
                                      ) }
                </div>
        )
}
