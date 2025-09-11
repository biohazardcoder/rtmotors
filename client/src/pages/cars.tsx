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
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Menus } from "@/components/shared/menus";

export const Cars = () => {
  const { data, isLoading } = useSWR("/car", fetcher);
  const [selectedBrand, setSelectedBrand] = useState("all");

  // 🔹 Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7] min-h-screen pt-14">
        <Navbar />
        <div className="py-8 px-[5%]">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-bold">All Cars</h1>
            <Skeleton className="w-36 h-10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-md p-4"
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

  const filteredVehicles =
    selectedBrand === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.brand === selectedBrand);

  const availableCars = filteredVehicles.filter((car) => car.stock > 0);
  const soldOutCars = filteredVehicles.filter((car) => car.stock === 0);

  const renderCarCard = ({
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
  }: VehicleTypes) => (
    <div
      key={_id}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
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
        <h2 className="text-lg font-semibold cursor-pointer">
          {name} - {year}
        </h2>

        <div className="flex justify-between text-muted-foreground text-sm border-t border-b py-4 mb-3">
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

        <div className="flex items-center justify-between">
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
  );

  return (
    <div className="bg-[#e7e7e7] pt-24">
      <Menus/>
      <Navbar />
      <div className="py-8 px-[5%]" id="all">
        <div className="flex items-center justify-between border-b-2 border-primary pb-6">
          <h1 className="text-xl md:text-3xl font-bold">All Cars</h1>
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
            <p>No available cars</p>
          ) : (
            availableCars.map(renderCarCard)
          )}
        </div>

               {
            soldOutCars.length >0 && (
        <div className="py-8">
          <Carousel>
            <div className="flex items-center justify-between border-b-2 border-primary pb-6  mb-6">
              <h1 className="text-xl md:text-3xl font-bold">Sold Out</h1>
            </div>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[18px]  right-[45px] rounded-md  left-[100%-20px]" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[18px] right-[0px] rounded-md  left-[100%-30px]" />
            <CarouselContent>
              {soldOutCars.map(({ _id, images, name }) => (
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
            )
       }
      </div>
      <Footer />
    </div>
  );
};
