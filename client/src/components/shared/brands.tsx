import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import type { BrandTypes } from "@/types/types";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const Brands = () => {
  const { data, isLoading } = useSWR("/brand", fetcher);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]">
          <h1
            className="text-lg md:text-3xl font-bold"
            data-aos="fade-up"
          >
            Explore Our Premium Brands
          </h1>
          <div className="block mt-8">
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
            >
              <CarouselContent>
                {[...Array(5)].map((_, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                    data-aos="fade-up"
                  >
                    <div className="flex flex-col bg-white font-bold items-center p-4 rounded-md">
                      <Skeleton className="w-24 h-24 rounded-md" />
                      <Skeleton className="h-4 w-20 mt-2" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  const brands = (data as BrandTypes[]) || [];
  console.log(brands);
  
  return (
    <div className="bg-[#e7e7e7] hidden md:block">
      <div className="py-8 px-[5%]">
        <h1
          className="text-lg md:text-3xl font-bold"
          data-aos="fade-up"
        >
          Our Premium Brands
        </h1>
        {brands.length === 0 ? (
          <div
            className="pt-4 text-center text-muted-foreground"
            data-aos="fade-up"
          >
            No brands found
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {brands.map(({ _id, image, height,width }) => (
              <div key={_id} data-aos="fade-up">
                <div className="flex flex-col font-bold items-center p-4 rounded-md">
                  <img
                    src={image}
                    alt={"image"}
                    style={{width:`${width}px`, height:`${height}px`}}
                    className={`w-[${width}px] h-[${height}px] object-cover`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
