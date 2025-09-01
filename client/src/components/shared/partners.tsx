import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import type { PartnerTypes } from "@/types/types";
import AutoScroll from "embla-carousel-auto-scroll";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const Partners = () => {
  const { data, isLoading } = useSWR("/partner", fetcher);
  const partners = (data as PartnerTypes[]) || [];

  useEffect(() => {
    AOS.init({ duration: 800, });
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]" data-aos="fade-up">
          <h1 className="text-xl md:text-3xl font-bold">Our Partners</h1>
          <div className="mt-8">
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
            >
              <CarouselContent>
                {[...Array(5)].map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                  >
                    <Skeleton className="w-full h-24 rounded-lg" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e7e7e7]">
      <div className="py-8 px-[5%]" data-aos="fade-up">
        <h1 className="text-xl md:text-3xl font-bold">Our Partners</h1>
        <div className="mt-8">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              AutoScroll({
                speed: 1,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {partners.map(({ _id, image, url }) => (
                <CarouselItem
                  key={_id}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <Link to={url} target="_blank">
                    <img
                      src={image}
                      alt={url}
                      className="w-full h-full object-contain object-center bg-white rounded-lg"
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
