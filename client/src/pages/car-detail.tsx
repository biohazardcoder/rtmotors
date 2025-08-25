

   import type { VehicleTypes } from "@/types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Banknote, CalendarDays,Fuel, Gauge, GitFork,  History,  Layers,  Loader2,  Share, Star, Trash2} from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Fetch } from "@/middlewares/Fetch";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Pagination, PaginationContent,  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CarDetailSkeleton } from "@/components/skeleton/car-detail";
import { Input } from "@/components/ui/input";


export const CarDetail = () => {
    const { user } = useUser();
    const { id } = useParams();
    const [commentText, setCommentText] = useState("");
    const [commentRating, setCommentRating] = useState(0);
    const { data,error,isLoading,mutate} = useSWR(`/car/${id}`, fetcher)
    const Cars = useSWR(`/car`, fetcher)
    const [contact,setContact] = useState("");
    const [menu,setMenu] = useState(false);
    const[loading,setLoading] = useState(false);
  const [commentPage, setCommentPage] = useState(1);

    if (error) {
        return   <div className="bg-[#e7e7e7]">
            <Navbar />
            <div className="w-full h-[100vh] flex flex-col gap-2 items-center justify-center text-2xl">
                <div className="flex flex-col items-center gap-2">
                     Error loading car details
                </div>
                <Link to={"/"}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Go Back
                    </Button>
                </Link>
            </div>
        </div>
    }

    if (isLoading) {
        return <CarDetailSkeleton />;
    }

    
    const handleCopy = () => {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard");
    }
    
    
    
    const handleAddComment = async () => {
      if (!user) {
        toast.error("You must be logged in to comment");
    return;
  }
  if (!commentText) {
    toast.error("You must enter a comment");
    return;
  }
  if (!commentRating) {
    toast.error("You must select a rating");
    return;
  }
  try {
    await Fetch.post(`/car/comment`, {
      id: _id,
      userId: user.id,
      message: commentText,
      rating: commentRating || 5,
    });
    toast.success("Comment added successfully");
    setCommentText("");
    setCommentRating(0);
    mutate();
  } catch (error) {
    toast.error("Error adding comment");
    console.error(error);
  }
};


const handleDeleteComment = async (commentId: string) => {
  if (!user) {
    toast.error("You must be logged in to delete a comment");
    return;
  }
  try {
    await Fetch.delete(`/car/${_id}/comment/${commentId}`);
    toast.success("Comment deleted successfully");
    mutate();
  } catch (error) {
    toast.error("Error deleting comment");
    console.error(error);
  }
}

const car = data as VehicleTypes || {}
const { _id,brand,type, name, description,comments, images, year, miles, fuelType, transmission, stock, status, oldPrice, currentPrice } = car;
const sameBrand = Cars.data as VehicleTypes[] || [];
const filteredCars = sameBrand.filter(car => car.brand === brand);
  const COMMENTS_PER_PAGE = 2;
    const paginatedComments = Array.isArray(comments)
    ? comments.slice((commentPage - 1) * COMMENTS_PER_PAGE, commentPage * COMMENTS_PER_PAGE)
    : [];
  const totalPages = Array.isArray(comments)
    ? Math.ceil(comments.length / COMMENTS_PER_PAGE)
    : 1;

  
    const handleBuyCar = async () => {
      if (!user) {
        toast.error("You must be logged in to buy a car");
        return;
      }
      if (!contact) {
        toast.error("You must enter your phone number");
        return;
      }
      try {
        setLoading(true);
        await Fetch.post(`/order`, {
          userId: user.id,
          car: _id,
          trackingNumber: currentPrice,
          contact,
        });
        mutate()
        toast.success("Car purchased successfully");
        setContact("");
        setMenu(false);
      } catch (error) {
        toast.error("Error purchasing car");
      }finally {
        setLoading(false);
      }
    }

return (
  <div className="bg-[#e7e7e7] pt-14" id="search">
        <Navbar />
      <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold">{name}</h1>
          <div className="flex items-center justify-between">
            <h1 className="text-sm md:text-lg">{description}</h1>
            <div className="flex items-center gap-2">
                <Button className="block md:hidden bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleCopy}
                >
                    <Share/> 
                </Button>
                <Button className="hidden md:flex bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleCopy}
                >
                    <Share/> Share
                </Button>
            </div>
          </div>
          
        <div className=" mt-8">
          {
            !car ? (
              <p>No car found</p>
            ) : (
             <div
                key={_id}
                className=" overflow-hidden  transition-shadow duration-300 grid grid-cols-1 md:grid-cols-3  md:gap-10"
              >
                <div className="relative col-span-1">
                  <Carousel>
                    <CarouselContent>
                      {images.map((image, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-40 md:h-64 object-cover rounded-md md:rounded-lg"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600"/>
                    <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600"/>
                  </Carousel>

                    {stock === 0 ? (<span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                    Sold out
                  </span>) : status && status?.text?.length > 0 ? (
                    <span
                      className="absolute top-3 left-3 text-black text-sm font-semibold px-3 py-1 rounded-full shadow"
                      style={{ color: `#${status?.color}`, backgroundColor: `#${status?.bg}` }}
                    >
                      {status?.text}
                    </span>
                  ) : ""}
                </div>

                <div className="p-6 bg-white col-span-2 space-y-2 rounded-md md:rounded-lg mt-4 md:mt-0">
                    <h1 className="text-2xl font-semibold">Car Details</h1>
                    <Separator/>
                    <div className="space-y-4 grid grid-cols-2 md:grid-cols-4 text-xs md:text-sm mt-4">
                         <div className="flex items-center gap-2 font-semibold capitalize text-muted-foreground">
                          <Layers size={20}/> Brand
                        </div>
                      <div className="font-semibold uppercase">
                      {brand}
                    </div>
                     <div className="flex items-center gap-2 font-semibold capitalize text-muted-foreground">
                          <History size={20}/> Condition
                        </div>
                      <div className="font-semibold capitalize">
                      {type}
                    </div>
                        <div className="flex items-center gap-2 font-semibold capitalize text-muted-foreground">
                          <Gauge size={20}/> Miles
                        </div>
                      <div className="font-semibold">
                      {miles.toLocaleString()} km
                    </div>
                    <div className="flex items-center gap-2 font-semibold capitalize text-muted-foreground">
                      <Fuel size={20}/> Fuel Type
                    </div>
                    <div className="font-semibold capitalize">
                      {fuelType}
                    </div>
                    <div className="flex items-center gap-2 font-semibold capitalize text-muted-foreground">
                      <GitFork size={20}/> Transmission
                    </div>
                    <div className="font-semibold capitalize">
                      {transmission}
                    </div>
                    <div className="flex items-center gap-2 font-semibold capitalize text-muted-foreground">
                      <CalendarDays size={20}/> Year
                    </div>
                    <div className="font-semibold capitalize">
                      {year}
                    </div>
                  </div>
                  <Separator/>
                  <div className="flex flex-col gap-2 md:flex-row justify-between">
                    <div className="flex items-center gap-2">
                        <p className="flex items-center gap-2 font-semibold capitalize text-muted-foreground">
                      <Banknote/> Price <span className="text-black">${currentPrice.toLocaleString()}</span>
                    </p>
                     {
                        oldPrice > 0 && (
                            <p className="text-gray-500 line-through">
                                ${oldPrice.toLocaleString()}
                            </p>
                        )
                    }
                    </div>
                    <Button 
                    onClick={() => setMenu(true)} 
                    disabled={stock === 0}
                    className={`${stock === 0 ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                        {
                          stock === 0 ? "Sold out" : "Buy Now"
                        }
                    </Button>
                  </div>
                </div>
              </div>
          )}
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
  <div>
    <h1 className="font-bold text-xl mt-10">Comments</h1>
    {(() => {
      const ratingCounts = [0, 0, 0, 0, 0];
      let totalRating = 0;
      let totalCount = 0;
      if (Array.isArray(comments)) {
        comments.forEach((c: any) => {
          const r = Math.round(Number(c.rating) || 0);
          if (r >= 1 && r <= 5) {
            ratingCounts[r - 1]++;
            totalRating += r;
            totalCount++;
          }
        });
      }
      const avgRating = totalCount ? (totalRating / totalCount) : 0;

      return (
        <div className="space-y-1">
          <div className="flex items-center mt-1 gap-2">
            {[...Array(5)].map((_, i) => {
              const percent =
                avgRating >= i + 1
                  ? 100
                  : avgRating > i
                  ? (avgRating - i) * 100
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
            <span className="font-bold">
              {avgRating.toFixed(1)} from 5 ({totalCount})
            </span>
          </div>
        </div>
      );
    })()}
 <div className="mt-8 space-y-8 md:col-span-2 pr-10">
            {paginatedComments.map(({ user: commentUser, message, createdAt, _id, rating }) => (
             <div key={_id} className="mb-6">
        <div className="flex items-center gap-2">
          <span>
            {commentUser?.avatar && (
              <img
                src={commentUser.avatar}
                alt={commentUser.name || "User"}
                className="inline-block w-6 h-6 rounded-full mr-2"
              />
            )}
            <span className="font-semibold">{commentUser?.name || "Anonymous"}</span>
          </span>
          <span className="ml-2 text-xs text-gray-500">{createdAt?.slice(0, 10)}</span>
        </div>
        <div className="flex items-center mt-1 gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={i < (rating || 0) ? "text-blue-500 w-4 h-4" : "text-[#BFBFBF] w-4 h-4"}
              fill="currentColor"
            />
          ))}
          <span>{rating || 0} from 5</span>
        {user && user.id === commentUser.userId && (
          <Button
            className="mt-2 bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleDeleteComment(_id)}
          >
            <Trash2/>
          </Button>
        )}
        </div>
        <p className="text-sm mt-2">{message}</p>
      </div>
            ))}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setCommentPage(p => Math.max(1, p - 1));
                    }}
                    className="bg-blue-500 text-white hover:bg-blue-600  hover:text-white"
                    aria-disabled={commentPage === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={commentPage === idx + 1}
                      onClick={e => {
                        e.preventDefault();
                        setCommentPage(idx + 1);
                      }}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                  className="bg-blue-500 text-white hover:bg-blue-600  hover:text-white"
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setCommentPage(p => Math.min(totalPages, p + 1));
                    }}
                    aria-disabled={commentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
  </div>
   <div className="md:mt-10">
      <div className="flex items-center gap-2  ">
        <h1 className="text-xl font-bold">Your Rating</h1>
        <div className="flex items-center mt-1 gap-2">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCommentRating(i + 1)}
              className="focus:outline-none"
            >
              <Star
                className={i < commentRating ? "text-blue-500 w-5 h-5" : "text-[#BFBFBF] w-5 h-5"}
                fill="currentColor"
              />
            </button>
          ))}
        </div>
      </div>
      <Textarea
        className="bg-white mt-2"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button
        className="text-white bg-blue-500 hover:bg-blue-600 mt-4 rounded-[4px]"
        onClick={handleAddComment}
      >
        Submit
      </Button>
    </div>
</div>
      </div>
      <div>
        <div className="bg-[#e7e7e7] min-h-[20vh]" id="search">
      <div className="py-8 px-[5%]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-bold">
            {brand && <span><span className="uppercase">{brand}</span> cars</span>}
          </h1>
        </div>       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {
            filteredCars.length === 0 ? (
              <p>No vehicles found</p>
            ) : (
                filteredCars.map(
            ({
              _id,
              currentPrice,
              fuelType,
              images,
              miles,
              name,
              transmission,
              description,
              oldPrice,
              year,
              stock,
              status
            }) => (
              <div
                key={_id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Carousel>
                    <CarouselContent>
                      {images.map((image, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-56 md:h-64 object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-blue-500 text-white hover:bg-blue-600"/>
                    <CarouselNext className="bg-blue-500 text-white hover:bg-blue-600"/>
                  </Carousel>

                    {stock === 0 ? (<span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                   Sold out
                  </span>) : status && status?.text?.length > 0 ? (
                    <span
                      className="absolute top-3 left-3 text-black text-sm font-semibold px-3 py-1 rounded-full shadow"
                      style={{ color: `#${status?.color}`, backgroundColor: `#${status?.bg}` }}
                    >
                      {status?.text}
                    </span>
                  ) : ""}
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">
                    {name} - {year}
                  </h2>
                  <p className="text-secondary-foreground text-sm mb-3">{description}</p>

                  <div className="flex justify-between text-muted-foreground text-sm border-t border-b py-4 mb-3">
                    <div className="flex flex-col items-center gap-1 font-semibold">
                      <span><Gauge/></span>
                      {miles.toLocaleString()} km
                    </div>
                    <div className="flex flex-col items-center gap-1 font-semibold capitalize">
                      <span><Fuel/></span>
                      {fuelType}
                    </div>
                    <div className="flex flex-col items-center gap-1 font-semibold capitalize">
                      <span><GitFork/></span>
                      {transmission}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                   <div>
                     {
                        oldPrice > 0 && (
                            <p className="text-sm text-gray-500 line-through">
                                ${oldPrice.toLocaleString()}
                            </p>
                        )
                    }
                    <p className="text-2xl font-bold text-gray-900">
                      ${currentPrice.toLocaleString()}
                    </p>
                   </div>
                    <Link
                      to={`/cars/${_id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
      </div>
      {
        menu && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src={images[0]} alt="" className="w-20 h-10 object-center object-cover" />
                  <div className="flex flex-col">
                    <span className="font-semibold">{name}</span>
                    <span className="font-semibold">${currentPrice.toLocaleString()}</span>
                  </div>
                </div>
                <Separator className="my-4 "/>
                <h2 className="font-semibold mb-2">Phone</h2>
                <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter your phone number" />
                <p className="text-xs text-center text-muted-foreground mt-2 ">We will contact you shortly</p>
                <div className="flex items-center justify-between gap-2">
                  <Button disabled={loading} onClick={() => setMenu(false)} className="mt-2" variant={"destructive"}>Cancel</Button>
                <Button onClick={handleBuyCar} disabled={loading} className="mt-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                  {loading ? (<Loader2 className="animate-spin" />) : "Buy"}
                </Button>
                </div>
            </div>
          </div>
        )
      }
      <Footer/>
    </div>
  );
};


