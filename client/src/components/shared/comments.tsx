import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  name: string;
  message: string;
}

export const Comments = () => {
  const { data, isLoading } = useSWR("/customer", fetcher);

  if (isLoading) {
    return (
      <div>
        <div className="py-8 px-[5%]" data-aos="fade-up">
          <h1 className="text-lg md:text-3xl font-bold text-white">
            What our customers say
          </h1>
          <Carousel className="mt-4">
            <CarouselContent>
              {[...Array(5)].map((_, i) => (
                <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4">
                  <div className="bg-white py-4 rounded-md shadow px-4">
                    <div className="flex gap-4 flex-col">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }

  const comments = data as Comment[];

  const checkFlagUrl = (url: string, timeout = 3000): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => {
        img.src = ""; 
        resolve(false);
      }, timeout);

      img.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timer);
        resolve(false);
      };
      img.src = url;
    });
  };

  const FlagImage = ({ url }: { url: string }) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      let mounted = true;
      checkFlagUrl(url).then((ok) => mounted && setIsValid(ok));
      return () => {
        mounted = false;
      };
    }, [url]);

    if (!isValid) return null;
    return <img src={url} alt="flag" className="shadow object-cover w-8 h-[22px] object-center" />;
  };

  return (
    <div className="bg-[#171f3a] text-white">
      <div className="py-8 px-[5%]" data-aos="fade-up">
        {comments?.length === 0 ? (
          <div className="pt-4 text-center text-muted-foreground">
            No comments found
          </div>
        ) : (
          <Carousel>
            <h1 className="text-lg md:text-3xl font-bold mb-4">What our customers say</h1>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[14px] md:top-5 right-10 rounded-md left-[100%-20px]" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[14px] md:top-5 right-0 rounded-md left-[100%-30px]" />
            <CarouselContent>
              {comments?.map((comment) => {
                const [displayName, country] = comment.name.split("#");
                const flagUrl = country
                  ? `https://flagsapi.com/${country.toUpperCase()}/flat/48.png`
                  : null;

                return (
                  <CarouselItem
                    key={comment._id}
                    className="md:basis-1/3 lg:basis-1/4 flex"
                    data-aos="fade-up"
                  >
                    <div className="bg-white text-primary h-full py-4 rounded-md shadow px-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {flagUrl && <FlagImage url={flagUrl} />}
                            <p className="font-semibold text-sm">{displayName}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < 5 ? "text-[#f38912]" : "text-[#BFBFBF]"}`}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-base mt-2 flex-wrap">{comment.message}</p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
};
