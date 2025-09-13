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
            year: string | "any";
            price: string | "any";
            setType: (type: string) => void;
            setYear: (year: string | "any") => void;
            setPrice: (price: string | "any") => void;
            setBrand: (brand: string) => void;
    }
    export const Main = ({type,year,price, brand, setType, setYear, setPrice, setBrand}:MainProps) => {

    return (
            <div 
            className="w-full h-[70vh] md:h-screen overflow-hidden relative bg-cover bg-center flex flex-col items-center justify-end pb-10 space-y-4">
                <img src="/main/v1.png" className="absolute w-full h-full object-cover top-0 left-0"/>
                    {/* <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl">RT MOTORS</h1>
                    <h1 className="text-white font-bold text-xl md:text-3xl lg:text-4xl">FROM KOREA TO THE WORLD</h1> */}
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
                    <div className="grid grid-cols-1 w-3/4 md:w-auto md:flex md:items-center rounded-lg md:rounded-full md:p-4  gap-2 md:gap-4 p-3 mt-4 z-20  bg-white">
                            <Select value={brand} onValueChange={setBrand} >
                                    <SelectTrigger className="md:w-[180px] md:text-lg  flex items-center justify-center w-full">
                                            <SelectValue placeholder="Any Makes" />
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value="all">Any Makes</SelectItem>
                                            <SelectItem value="audi">Audi</SelectItem>
                                            <SelectItem value="bmw">BMW</SelectItem>
                                            <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                                            <SelectItem value="bugatti">Bugatti</SelectItem>
                                            <SelectItem value="ferrari">Ferrari</SelectItem>
                                            <SelectItem value="lamborghini">Lamborghini</SelectItem>
                                            <SelectItem value="mclaren">McLaren</SelectItem>
                                            <SelectItem value="rolls-royce">Rolls-Royce</SelectItem>
                                    </SelectContent>    
                            </Select>
                            <Separator orientation="vertical" />
                            <Select value={year === "any" ? "any" : String(year)} onValueChange={val => setYear(val === "any" ? "any" : val)}>
                                    <SelectTrigger className="md:w-[180px] md:text-lg flex items-center justify-center w-full">
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
                                    <SelectTrigger className="md:w-[180px] md:text-lg flex items-center justify-center w-full">
                                            <SelectValue placeholder="Any Price" />
                                    </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="any">Any Price</SelectItem>
                                        <SelectItem value="25000-50000">25,000$ - 50,000$</SelectItem>
                                        <SelectItem value="50000-75000">50,000$ - 75,000$</SelectItem>
                                        <SelectItem value="75000-100000">75,000$ - 100,000$</SelectItem>
                                        <SelectItem value="100000-200000">100,000$ - 200,000$</SelectItem>
                                   </SelectContent>    
                            </Select>
                            <a href={"./#search"} className="scroll-smooth">
                                <Button className="bg-blue-500 w-full md:w-auto  text-white hover:bg-blue-600 ">
                                    <Search />
                                    Search
                                </Button>
                            </a>
                    </div>
            </div>
    )
    }
