import type { VehicleTypes } from "@/types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Car, Fuel, MapPin, X } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../ui/button";
import { HashLink } from "react-router-hash-link";

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
      <div className="bg-[#e7e7e7] min-h-[20vh]">
        <div className="py-8 px-[5%]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-3xl font-bold" data-aos="fade-up">
              Our Cars
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md p-4" data-aos="fade-up">
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
  const soldOut = soldOutCars;

  // 🔥 price filter diapazon
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

  const shuffledVehicles = filteredVehicles.filter((item) => item.type === "new").slice(0, 4);
  const filteredVehiclesToShow = shuffledVehicles;

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

  return (
    <div className="bg-[#e7e7e7] min-h-[20vh]" id="search">
      <div className="py-8 px-[5%]">


        <div className="flex items-center justify-between border-b-2 pb-6 border-primary" data-aos="fade-up">
          <h1 className="text-lg md:text-3xl font-bold">
            Our Cars
          </h1>
          <HashLink to="/cars/#all">
            <Button className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base ">
              More
            </Button>
          </HashLink>
        </div>
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap mt-6 gap-2 mb-4" data-aos="fade-up">
            {activeFilters.map((filter, i) => (
              <Button
                key={i}
                variant="outline"
                className="flex uppercase font-semibold items-center gap-2 text-sm"
                onClick={filter.clear}
              >
                {filter.label} <X size={14} />
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
                            <img src={image} alt={name} className="w-full h-56 md:h-64 object-cover" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
                      <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
                    </Carousel>

                    {stock === 0 ? (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                        Sold out
                      </span>
                    ) : status && status?.text?.length > 0 ? (
                      <span
                        className="absolute top-3 left-3 text-black text-sm font-semibold px-3 py-1 rounded-md shadow"
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

                  <div className="p-6 h-full flex flex-col">
                    <div>
                      <h2
                        className="text-lg font-semibold hover:text-blue-600 cursor-pointer"
                        data-aos="fade-up"
                      >
                        {name} - {year}
                      </h2>
                    </div>
                    <div>
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
                      <div className="flex items-center justify-between" data-aos="fade-up">
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
                        <Link to={`/cars/${_id}`} className="text-blue-600 text-sm hover:underline">
                          View Details
                        </Link>
                      </div>
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
            <div className="flex items-center justify-between border-b-2 border-primary pb-6  mb-6">
              <h1 className="text-xl md:text-3xl font-bold">Sold Out</h1>
              <HashLink smooth to="/cars/#sold-out">
                <Button className="text-xs bg-blue-500 text-white hover:bg-blue-600 md:text-base ">
                  More
                </Button>
              </HashLink>
            </div>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[18px]  right-[110px] rounded-md md:right-[120px] left-[100%-20px]" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[18px] right-[68px] rounded-md md:right-[78px] left-[100%-30px]" />
            <CarouselContent>
              {soldOut.map(({ _id, images, name }) => (
                <CarouselItem key={_id} className="basis-1/1 md:basis-1/3 lg:basis-1/4">
                  <img
                    src={images[0]}
                    alt={name}
                    className="w-full h-64 object-cover object-center rounded-sm"
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
