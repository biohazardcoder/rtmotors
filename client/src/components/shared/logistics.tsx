import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import type { LogisticTypes } from "@/types/types";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

export const Logistic = () => {
  const { data, isLoading } = useSWR("/logistic", fetcher);
  const logistics = (data as LogisticTypes[]) || [];
  const firstFour = logistics.slice(0, 4);

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]" data-aos="fade-up">
          <h1 className="text-xl md:text-3xl font-bold">Container loadings</h1>
          <div className="mt-8">
            <Carousel>
              <CarouselContent>
                {[...Array(5)].map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-1/2 md:basis-1/4"
                    data-aos="fade-up"
                  >
                    <Skeleton className="w-full h-36 md:h-56 rounded-lg animate-pulse" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
              <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e7e7e7]">
      <div className="py-8 px-[5%] " data-aos="fade-up">
       <div className="flex items-center justify-between">
         <h1 className="text-xl md:text-3xl font-bold">Container loadings</h1>
         <Link to="/container-loadings">
            <h1 className="text-sm md:text-xl text-blue-500 underline font-semibold" data-aos="fade-up">
              Show more
            </h1>
          </Link>
       </div>
        {firstFour.length === 0 ? (
          <div
            className="pt-4 text-center text-muted-foreground"
            data-aos="fade-up"
          >
            No container loading found
          </div>
        ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                  {firstFour.map(({ _id, image }) => (
                    <div
                      key={_id}
                      className=""
                    >
                      <img
                        src={image}
                        alt="logistic"
                        className="w-full h-56 object-cover object-center rounded-lg"
                      />
                    </div>
                  ))}
            </div>
        )}
      </div>
    </div>
  );
};
