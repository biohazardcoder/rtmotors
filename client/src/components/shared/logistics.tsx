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

export const Logistic = () => {
    const {data, isLoading} = useSWR("/logistic", fetcher);

    const logistics = (data as LogisticTypes[]) || [];

  

      if (isLoading) {
    return (
      <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold">Logistics</h1>
          <div className="mt-8">
            <Carousel>
              <CarouselContent>
                {[...Array(5)].map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-1/2 md:basis-1/4"
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
            <div className="py-8 px-[5%]">
                <h1 className="text-xl md:text-3xl font-bold">Logistics</h1>
                {logistics.length === 0 ? <div className="pt-4 text-center text-muted-foreground">No logistics found</div>:
                    <div>
                        <div className="mt-8">
                            <Carousel>
                                <CarouselContent>
                                    {logistics.map(({_id, image}) => (
                                        <CarouselItem key={_id} className="basis-1/2 md:basis-1/4 ">
                                            <img
                                                src={image}
                                                alt="logistic"
                                                className="w-full h-full object-cover object-center  rounded-lg"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600"/>
                                <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600"/>
                            </Carousel>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
