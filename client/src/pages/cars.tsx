import type { VehicleTypes } from "@/types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Menus } from "@/components/shared/menus";
import VideoPlayer from "@/components/shared/video-player";
import { HashLink } from "react-router-hash-link";

export const Cars = () => {
  const { data, isLoading } = useSWR("/car", fetcher);
  const [selectedBrand, setSelectedBrand] = useState("all");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="py-8 px-[5%]">
        <div className="flex items-center justify-between border-b-2 border-primary-foreground pb-6">
            <h1 className="text-xl md:text-3xl font-bold text-white">All Cars</h1>
            <Skeleton className="w-36 h-10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-md p-4"
              >
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

  const filteredVehicles =
    selectedBrand === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.brand === selectedBrand);

  const availableCars = filteredVehicles.filter((car) => car.stock > 0);
  const soldOutCars = filteredVehicles.filter((car) => car.stock === 0);

  const renderCarCard = ({
    _id,
    currentPrice,
    images,
    name,
    video,
    stock,
    status,
    brand,
    oldPrice
  }: VehicleTypes) => (
    <div
    key={_id}
    className="bg-[#e6e6e7]  rounded-xl overflow-hidden shadow-[#fff] hover:scale-105  hover:shadow-xl  transition-shadow duration-100 ease-in-out"
  >
    <div className="relative ">
      <Carousel>
          {
            video? (<VideoPlayer videoUrl={video} />) : (
              <CarouselContent>
            {  images.map((image, index) => (
            <CarouselItem key={index}>
              <img src={image} alt={name} className="w-full h-56 md:h-64 object-cover" />
            </CarouselItem>
          ))
        }
          </CarouselContent>
            )
          }
        {
          !video && <>
        <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
        <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
        </>
        }
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
            backgroundColor: status?.bg === "0f0" ? "#003939" : `#${status?.bg}`,
          }}
        >
          {status?.text}
        </span>
      ) : (
        ""
      )}
    </div>

    <div className="p-4 h-auto justify-between   flex flex-col">
      <div>
        <h2
          className="text-sm uppercase mb-1 font-semibold text-[#4ecdc4] "
        
        >
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
          <div>
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
            </div>
          <HashLink to={`/cars/${_id}/#detail`}   className="bg-gradient-to-l from-[#ff6b6b] to-[#ff8e8e] text-sm text-white px-3 py-1 rounded-md ">
            View Details
          </HashLink>
        </div>
    </div>
  </div>
  );

  return (
    <div className="pt-24">
      <Menus/>
      <Navbar />
      <div className="py-8 px-[5%]" id="all">
        <div className="flex items-center justify-between border-b-2 border-primary-foreground pb-6">
          <h1 className="text-xl md:text-3xl font-bold text-white">All Cars</h1>
          <div>
            <Select onValueChange={setSelectedBrand}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Filter by brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any brand</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                <SelectItem value="bugatti">Bugatti</SelectItem>
                <SelectItem value="ferrari">Ferrari</SelectItem>
                <SelectItem value="lamborghini">Lamborghini</SelectItem>
                <SelectItem value="mclaren">McLaren</SelectItem>
                <SelectItem value="rolls-royce">Rolls-Royce</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {availableCars.length === 0 ? (
            <p className="text-white">No available cars</p>
          ) : (
            availableCars.map(renderCarCard)
          )}
        </div>

               {
            soldOutCars.length >0 && (
        <div className="py-8">
          <Carousel>
            <div className="flex items-center justify-between border-b-2 border-primary-foreground pb-6  mb-6">
              <h1 className="text-xl md:text-3xl font-bold text-white">Sold Out</h1>
            </div>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[18px]  right-[45px] rounded-md  left-[100%-20px]" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[18px] right-[0px] rounded-md  left-[100%-30px]" />
            <CarouselContent>
              {soldOutCars.map(({ _id, images, name,video }) => (
               <CarouselItem key={_id} className="basis-1/1 md:basis-1/3 lg:basis-1/4">
                  <div className="group relative overflow-hidden rounded-xl">
                        {
                          video? (<VideoPlayer videoUrl={video} />) : (
                            <CarouselContent>
                          {  images.map((image, index) => (
                          <CarouselItem key={index}>
                            <img src={image} alt={name} className="w-full h-64 object-cover object-center rounded-xl shadow-lg 
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
            )
       }
      </div>
      <Footer />
    </div>
  );
};
