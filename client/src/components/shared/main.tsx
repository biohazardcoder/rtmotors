"use client"

import * as React from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
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
import { fetcher } from "@/middlewares/Fetcher";
import useSWR from "swr";

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

export const Main = ({ type, year, price, brand, setType, setYear, setPrice, setBrand }: MainProps) => {
  const [api, setApi] = React.useState<any>(null)
  const { data, isLoading } = useSWR("/car", fetcher);

  React.useEffect(() => {
    if (!api) return
    const interval = setInterval(() => {
      api.scrollNext()
    }, 10000)
    return () => clearInterval(interval)
  }, [api])

  const desktopImages = [
    "/main/m1.jpg",
    "/main/m2.jpg",
    "/main/m3.jpg",
    "/main/m4.jpg",
    "/main/m5.jpg",
  ]

  const mobileImages = [
    "/main/mobile/m1.jpg",
    "/main/mobile/m2.jpg",
    "/main/mobile/m3.jpg",
    "/main/mobile/m4.jpg",
    "/main/mobile/m5.jpg",
  ]

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeImages = isMobile ? mobileImages : desktopImages;

  const brands = [
    { value: "mercedes-benz", label: "Mercedes Benz" },
    { value: "bmw", label: "BMW" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "lexus", label: "Lexus" },
    { value: "toyota", label: "Toyota" },
    { value: "hyundai", label: "Hyundai" },
    { value: "kia", label: "KIA" },
    { value: "ford", label: "Ford" },
    { value: "land-rover", label: "Land Rover" },
    { value: "audi", label: "Audi" },
    { value: "ferrari", label: "Ferrari" },
    { value: "lambo", label: "Lambo" },
    { value: "porsche", label: "Porsche" },
    { value: "rolls-royce", label: "Rolls Royce" },
    { value: "tesla", label: "Tesla" },
    { value: "bugatti", label: "Bugatti" },
    { value: "cadillac", label: "Cadillac" },
    { value: "bently", label: "Bently" },
    { value: "aston-martin", label: "Aston Martin" },
    { value: "chevrolet", label: "Chevrolet" },
  ];

  const brandCounts: Record<string, number> = React.useMemo(() => {
    if (!data) return {};
    return data.reduce((acc: Record<string, number>, car: any) => {
      if (car.stock > 0) {
        const brand = car.brand?.toLowerCase();
        if (!acc[brand]) acc[brand] = 0;
        acc[brand]++;
      }
      return acc;
    }, {});
  }, [data]);

  return (
    <div className="relative flex items-center justify-center">
      <Carousel
        opts={{ loop: true, align: "center" }}
        setApi={setApi}
        className="w-full overflow-auto h-[70vh] md:h-screen relative"
      >
        <CarouselContent>
          {activeImages.map((src, idx) => (
            <CarouselItem key={idx}>
              <div className="relative w-full h-[70vh] md:h-screen">
                <img
                  src={src}
                  alt={`main-${idx}`}
                  className="absolute w-full h-full object-cover object-center rounded-none"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col absolute items-center -bottom-[150px] md:-bottom-[35px] z-40 w-auto m-auto">
        <div className="flex gap-4 mt-4 items-center text-white">
          <Button variant="ghost" onClick={() => setType("all")} className={cn(type === "all" && "border-b-4 pb-2", "rounded-none hover:bg-transparent hover:text-white")}>
            All
          </Button>
          <Button variant="ghost" onClick={() => setType("new")} className={cn(type === "new" && "border-b-4 pb-2", "rounded-none hover:bg-transparent hover:text-white")}>
            New
          </Button>
          <Button variant="ghost" onClick={() => setType("used")} className={cn(type === "used" && "border-b-4 pb-2", "rounded-none hover:bg-transparent hover:text-white")}>
            Used
          </Button>
        </div>

        <div className="grid grid-cols-1 w-full md:w-auto md:flex md:items-center rounded-lg md:rounded-full md:p-4 gap-2 md:gap-4 p-3 mt-4 z-[100] bg-white">
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger className="md:w-[180px] md:text-base flex items-center justify-center w-full">
              <SelectValue placeholder="Any Makes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Makes</SelectItem>
              {brands.map(b => {
                const count = brandCounts[b.value] ?? 0;
                return (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}{" "}
                    {isLoading ? <Loader2 className="animate-spin text-blue-500" size={6} /> :
                      count > 0 ? <span className="bg-blue-500 py-0.5 px-[7px] text-white text-xs rounded-full">{count}</span> : ""}
                  </SelectItem>
                );
              })}
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
