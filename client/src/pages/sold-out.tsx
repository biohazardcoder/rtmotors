import type { VehicleTypes } from "@/types/types";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Menus } from "@/components/shared/menus";
import VideoPlayer from "@/components/shared/video-player";
import { Header } from "@/components/shared/header";
import ProgressiveImage from "@/components/shared/progress-image";

export const SoldOut = () => {

  const { data, isLoading } = useSWR("/car", fetcher);
  const cars = (data as VehicleTypes[]) || [];
  const soldout = cars.filter(item=>item.stock === 0)
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <Menus/>
        <Navbar />
        <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold text-white">Sold Out</h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-56">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        <Footer />
        <Header/>
      </div>
    );
  }

  return (
      <div className="min-h-screen pt-20">
      <Navbar />
      <div className="py-8 px-[5%]" id="all">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-bold text-white">Sold Out</h1>
        </div>

        {soldout.length === 0 ? (
          <div
            className="pt-4 text-center text-muted-foreground"
        
          >
            No container loading found
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {soldout.map(({ _id, images,video }) => (
              <div key={_id}>
                  {video ? (
                  <VideoPlayer videoUrl={video} />
                ) : (
                  <div className="group relative overflow-hidden rounded-xl">
                    <ProgressiveImage
                      height="h-56 md:h-64"
                      src={images[0]}
                      alt="image"
                      className="w-full h-56 md:h-64 object-cover shadow-lg 
                                transition-all duration-300 rounded-xl
                                group-hover:scale-105 
                                group-hover:shadow-[0px_4px_15px_rgba(255,255,255,0.6)]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <Header/>
    </div>
  );
};
