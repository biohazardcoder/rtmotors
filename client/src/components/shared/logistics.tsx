import { fetcher } from "@/middlewares/Fetcher";
import type { LogisticTypes } from "@/types/types";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { HashLink } from "react-router-hash-link";
import VideoPlayer from "./video-player";

export const Logistic = () => {
  const { data, isLoading } = useSWR("/logistic", fetcher);
  const logistics = (data as LogisticTypes[]) || [];
  const firstEigth = logistics

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]" data-aos="fade-up">
          <h1 className="text-lg md:text-3xl font-bold">Container loadings</h1>
          <div className="mt-8 flex gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-56 h-36 md:h-56 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#171f3a] text-white">
      <div className="py-8 px-[5%]" data-aos="fade-up">
        

        {firstEigth.length === 0 ? (
          <div
            className="pt-4 text-center text-muted-foreground"
            data-aos="fade-up"
          >
            No container loading found
          </div>
        ) : (
          <Carousel className="mt-8 relative">
            <div className="flex items-center justify-between pb-6 border-b-2 border-primary-foreground  mb-6" >
          <h1 className="text-lg md:text-3xl font-bold">Container loadings</h1>
          <HashLink to="/container-loadings/#all">
            <Button
            className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base "
            >
              More
            </Button>
          </HashLink>
        </div>
              <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[18px]  right-[110px] rounded-md md:right-[120px] left-[100%-20px]" />
              <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[18px] right-[68px] rounded-md md:right-[78px] left-[100%-30px]" />
            <CarouselContent>
              {firstEigth.map(({ _id, image,video}) => (
               <CarouselItem
                key={_id}
                className="basis-1/1 md:basis-1/3 lg:basis-1/4"
              >
                {video ? (
                  <VideoPlayer videoUrl={video} />
                ) : (
                  <div className="group relative overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt="image"
                      className="w-full h-56 md:h-64 object-cover shadow-lg 
                                transition-all duration-300 rounded-xl
                                group-hover:scale-105 
                                group-hover:shadow-[0px_4px_15px_rgba(255,255,255,0.6)]"
                    />
                  </div>
                )}
              </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
};
