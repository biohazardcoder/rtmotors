import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import type { BrandTypes } from "@/types/types";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import {  useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

export const Brands = () => {
  const { data, isLoading } = useSWR("/brand", fetcher);
  const {t} = useTranslation();
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (isLoading) {
    return (
      <div className="hidden md:block mt-10">
        <div className="py-8 px-[5%]">
          <h1
            className="text-lg md:text-3xl font-bold text-white"
            data-aos="fade-up"
          >
            {t("our_brands")}
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
    <div className="bg-[#171f3a] hidden md:block mt-10">
      <div className="py-8 px-[5%]">
        <h1
          className="text-lg text-white md:text-3xl font-bold"
          data-aos="fade-up"
        >
          {t("our_brands")}
        </h1>
        {brands.length === 0 ? (
          <div
            className="pt-4 text-center text-muted-foreground"
            data-aos="fade-up"
          >
            {t("no_brands")}
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {brands.map(({ _id, image, height, width }, idx) => {

                const naturalIndexes = [5, 3,2,4,10,6,7,16,9]; 

               const isNatural = naturalIndexes.includes(idx);

              return (
              <div key={_id} data-aos="fade-up">
                <div className="flex flex-col font-bold items-center p-4 rounded-md">
                  <img
                    src={image}
                    alt="image"
                    style={
                      isNatural 
                        ? {}
                        : { width: `${width}px`, height: `${height}px` } 
                    }
                    className={
                      idx === 5 ? "w-28" 
                      : idx === 9 ? "w-28" 
                      : idx === 4 ? "w-22" 
                      : idx === 3 ? "w-23" 
                      : idx === 2 ? "w-16"
                      : idx === 10 ? "w-12"
                      : idx === 6 ? "w-28"
                      : idx === 7 ? "w-34"
                      : idx === 16 ? "w-52"
                      
                      : "object-cover"}
                  />
                </div>
              </div>
            )

            })}

          </div>
        )}
      </div>
    </div>
  );
};
