import type { BlogTypes } from "@/types/types";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import VideoPlayer from "@/components/shared/video-player";
import { Skeleton } from "@/components/ui/skeleton";

export const Blog = () => {
    const { data,isLoading} = useSWR("/blog", fetcher)

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7] pt-20">
        <Navbar />
        <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold">Blogs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-md space-y-4"
              >
                <Skeleton className="w-full h-52 rounded-md" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }


  const blog = data as BlogTypes[] || []

  return (
    <div className="bg-[#e7e7e7] pt-20" >
        <Navbar />
      <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold">Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {
            blog.length === 0 ? (
              <p>No blog found</p>
            ) : (
                blog.map(
            ({
              _id,
              title,
              text,
              image,
              video
            }) => (
              <div
                key={_id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                { video ? (
                  <VideoPlayer videoUrl={video} />
                ):(
                  <img
                  src={image}
                  alt={title}
                  className="w-full h-56 md:h-64 object-cover"
                />
                )}
                <div className="px-6 py-4">
                  <h2 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">
                    {title}
                  </h2>
                  <p className="text-secondary-foreground text-sm mb-3">{text}</p>
                  </div>
                </div>
                
              </div>
            )
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};


