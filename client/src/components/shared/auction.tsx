import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel";

export const Auction = () => {
const auctions = [
    {
        img: "https://myshop-img2.carmanager.co.kr/myshop3/custom/seobuk/images/index/img_brand_heydealer.png",
    },
    {
        img: "https://myshop-img2.carmanager.co.kr/myshop3/custom/seobuk/images/index/img_brand_autohub.png",
    },
    {
        img: "https://myshop-img2.carmanager.co.kr/myshop3/custom/seobuk/images/index/img_brand_lotte.png",
    },
    {
        img: "https://myshop-img2.carmanager.co.kr/myshop3/custom/seobuk/images/index/img_brand_autobell.png",
    },
    {
        img: "https://myshop-img2.carmanager.co.kr/myshop3/custom/seobuk/images/index/img_brand_aucttion.png",
    },
];

return (
    <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]">
            <h1 className="text-xl md:text-3xl font-bold">Auction Holder</h1>
            <div>
                <div className="mt-8">
                    <Carousel>
                        <CarouselContent>
                            {auctions.map((brand,index) => (
                                <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
                                        <img
                                            src={brand.img}
                                            alt={index.toString()}
                                            className="w-full h-full object-contain object-center"
                                        />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600"/>
                        <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600"/>
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
);
};
