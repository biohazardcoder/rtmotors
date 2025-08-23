import { Navbar } from "@/components/shared/navbar"
import { fetcher } from "@/middlewares/Fetcher";
import { EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import useSWR from "swr";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { BlogTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
// import { useState } from "react";
// import { EditBlog } from "@/modules/EditBlog";
import { AddBlog } from "@/modules/AddBlog";

export const Blog = () => {
  const { data, error, isLoading, mutate } = useSWR("/blog", fetcher);
  const blogs = (data as BlogTypes[]) || [];
//   const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
//   const [selectedMenu, setSelectedMenu] = useState<BlogTypes | null>(null);
        console.log(data);
        
  if (error)
    return (
      <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
        <Navbar />
        <h1 className="text-center text-destructive">
          Error loading blog data
        </h1>
      </div>
    );

  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
        <Navbar />
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="animate-spin text-blue-500" size={30} />
        </div>
      </div>
    );

  const handleDelete = async (id: string) => {
    try {
      await Fetch.delete(`/blog/${id}`);
      toast.success("Blog deleted successfully!");
      mutate();
    } catch (error) {
      toast.error("Error deleting blog.");
      console.error(error);
    }
  };

//   const handleEditMenu = (blog: BlogTypes) => {
//     setSelectedMenu(blog);
//     setEditMenuOpen(true);
//   };

  return (
    <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar button={true} component={<AddBlog />} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {blogs.map(({ _id, image, video, title, text }) => (
          <div
            key={_id}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col relative"
          >
            {/* agar video bo‘lsa video chiqsin, bo‘lmasa image */}
            {video ? (
              <video
                controls
                className="w-full h-40 object-cover object-center rounded-md mt-6"
              >
                <source src={video} type="video/mp4" />
              </video>
            ) : (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-40 object-cover object-center rounded-md mt-6"
                />
            )}

            <h2 className="font-semibold text-lg mt-3">{title}</h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{text}</p>

            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical
                    size={24}
                    className="text-black cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem className="flex items-center gap-2 text-blue-600 cursor-pointer">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 w-full"
                //       onClick={() =>
                //         handleEditMenu({
                //           _id,
                //           image,
                //           video,
                //           title,
                //           text,
                //         } as BlogTypes)
                //       }
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

      {/* {editMenuOpen && selectedMenu && (
        <EditBlog
          blog={selectedMenu!}
          open={editMenuOpen}
          onOpenChange={setEditMenuOpen}
        />
      )} */}
    </div>
  );
};
