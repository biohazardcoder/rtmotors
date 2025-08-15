import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel";

export const Partners = () => {
const partners = [
    {
        img: "/audi.png",
        name: "Audi",
    },
    {
        img: "https://images.seeklogo.com/logo-png/24/2/bmw-logo-png_seeklogo-240426.png",
        name: "BMW",
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Ford-Motor-Company-Logo.png/1200px-Ford-Motor-Company-Logo.png",
        name: "Ford",
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
        name: "Mercedes Benz",
    },
    {
        img: "https://img.icons8.com/androidL/512/FD7E14/mclaren.png",
        name: "McLaren",
    },
];

return (
    <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]">
            <h1 className="text-xl md:text-3xl font-bold">Our Partners</h1>
            <div>
                <div className="block sm:hidden mt-8">
                    <Carousel>
                        <CarouselContent>
                            {partners.map((brand) => (
                                <CarouselItem key={brand.name} className="basis-1/2">
                                    <div className="flex flex-col bg-white font-bold items-center shadow-md p-4 rounded-md">
                                        <img
                                            src={brand.img}
                                            alt={brand.name}
                                            className="w-24 h-24 object-contain"
                                        />
                                        <span className="mt-2">{brand.name}</span>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-400"/>
                        <CarouselNext className="bg-blue-500 text-white hover:bg-blue-400"/>
                    </Carousel>
                </div>
                <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 gap-10 mt-8 items-center lg:grid-cols-5">
                    {partners.map((brand) => (
                        <div
                            key={brand.name}
                            className="flex flex-col bg-white font-bold items-center shadow-md p-4 rounded-md"
                        >
                            <img
                                src={brand.img}
                                alt={brand.name}
                                className="w-24 h-24 object-contain"
                            />
                            <span className="mt-2">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
};
