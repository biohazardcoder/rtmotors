    import { HashLink } from "react-router-hash-link";
import { Button } from "../ui/button"
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select"
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
        console.log(brand);
        
    return (
            <div 
            className="w-full h-screen relative bg-cover bg-center flex flex-col items-center justify-center space-y-4">
                <img src="/main/v1.png" className="absolute  object-cover object-top h-[100%] w-full top-0 left-0"/>
                    {/* <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl">RT MOTORS</h1>
                    <h1 className="text-white font-bold text-xl md:text-3xl lg:text-4xl">FROM KOREA TO THE WORLD</h1> */}
                    <div className="absolute  pt-6 -bottom-20 z-50 bg-white w-[80%]">
                         <div className="flex items-center  px-6 pb-8  justify-between">
                                <h1 className="text-2xl font-bold">SEARCH PARTS</h1>
                           <HashLink to={"#search"} className="scroll-smooth"> 
                                <Button className="bg-[#eeb425] hover:bg-[#eeb425]/80 text-white w-full">
                                Show
                                </Button>
                               </HashLink>
                         </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 justify-between pb-6  gap-4 items-center">
                                <Select value={brand} onValueChange={setBrand}>
                                <SelectTrigger className="md:text-lg md:w-[400px] flex items-center justify-center w-full">
                                <SelectValue placeholder="Brand" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="all">Any Brand</SelectItem>
                                <SelectItem value="bmw">BMW</SelectItem>
                                <SelectItem value="audi">Audi</SelectItem>
                                <SelectItem value="mercedes">Mercedes</SelectItem>
                                </SelectContent>
                                </Select>


                                <Select value={year} onValueChange={setYear}>
                                <SelectTrigger className="md:text-lg md:w-[400px] md:ml-40 flex items-center justify-center w-full">
                                <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="any">Any Years</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                </SelectContent>
                                </Select>

                                <Select value={price === "any" ? "any" : String(price)} 
                                onValueChange={val => setPrice(val === "any" ? "any" : val)}> 
                                <SelectTrigger className="md:text-lg md:w-[400px] md:ml-80 flex items-center justify-center w-full">
                                        <SelectValue placeholder="Any Price" /> 
                                </SelectTrigger> 
                                <SelectContent> 
                                        <SelectItem value="any">Any Price</SelectItem> 
                                        <SelectItem value="25000-50000">25,000$ - 50,000$</SelectItem> 
                                        <SelectItem value="50000-75000">50,000$ - 75,000$</SelectItem> 
                                        <SelectItem value="75000-100000">75,000$ - 100,000$</SelectItem> 
                                        <SelectItem value="100000-1000000">100,000$ - 1,000,000$</SelectItem> 
                                        <SelectItem value="1000000-7777777">1,000,000$ - More</SelectItem>
                                </SelectContent> 
                                </Select>
                                 </div>


                                <div className="flex border overflow-hidden">
                                         <Button
                                        variant="ghost"
                                        className={`flex-1 h-12 rounded-none  rounded-l-none  cursor-pointer ${
                                        type === "all" && "bg-[#eeb425] hover:bg-[#eeb425]  hover:text-white text-white font-semibold"
                                        }`}
                                        onClick={() => setType("all")}
                                        >
                                        All
                                        </Button>
                                        <Button
                                        variant="ghost"
                                        className={`flex-1  h-12 rounded-none rounded-l-none cursor-pointer ${
                                        type === "new" && "bg-[#eeb425] hover:bg-[#eeb425] hover:text-white text-white font-semibold"
                                        }`}
                                        onClick={() => setType(type === "new" ? "all" :"new" )}
                                        >
                                        New
                                        </Button>
                                        <Button
                                        variant="ghost"
                                        className={`flex-1 h-12 rounded-none  rounded-l-none ${
                                        type === "used" && "bg-[#eeb425] hover:bg-[#eeb425]  hover:text-white text-white font-semibold"
                                        }`}
                                        onClick={() => setType(type === "used" ? "all" :"used")}
                                        >
                                        Used
                                        </Button>
                                </div>
                                
                        </div>
            </div>
        )
}
