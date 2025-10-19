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
import { Header } from "@/components/shared/header";
import ProgressiveImage from "@/components/shared/progress-image";
import { useTranslation } from "react-i18next";

export const Cars = () => {
  const { data, isLoading } = useSWR("/car", fetcher);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const {t} = useTranslation();
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="py-8 px-[5%]">
        <div className="flex items-center justify-between border-b-2 border-primary-foreground pb-6">
            <h1 className="text-xl md:text-3xl font-bold text-white">{t("allCars")}</h1>
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
              <ProgressiveImage height="h-56 md:h-64" src={image} alt={name} className="w-full h-56 md:h-64 object-cover" />
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
          {t("soldOut")}
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
                  <>{t("priceConsultation")}</>
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
            {t("viewDetails")}
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
          <h1 className="text-xl md:text-3xl font-bold text-white">{t("allCars")}</h1>
          <div>
            <Select onValueChange={setSelectedBrand}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder={t("brands")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("brands")}</SelectItem>
                <SelectItem value="mercedes-benz">Mercedes Benz</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="lexus">Lexus</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="kia">KIA</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="land-rover">Land Rover</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="ferrari">Ferrari</SelectItem>
                <SelectItem value="lambo">Lambo</SelectItem>
                <SelectItem value="porsche">Porsche</SelectItem>
                <SelectItem value="rolls-royce">Rolls Royce</SelectItem>
                <SelectItem value="tesla">Tesla</SelectItem>
                <SelectItem value="bugatti">Bugatti</SelectItem>
                <SelectItem value="cadillac">Cadillac</SelectItem>
                <SelectItem value="bently">Bently</SelectItem>        
                <SelectItem value="aston-martin">Aston Martin</SelectItem>        
                <SelectItem value="chevrolet">Chevrolet</SelectItem>  
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {availableCars.length === 0 ? (
            <p className="text-white">{t("noVehiclesFound")}</p>
          ) : (
            availableCars.map(renderCarCard)
          )}
        </div>
      </div>
      <Footer />
      <Header/>
    </div>
  );
};
