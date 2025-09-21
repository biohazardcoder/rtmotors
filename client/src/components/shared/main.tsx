"use client"

import * as React from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "../ui/separator"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

interface MainProps {
  type: string;
  brand: string;
  year: string | "any";
  price: string | "any";
  setType: (type: string) => void;
  setYear: (year: string | "any") => void;
  setPrice: (price: string | "any") => void;
  setBrand: (brand: string) => void;
}

export const Main = ({type,year,price, brand, setType, setYear, setPrice, setBrand}:MainProps) => {
  const [api, setApi] = React.useState<any>(null)

  React.useEffect(() => {
    if (!api) return
    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [api])

  const images = [
    "/main/m1.jpg",
    "/main/m2.jpg",
    "/main/m3.jpg",
    "/main/m4.jpg",
  ]

  return (
    <div>
        <Carousel
      opts={{ loop: true, align: "center" }}
      setApi={setApi}
      className="w-full overflow-auto h-[70vh] md:h-screen relative"
    >
      <CarouselContent>
        {images.map((src, idx) => (
          <CarouselItem key={idx}>
            <div className="relative  w-full h-[70vh] md:h-screen">
              <img
                src={src}
                alt={`main-${idx}`}
                className="absolute w-full h-full object-cover object-center rounded-none"
              />
                <div className="absolute inset-0 rounded-xl bg-black/20"></div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
        <div className="flex flex-col absolute items-center m-auto -bottom-[150px] md:-bottom-[35px] z-40 w-full">
        <div className="flex gap-4 mt-4 items-center text-white">
                <Button variant="ghost" onClick={() => setType("all")} className={cn(type === "all" && "border-b-4 pb-2", "rounded-none hover:bg-transparent hover:text-white")}>
                All
                </Button>
                <Button variant="ghost" onClick={() => setType("new")} className={cn(type === "new" && "border-b-4 pb-2", "rounded-none hover:bg-transparent hover:text-white")}>
                New
                </Button>
                <Button variant="ghost" onClick={() => setType("used")} className={cn(type === "used" && "border-b-4 pb-2", "rounded-none hover:bg-transparent hover:text-white" )}>
                Used
                </Button>
        </div>

        <div className="grid grid-cols-1 w-full md:w-auto md:flex md:items-center rounded-lg md:rounded-full md:p-4 gap-2 md:gap-4 p-3 mt-4 z-[100] bg-white">
                <Select value={brand} onValueChange={setBrand} >
                <SelectTrigger className="md:w-[180px] md:text-base flex items-center justify-center w-full">
                <SelectValue placeholder="Any Makes" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">Any Makes</SelectItem>
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
                <Separator orientation="vertical" />
                <Select value={year === "any" ? "any" : String(year)} onValueChange={val => setYear(val === "any" ? "any" : val)}>
                <SelectTrigger className="md:w-[180px] md:text-base flex items-center justify-center w-full">
                <SelectValue placeholder="Any Years" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="any">Any Years</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
                </Select>
                <Separator orientation="vertical" />
                <Select value={price === "any" ? "any" : String(price)} onValueChange={val => setPrice(val === "any" ? "any" : val)}>
                <SelectTrigger className="md:w-[180px] md:text-base flex items-center justify-center w-full">
                <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="25000-50000">25,000$ - 50,000$</SelectItem>
                <SelectItem value="50000-100000">50,000$ - 100,000$</SelectItem>
                <SelectItem value="100000-7777777">100,000$ - MORE</SelectItem>
                </SelectContent>    
                </Select>
                <a href={"./#search"} className="scroll-smooth">
                <Button className="bg-blue-500 w-full md:w-auto text-white hover:bg-blue-600 ">
                <Search />
                Search
                </Button>
                </a>
        </div>
        </div>
    </div>
  )
}
