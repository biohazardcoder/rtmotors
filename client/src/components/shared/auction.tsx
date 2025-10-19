import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import type { AuctionTypes } from "@/types/types";
import AutoScroll from "embla-carousel-auto-scroll";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

export const Auction = () => {
  const { data, isLoading } = useSWR("/auction", fetcher);
  const auctions = (data as AuctionTypes[]) || [];
  const {t} = useTranslation();
  
  useEffect(() => {
    AOS.init({ duration: 800,  });
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="py-8 px-[5%]" data-aos="fade-up">
          <h1 className="text-sm md:text-3xl font-bold text-white">{t("auction_holders")}</h1>
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
                    <Skeleton className="w-full h-28 rounded-lg" />
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
    <div className="bg-[#171f3a] text-white">
      <div className="py-8 px-[5%]" data-aos="fade-up">
        <h1 className="text-sm md:text-3xl font-bold">{t("auction_holders")}</h1>
        {auctions.length === 0 ? (
          <div
            className="pt-4 text-center text-muted-foreground"
            data-aos="fade-up"
          >
            {t("no_auction_holders")}
          </div>
        ) : (
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
                {auctions?.map(({ _id, image, url }) => (
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
        )}
      </div>
    </div>
  );
};
