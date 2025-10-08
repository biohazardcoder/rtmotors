import type { VehicleTypes } from "@/types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {  X } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../ui/button";
import { HashLink } from "react-router-hash-link";
import VideoPlayer from "./video-player";
import ProgressiveImage from "./progress-image";

interface VehiclesProps {
  type: string;
  year: string | "any";
  price: string | "any"
  brand: string;
  setType: (type: string) => void;
  setYear: (year: string | "any") => void;
  setPrice: (price: string) => void;
  setBrand: (brand: string) => void;
}

export const Vehicles = ({ type, year, price, brand, setType, setYear, setPrice, setBrand }: VehiclesProps) => {
  const { data, isLoading } = useSWR("/car", fetcher);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[20vh] mt-40 md:mt-0">
        <div className="py-8 px-[5%]">
         <div className="flex items-center justify-between border-b-2 pb-6 border-primary-foreground" data-aos="fade-up">
          <h1 className="text-lg md:text-3xl font-bold text-white">
            Our Cars
          </h1>
          <HashLink to="/cars/#all">
            <Button className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base ">
              More
            </Button>
          </HashLink>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md p-4" data-aos="fade-up">
                <Skeleton className="w-full h-48 rounded-md" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const vehicles = (data as VehicleTypes[]) || [];
  const inStock = vehicles.filter((item) => item.stock > 0);
  const soldOutCars = vehicles.filter((item) => item.stock === 0);
  const soldOut = soldOutCars.slice(0, 6);
  const newCars = inStock.filter((item) => item.type === "new").slice(0, 4);
  const allCars = inStock
    .filter((item) => !newCars.some((newCar) => newCar._id === item._id)) 
    .slice(0, 6);
  const filteredVehicles = inStock.filter((vehicle) => {
    let priceMatch = true;
    if (price !== "any") {
      const [min, max] = price.split("-").map(Number);
      priceMatch = vehicle.currentPrice >= min && vehicle.currentPrice <= max;
    }
    return (
      (type === "all" || vehicle.type === type) &&
      (year === "any" || vehicle.year === Number(year)) &&
      priceMatch &&
      (brand === "all" || vehicle.brand === brand)
    );
  });

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (year !== "any") activeFilters.push({ label: `${year}`, clear: () => setYear("any") });
  if (brand !== "all") activeFilters.push({ label: brand, clear: () => setBrand("all") });
  if (type !== "all") activeFilters.push({ label: type, clear: () => setType("all") });
  if (price !== "any") {
    const [min, max] = price.split("-");
    activeFilters.push({
      label: `${Number(min).toLocaleString()}$ - ${Number(max).toLocaleString()}$`,
      clear: () => setPrice("any"),
    });
  }

  const hasActiveFilters = activeFilters.length > 0;

  const shuffledVehicles = hasActiveFilters
    ? filteredVehicles.slice(0, 4)
    : newCars

  const filteredVehiclesToShow = shuffledVehicles;
  return (
    <div className="bg-[#171f3a] min-h-[20vh] mt-40 md:mt-0" id="search">
      <div className="py-8 px-[5%]">
        <div className="flex items-center justify-between border-b-2 pb-6 border-primary-foreground" data-aos="fade-up">
          <h1 className="text-lg md:text-3xl font-bold text-white">
            {
              activeFilters.length > 0 ? "Filtered Cars" : "New Cars"
            }
          </h1>
          <HashLink to="/cars/#all">
            <Button className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base ">
              More
            </Button>
          </HashLink>
        </div>
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap mt-6 gap-2 mb-4" data-aos="fade-up">
           {activeFilters.map((filter, i) => {
            let displayLabel = filter.label;
            if (displayLabel.includes("-")) {
              const [min, max] = displayLabel.split("-");
              
              displayLabel =
                max === " 7,777,777$" ? `${min} - More` : `${min} - ${max}`;
            }

            return (
              <Button
                key={i}
                variant="outline"
                className="flex uppercase font-semibold items-center gap-2 text-sm"
                onClick={filter.clear}
              >
                {displayLabel} <X size={14} />
              </Button>
            );
          })}

          </div>
        )}

      <Carousel data-aos="fade-up" >
        <CarouselPrevious className="bg-blue-500 text-white md:hidden hover:bg-blue-600 -top-[43px]  right-[110px] rounded-md md:right-[120px] left-[100%-20px]" />
            <CarouselNext className="bg-blue-500 text-white md:hidden hover:bg-blue-600 -top-[43px] right-[68px] rounded-md md:right-[78px] left-[100%-30px]" />
        <CarouselContent className="pb-10 pt-6 ">
          {filteredVehiclesToShow.length === 0 ? (
            <p
              data-aos="fade-up"
              className="text-muted-foreground w-full text-center"
            >
              No vehicles found
            </p>
          ) : (
            filteredVehiclesToShow.map(
              ({
                _id,
                currentPrice,
                images,
                name,
                oldPrice,
                brand,
                stock,
                video,
                status,
              }) => (
                <CarouselItem
                  key={_id}
                  data-aos="fade-up"
                  className="basis-1/1 sm:basis-1/2 lg:basis-1/4" 
                >
                  <div className="bg-[#e6e6e7] rounded-xl overflow-hidden shadow-[#fff] hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
                    <div className="relative">
                      {video ? (
                        <VideoPlayer videoUrl={video} />
                      ) : (
                        <Carousel>
                          <CarouselContent>
                            {images.map((image, index) => (
                              <CarouselItem key={index}>
                                <ProgressiveImage
                                  src={image}
                                  alt={name}
                                  height="h-56 md:h-64"
                                  className="w-full h-56 md:h-64 object-cover"
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
                          <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
                        </Carousel>
                      )}

                      {stock === 0 ? (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                          Sold out
                        </span>
                      ) : status && status?.text?.length > 0 ? (
                        <span
                          className="absolute top-3 left-3 text-black text-sm font-semibold px-3 py-1 rounded-md shadow"
                          style={{
                            color: `#${status?.color}`,
                            backgroundColor:
                              status?.bg === "0f0" ? "#003939" : `#${status?.bg}`,
                          }}
                        >
                          {status?.text}
                        </span>
                      ) : null}
                    </div>

                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h2 className="text-sm uppercase mb-1 font-semibold text-[#4ecdc4]">
                          {brand}
                        </h2>
                        <h2
                          className="text-base mb-1 text-black capitalize font-semibold truncate"
                          title={name}
                        >
                          {name.length > 30 ? name.slice(0, 30) + "..." : name}
                        </h2>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-black">
                          {currentPrice === 777 ? (
                            "Price Consultation"
                          ) : (
                            <>
                              ${currentPrice.toLocaleString()}{" "}
                              {oldPrice > 0 && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ${oldPrice.toLocaleString()}
                                </span>
                              )}
                            </>
                          )}
                        </p>
                        <HashLink
                          to={`/cars/${_id}/#detail`}
                          className="bg-gradient-to-l from-[#ff6b6b] to-[#ff8e8e] text-sm text-white px-3 py-1 rounded-md"
                        >
                          View Details
                        </HashLink>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )
            )
          )}
        </CarouselContent>
      </Carousel>
      </div>

       {allCars.length > 0 && (
  <div className="px-[5%] pb-10" data-aos="fade-up">
    <div className="flex items-center justify-between border-b-2 border-primary-foreground text-white pb-6 mb-6">
      <h1 className="text-xl md:text-3xl font-bold">All Cars</h1>
      <HashLink smooth to="/cars/#all">
        <Button className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base ">
          More
        </Button>
      </HashLink>
    </div>

    <Carousel>
      <CarouselContent>
        {allCars.map(({ _id, images, name, video ,brand,currentPrice,oldPrice,stock,status}) => (
           <CarouselItem
                  key={_id}
                  data-aos="fade-up"
                  className="basis-1/1 sm:basis-1/2 lg:basis-1/4" 
                >
                  <div className="bg-[#e6e6e7] rounded-xl overflow-hidden shadow-[#fff] hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
                    <div className="relative">
                      {video ? (
                        <VideoPlayer videoUrl={video} />
                      ) : (
                        <Carousel>
                          <CarouselContent>
                            {images.map((image, index) => (
                              <CarouselItem key={index}>
                                <ProgressiveImage
                                  src={image}
                                  alt={name}
                                  height="h-56 md:h-64"
                                  className="w-full h-56 md:h-64 object-cover"
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
                          <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
                        </Carousel>
                      )}

                      {stock === 0 ? (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                          Sold out
                        </span>
                      ) : status && status?.text?.length > 0 ? (
                        <span
                          className="absolute top-3 left-3 text-black text-sm font-semibold px-3 py-1 rounded-md shadow"
                          style={{
                            color: `#${status?.color}`,
                            backgroundColor:
                              status?.bg === "0f0" ? "#003939" : `#${status?.bg}`,
                          }}
                        >
                          {status?.text}
                        </span>
                      ) : null}
                    </div>

                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h2 className="text-sm uppercase mb-1 font-semibold text-[#4ecdc4]">
                          {brand}
                        </h2>
                        <h2
                          className="text-base mb-1 text-black capitalize font-semibold truncate"
                          title={name}
                        >
                          {name.length > 30 ? name.slice(0, 30) + "..." : name}
                        </h2>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-black">
                          {currentPrice === 777 ? (
                            "Price Consultation"
                          ) : (
                            <>
                              ${currentPrice.toLocaleString()}{" "}
                              {oldPrice > 0 && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ${oldPrice.toLocaleString()}
                                </span>
                              )}
                            </>
                          )}
                        </p>
                        <HashLink
                          to={`/cars/${_id}/#detail`}
                          className="bg-gradient-to-l from-[#ff6b6b] to-[#ff8e8e] text-sm text-white px-3 py-1 rounded-md"
                        >
                          View Details
                        </HashLink>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 -top-[68px]  right-[110px] rounded-md md:right-[120px] left-[100%-20px]" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 -top-[68px] right-[68px] rounded-md md:right-[78px] left-[100%-30px]" />
    </Carousel>
  </div>
)}


      {soldOut.length > 0 && (
        <div className="px-[5%]" data-aos="fade-up">
          <Carousel>
            <div className="flex items-center justify-between border-b-2 border-primary-foreground text-white pb-6  mb-6">
              <h1 className="text-xl md:text-3xl font-bold">Sold Out</h1>
              <HashLink smooth to="/sold-out/#all">
                <Button className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base ">
                  More
                </Button>
              </HashLink>
            </div>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[18px]  right-[110px] rounded-md md:right-[120px] left-[100%-20px]" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[18px] right-[68px] rounded-md md:right-[78px] left-[100%-30px]" />
            <CarouselContent>
              {soldOut.map(({ _id, images, name,video }) => (
                <CarouselItem key={_id} className="basis-1/1 md:basis-1/3 lg:basis-1/4">
                  <div className="group relative overflow-hidden rounded-xl">
                     {
                          video? (<VideoPlayer videoUrl={video} />) : (
                            <CarouselContent>
                          {  images.map((image, index) => (
                          <CarouselItem key={index}>
                            <ProgressiveImage height="h-64"  src={image} alt={name} className="w-full h-64 object-cover object-center rounded-xl shadow-lg 
                                transition-all duration-300 hover:rounded-xl
                                group-hover:scale-105 
                                group-hover:shadow-[0px_4px_15px_rgba(255,255,255,0.6)]" />
                          </CarouselItem>
                        ))
                      }
                        </CarouselContent>
                          )
                        }
                   </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
};
