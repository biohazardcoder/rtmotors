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
    import { Separator } from "../ui/separator";

    interface MainProps {
            type: string;
            brand: string;
            year: number | "any";
            price: number | "any";
            setType: (type: string) => void;
            setYear: (year: number | "any") => void;
            setPrice: (price: number | "any") => void;
            setBrand: (brand: string) => void;
    }
    export const Main = ({type,year,price, brand, setType, setYear, setPrice, setBrand}:MainProps) => {

    return (
            <div style={{backgroundImage: 'url(/bugatti.jpg)'}} 
            className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center space-y-4">
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
                    <h1 className="text-white font-bold">Find cars for sale and for rent near you</h1>
                    <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl">Find Your Perfect Car</h1>
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
                    {/* <div className="flex items-center gap-2 md:gap-4 p-3 mt-4 z-20 rounded-full bg-white"> */}
                    <div className="grid grid-cols-1 w-3/4 md:w-auto md:flex md:items-center rounded-lg md:rounded-full md:p-4  gap-2 md:gap-4 p-3 mt-4 z-20  bg-white">
                            <Select value={brand} onValueChange={setBrand} >
                                    <SelectTrigger className="md:w-[180px] md:text-lg  flex items-center justify-center w-full">
                                            <SelectValue placeholder="Any Makes" />
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value="all">Any Makes</SelectItem>
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
                            <Separator orientation="vertical" />
                            <Select value={year === "any" ? "any" : String(year)} onValueChange={val => setYear(val === "any" ? "any" : Number(val))}>
                                    <SelectTrigger className="md:w-[180px] md:text-lg flex items-center justify-center w-full">
                                            <SelectValue placeholder="Any Years" />
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value="0">Any Years</SelectItem>
                                            <SelectItem value="2020">2020</SelectItem>
                                            <SelectItem value="2021">2021</SelectItem>
                                            <SelectItem value="2022">2022</SelectItem>
                                            <SelectItem value="2023">2023</SelectItem>
                                            <SelectItem value="2024">2024</SelectItem>
                                            <SelectItem value="2025">2025</SelectItem>
                                    </SelectContent>
                            </Select>
                            <Separator orientation="vertical" />
                            <Select value={price === "any" ? "any" : String(price)} onValueChange={val => setPrice(val === "any" ? "any" : Number(val))}>
                                    <SelectTrigger className="md:w-[180px] md:text-lg flex items-center justify-center w-full">
                                            <SelectValue placeholder="Any Price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value="0">Any Price</SelectItem>
                                            <SelectItem value="1000">1000$</SelectItem>
                                            <SelectItem value="2000">2000$</SelectItem>
                                            <SelectItem value="3000">3000$</SelectItem>
                                            <SelectItem value="4000">4000$</SelectItem>
                                    </SelectContent>    
                            </Select>
                            <a href={"#search"} className="scroll-smooth">
                                <Button className="bg-blue-500 w-full md:w-auto  text-white hover:bg-blue-600 ">
                                    <Search />
                                    Search
                                </Button>
                            </a>
                    </div>
                    <div className="z-20 text-white text-center space-y-4">
                            <h1>
                                    Or Browse Featured Model
                            </h1>
                            <div className="flex gap-4 ">
                                    <Button className="bg-[#f48912] text-white hover:bg-[#d9780f] rounded-full">
                                            SUV
                                    </Button>
                                    <Button className="bg-[#f48912] text-white hover:bg-[#d9780f] rounded-full">
                                            Sedan
                                    </Button>
                                    <Button className="bg-[#f48912] text-white hover:bg-[#d9780f] rounded-full">
                                            Hybrid
                                    </Button>
                                    <Button className="bg-[#f48912] text-white hover:bg-[#d9780f] rounded-full">
                                            Coupe
                                    </Button>
                            </div>
                    </div>
            </div>
    )
    }
