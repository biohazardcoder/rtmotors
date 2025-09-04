import { fetcher } from "@/middlewares/Fetcher";
import type { LogisticTypes } from "@/types/types";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

export const Logistic = () => {
  const { data, isLoading } = useSWR("/logistic", fetcher);
  const logistics = (data as LogisticTypes[]) || [];
  const firstEigth = logistics.slice(0, 8);

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
    <div className="bg-[#e7e7e7]">
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
            <div className="flex items-center justify-between  mb-4">
          <h1 className="text-lg md:text-3xl font-bold">Container loadings</h1>
          <Link to="/container-loadings">
            <Button
            className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base "
            >
              More
            </Button>
          </Link>
        </div>
              <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[18px]  right-[110px] rounded-md md:right-[120px] left-[100%-20px]" />
              <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[18px] right-[68px] rounded-md md:right-[78px] left-[100%-30px]" />
            <CarouselContent>
              {firstEigth.map(({ _id, image }) => (
                <CarouselItem
                  key={_id}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <img
                    src={image}
                    alt="logistic"
                    className="w-full h-56 object-cover object-center rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
};
