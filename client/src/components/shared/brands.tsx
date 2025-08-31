import {
Carousel,
CarouselContent,
CarouselItem,
} from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import type { BrandTypes } from "@/types/types";
import { Link } from "react-router-dom";
import useSWR from "swr";
import AutoScroll from "embla-carousel-auto-scroll";
import { Skeleton } from "../ui/skeleton";
export const Brands = () => {

const { data, isLoading } = useSWR("/brand", fetcher);

    if (isLoading) {
        return (
            <div className="bg-[#e7e7e7]">
            <div className="py-8 px-[5%]">
                <h1 className="text-xl md:text-3xl font-bold">Explore Our Premium Brands</h1>
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
const brands= data as BrandTypes[] || [];
return (
    <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]">
            <h1 className="text-xl md:text-3xl font-bold">Explore Our Premium Brands</h1>
            {brands.length === 0 ? <div className="pt-4 text-center text-muted-foreground">No brands found</div>:
            <div>
                <div className="block mt-8">
                    <Carousel  opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              AutoScroll({
                speed: 1, 
                stopOnInteraction: false, 
              }),
            ]}>
                        <CarouselContent>
                            {brands.map(({_id,image,title,url}) => (
                                <CarouselItem  key={_id} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
                                    <div className="flex flex-col bg-white font-bold items-center p-4 rounded-md">
                                        <img
                                            src={image}
                                            alt={title}
                                            className="w-24 h-24 object-contain"
                                        />
                                        <Link to={url} target="_blank" >
                                                <span className="mt-2 text-xs ">{title}</span>
                                        </Link>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
            }
        </div>
    </div>
);
};
