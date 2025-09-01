import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetcher } from "@/middlewares/Fetcher";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";

interface Comment {
  _id: string;
  name: string;
  image: string;
  job: string;
  message: string;
}

export const Comments = () => {
  const { data, isLoading } = useSWR("/customer", fetcher);

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7]">
        <div className="py-8 px-[5%]" data-aos="fade-up">
          <h1 className="text-xl md:text-3xl font-bold">
            What our customers say
          </h1>
          <Carousel className="mt-8">
            <CarouselContent>
              {[...Array(5)].map((_, i) => (
                <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4">
                  <div className="bg-white py-10 rounded-md shadow px-10">
                    <div className="flex gap-4 flex-col">
                      <Skeleton className="w-full h-56 rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
          </Carousel>
        </div>
      </div>
    );
  }

  const comments = data as Comment[];

  return (
    <div className="bg-[#e7e7e7]">
      <div className="py-8 px-[5%]" data-aos="fade-up">
        <h1 className="text-xl md:text-3xl font-bold">What our customers say</h1>
        {comments.length === 0 ? (
          <div className="pt-4 text-center text-muted-foreground">
            No comments found
          </div>
        ) : (
          <Carousel className="mt-8">
            <CarouselContent>
              {comments.map((comment) => (
                <CarouselItem
                  key={comment._id}
                  className="md:basis-1/3 lg:basis-1/4"
                  data-aos="fade-up"
                >
                  <div className=" bg-white h-auto py-4 rounded-md shadow px-4">
                    <div className="flex gap-4 flex-col">
                      <img
                        src={comment.image}
                        alt={comment.name}
                        className="w-full h-80 rounded-md mr-3 object-top object-cover"
                      />
                      <div>
                        <p className="font-semibold">{comment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {comment.job}
                        </p>
                        <p className="text-lg mt-2 flex-wrap">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600" />
            <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600" />
          </Carousel>
        )}
      </div>
    </div>
  );
};
