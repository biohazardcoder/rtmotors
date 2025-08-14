import type { VehicleTypes } from "@/types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Car, Fuel, MapPin } from "lucide-react";

export const Vehicles = ({type,year,price, brand}:{type:string,year:number,price:number,brand:string}) => {
  const vehicles: VehicleTypes[] = [
    {
      _id: "1",
      brand: "mclaren",
      name: "McLaren Artura 3.0",
      images: ["/cars/mclaren1.jpg", "/cars/mclaren2.jpg", "/cars/mclaren3.jpg"],
      description: "Coupe Pure Innovation on Four Wheels",
      oldPrice: 20000,
      currentPrice: 18000,
      miles: 790,
      fuelType: "Hybrid",
      transmission: "Manual",
      year: 2024,
      stock: 2,    
      comments: [],
      status: {
        color: "000",
        bg: "00ff00",
        text: "On Sale"
      },
      type: "new"
    },
    {
      _id: "2",
      brand: "rolls-royce",
      name: "Rolls-Royce Spectre",
      images: ["/cars/rolls-royce1.jpg", "/cars/rolls-royce2.jpg", "/cars/rolls-royce3.jpg", "/cars/rolls-royce4.jpg", "/cars/rolls-royce5.jpg"],
      description: "The First All-Electric Ultra-Luxury Coupe",
      oldPrice: 0,
      currentPrice: 20000,
      miles: 723,
      fuelType: "Electric",
      transmission: "Manual",
      year: 2021,
      stock: 10,
      comments: [],
      status: {
        color: "000",
        bg: "ff0",
        text: "Great price"
      },
      type: "new"
    },
    {
      _id: "3",
      brand: "bmw",
      name: " BMW X7 ",
      images: ["/cars/bmw1.jpg", "/cars/bmw2.jpg", "/cars/bmw3.jpg", "/cars/bmw4.jpg"],
      description: "XDRIVE",
      oldPrice: 0,
      currentPrice: 22000,
      miles: 11800,
      fuelType: "Gasoline",
      transmission: "Manual",
      year: 2021,
      stock: 10,
      comments: [],
      type: "used"
    },
     {
      _id: "4",
      brand: "bugatti",
      name: " Bugatti Chiron ",
      images: ["/cars/bugatti1.jpg", "/cars/bugatti2.jpg", "/cars/bugatti3.jpg"],
      description: "A Century of Speed",
      oldPrice: 0,
      currentPrice: 16000,
      miles: 5300,
      fuelType: "Gasoline",
      transmission: "Manual",
      year: 2021,
      stock: 10,
      comments: [],
      type: "used"
    },
     {
      _id: "5",
      brand: "range-rover",
      name: "Range Rover",
      images: ["/cars/range-rover1.jpg", "/cars/range-rover2.jpg", "/cars/range-rover3.jpg", "/cars/range-rover4.jpg"],
      description: "Luxury SUV",
      oldPrice: 0,
      currentPrice: 12000,
      miles: 7100,
      fuelType: "Gasoline",
      transmission: "Manual",
      year: 2021,
      stock: 10,
      comments: [],
      type: "used"
    },
     {
      _id: "6",
      brand: "lamborghini",
      name: "Lamborghini Urus",
      images: ["/cars/lamborghini1.jpg", "/cars/lamborghini2.jpg", "/cars/lamborghini3.jpg"],
      description: "Yellow Luxury SUV",
      oldPrice: 32000,
      currentPrice: 28000,
      miles: 23634,
      fuelType: "Gasoline",
      transmission: "Manual",
      year: 2024,
      stock: 10,
      comments: [],
      type: "new",
      status: {
        color: "fff",
        bg: "00f",
        text: "New Arrival"
      }
    },
  ];


  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (type === "all" || vehicle.type === type) &&
      (year === 0 || vehicle.year === year) &&
      (price === 0 || vehicle.currentPrice >= price) &&
      (brand === "all" || vehicle.brand === brand)
    );
  });

  return (
    <div className="bg-[#e7e7e7] min-h-[20vh]" id="search">
      <div className="py-8 px-[5%]">
        <h1 className="text-3xl font-bold">Explore All Vehicles</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {
            filteredVehicles.length === 0 ? (
              <p>No vehicles found</p>
            ) : (
                filteredVehicles.map(
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
              status
            }) => (
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
                            className="w-full h-64 object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                    {stock === 0 ? (<span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                    Out of Stock
                  </span>) : status ? (
                    <span
                      className="absolute top-3 left-3 text-black text-sm font-semibold px-3 py-1 rounded-full shadow"
                      style={{ color: `#${status.color}`, backgroundColor: `#${status.bg}` }}
                    >
                      {status.text}
                    </span>
                  ) : ""}
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">
                    {name} - {year}
                  </h2>
                  <p className="text-secondary-foreground text-sm mb-3">{description}</p>

                  <div className="flex justify-between text-muted-foreground text-sm border-t border-b py-4 mb-3">
                    <div className="flex flex-col items-center gap-1 font-semibold">
                      <span><MapPin/></span>
                      {miles.toLocaleString()} Miles
                    </div>
                    <div className="flex flex-col items-center gap-1 font-semibold">
                      <span><Fuel/></span>
                      {fuelType}
                    </div>
                    <div className="flex flex-col items-center gap-1 font-semibold">
                      <span><Car/></span>
                      {transmission}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                   <div>
                     {
                        oldPrice > 0 && (
                            <p className="text-sm text-gray-500 line-through">
                                ${oldPrice.toLocaleString()}
                            </p>
                        )
                    }
                    <p className="text-2xl font-bold text-gray-900">
                      ${currentPrice.toLocaleString()}
                    </p>
                   </div>
                    <a
                      href="#"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};
