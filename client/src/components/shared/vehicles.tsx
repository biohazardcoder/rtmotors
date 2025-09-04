import type { VehicleTypes } from "@/types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Car, Fuel, MapPin } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../ui/button";
import { HashLink } from "react-router-hash-link";

export const Vehicles = ({ type, year, price, brand }: { type: string; year: number; price: number; brand: string }) => {
  const { data, isLoading } = useSWR("/car", fetcher);

  useEffect(() => {
    AOS.init({ duration: 800,});
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7] min-h-[20vh]">
        <div className="py-8 px-[5%]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-3xl font-bold" data-aos="fade-up">
              Our Cars
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-md p-4"
                data-aos="fade-up"
              >
                <Skeleton className="w-full h-40 rounded-md" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between gap-3">
                    <Skeleton className="h-10 w-16" />
                    <Skeleton className="h-10 w-16" />
                    <Skeleton className="h-10 w-16" />
                  </div>
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
  const soldOut =  soldOutCars.slice(0,8)
  const filteredVehicles = inStock.filter((vehicle) => {
    return (
      (type === "all" || vehicle.type === type) &&
      (year === 0 || vehicle.year === year) &&
      (price === 0 || vehicle.currentPrice >= price) &&
      (brand === "all" || vehicle.brand === brand)
    );
  });

  const shuffledVehicles = filteredVehicles.sort(() => Math.random() - 0.5).slice(0, 6);
  const filteredVehiclesToShow = shuffledVehicles;

  return (
    <div className="bg-[#e7e7e7] min-h-[20vh]" id="search">
      <div className="py-8 px-[5%]">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-3xl font-bold" data-aos="fade-up">
            Our Cars
          </h1>
          <HashLink to="/cars#all">
              <Button
              data-aos="fade-up"
            className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base "
            >
              More
            </Button>
          </HashLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredVehiclesToShow.length === 0 ? (
            <p data-aos="fade-up">No vehicles found</p>
          ) : (
            filteredVehiclesToShow.map(
              ({
                _id,
                currentPrice,
                fuelType,
                images,
                miles,
                name,
                transmission,
                description,
                oldPrice,
                year,
                stock,
                status,
              }) => (
                <div
                  key={_id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  data-aos="fade-up"
                >
                  <div className="relative">
                    <Carousel>
                      <CarouselContent>
                        {images.map((image, index) => (
                          <CarouselItem key={index}>
                            <img
                              src={image}
                              alt={name}
                              className="w-full h-56 md:h-64 object-cover"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
                      <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
                    </Carousel>

                    {stock === 0 ? (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                        Sold out
                      </span>
                    ) : status && status?.text?.length > 0 ? (
                      <span
                        className="absolute top-3 left-3 text-black text-sm font-semibold px-3 py-1 rounded-full shadow"
                        style={{
                          color: `#${status?.color}`,
                          backgroundColor: `#${status?.bg}`,
                        }}
                      >
                        {status?.text}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="p-6">
                    <h2
                      className="text-lg font-semibold hover:text-blue-600 cursor-pointer"
                      data-aos="fade-up"
                    >
                      {name} - {year}
                    </h2>
                    <p
                      className="text-secondary-foreground text-sm mb-3"
                      data-aos="fade-up"
                    >
                      {description}
                    </p>

                    <div
                      className="flex justify-between text-muted-foreground text-sm border-t border-b py-4 mb-3"
                      data-aos="fade-up"
                    >
                      <div className="flex flex-col items-center gap-1 font-semibold">
                        <span>
                          <MapPin />
                        </span>
                        {miles.toLocaleString()} Miles
                      </div>
                      <div className="flex flex-col items-center gap-1 font-semibold capitalize">
                        <span>
                          <Fuel />
                        </span>
                        {fuelType}
                      </div>
                      <div className="flex flex-col items-center gap-1 font-semibold capitalize">
                        <span>
                          <Car />
                        </span>
                        {transmission}
                      </div>
                    </div>

                    <div
                      className="flex items-center justify-between"
                      data-aos="fade-up"
                    >
                      <div>
                        {oldPrice > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ${oldPrice.toLocaleString()}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-gray-900">
                          ${currentPrice.toLocaleString()}
                        </p>
                      </div>
                      <Link
                        to={`/cars/${_id}`}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {soldOut.length > 0 && (
        <div className="py-8 px-[5%]" data-aos="fade-up">
            <Carousel>
          <div className="flex items-center justify-between  mb-8">
            <h1 className="text-xl md:text-3xl font-bold" >
              Sold Out
            </h1>
          <HashLink  smooth to="/cars#sold-out">
            <Button
            className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base "
            >
              More
            </Button>
          </HashLink>
          </div>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[18px]  right-[110px] rounded-md md:right-[120px] left-[100%-20px]" />
              <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[18px] right-[68px] rounded-md md:right-[78px] left-[100%-30px]" />
                  <CarouselContent>
                {soldOut.map(({ _id, images, name }) => (
                  <CarouselItem key={_id} className="md:basis-1/4">
                    <img
                      src={images[0]}
                      alt={name}
                      className="w-full h-64 object-cover object-bottom rounded-sm"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
      )}
    </div>
  );
};
