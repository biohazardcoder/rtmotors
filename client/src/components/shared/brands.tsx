import {
  Carousel,
  CarouselContent,
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
      <div className="hidden md:block">
        <div className="py-8 px-[5%]">
          <h1
            className="text-lg md:text-3xl font-bold text-white"
            data-aos="fade-up"
          >
            Our Premium Brands
          </h1>
          <div className="block mt-8">
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
            >
              <CarouselContent className="gap-3">
                {[...Array(10)].map((_, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                  >
                    <div className="flex flex-col font-bold items-center p-4 rounded-md">
                      <Skeleton className="w-24 h-24 rounded-md" />
                    </div>
                  </div>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  const brands = (data as BrandTypes[]) || [];
  
  return (
    <div className="bg-[#171f3a] hidden md:block">
      <div className="py-8 px-[5%]">
        <h1
          className="text-lg text-white md:text-3xl font-bold"
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
