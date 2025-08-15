import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Comment {
    _id: string;
    text: string;
    author: {
        name: string;
        avatar: string;
        job: string;
    }
}

export const Comments = () => {
    const comments: Comment[] = [
        {
            _id: "1",
            text: "Great car!",
            author: {
                name: "John Doe",
                avatar: "/comments/man.jpg",
                job: "Businessman"
            }
        },
        {
            _id: "2",
            text: "I love the design!",
            author: {
                name: "Jane Smith",
                avatar: "/comments/designer.jpg",
                job: "Designer"
            }
        },
        {
            _id: "3",
            text: "Amazing performance ",
            author: {
                name: "Alice Johnson",
                avatar: "/comments/teacher.jpg",
                job: "Teacher"
            }
        },
        {
            _id: "4",
            text: "Best purchase ever!",
            author: {
                name: "Bob Brown",
                avatar: "/comments/developer.jpg",
                job: "Developer"
            }
        }
    ];

    return (
        <div className="bg-[#e7e7e7]">
            <div className="py-8 px-[5%]">
            <h1 className="text-xl md:text-3xl font-bold">What our customers say</h1>
            <Carousel className="mt-8">
                <CarouselContent>
                    {comments.map(comment => (
                        <CarouselItem key={comment._id} className="md:basis-1/3 lg:basis-1/4">
                            <div className="bg-white py-10  rounded-md shadow px-10">
                                <div className="flex  gap-4 flex-col">
                                    <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-64 rounded-md mr-3 object-center object-cover" />
                                    <div>
                                        <p className="font-semibold">{comment.author.name}</p>
                                        <p className="text-sm text-muted-foreground">{comment.author.job}</p>
                                        <p className="text-lg mt-2 flex-wrap">{comment.text}</p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-400" />
                <CarouselNext className="bg-blue-500 text-white hover:bg-blue-400" />
            </Carousel>
        </div>
        </div>
    );
}
