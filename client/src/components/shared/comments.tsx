import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { Star } from "lucide-react";

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

  return (
    <div className="bg-[#171f3a] text-white">
      <div className="py-8 px-[5%]" data-aos="fade-up">
        {comments.length === 0 ? (
          <div className="pt-4 text-center text-muted-foreground">
            No comments found
          </div>
        ) : (
          <Carousel >
        <h1 className="text-lg md:text-3xl font-bold mb-4">What our customers say</h1>
                <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600 top-[14px]  md:top-5 right-10 rounded-md  left-[100%-20px]" />
              <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600 top-[14px] md:top-5 right-0 rounded-md left-[100%-30px]" />
            <CarouselContent>
              {comments.map((comment) => (
                <CarouselItem
                  key={comment._id}
                  className="md:basis-1/3 lg:basis-1/4"
                  data-aos="fade-up"
                >
                  <div className=" bg-white text-primary h-auto py-4 rounded-md shadow px-4">
                    <div className="flex gap-4 flex-col">
                      <div>
                        <div className="flex items-center justify-between">
                        <p className="font-semibold">{comment.name}</p>
                           <div className="flex items-center mt-1 gap-2">
                      {[...Array(5)].map((_, i) => {
                        const percent =
                          5 >= i + 1
                            ? 100
                            : 5 > i
                            ? (5 - i) * 100
                            : 0;
                        return (
                          <span key={i} className="relative w-4 h-4">
                            <Star className="text-[#BFBFBF] w-4 h-4" fill="currentColor" />
                            {percent > 0 && (
                              <span
                                className="absolute top-0 left-0 h-full overflow-hidden"
                                style={{ width: `${percent}%` }}
                              >
                                <Star className="text-[#f48912] w-4 h-4" fill="currentColor" />
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                        </div>
                        <p className="text-lg mt-2 flex-wrap">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                   
                  </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
};
