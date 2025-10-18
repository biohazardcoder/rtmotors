import * as React from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export const AutoCarousel = () => {
  const [api, setApi] = React.useState<any>(null)

  React.useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      setApi={setApi}
      className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden"
    >
      <CarouselContent>
        {["/about1.jpg", "/about2.jpg", "/about3.jpg", "/about4.jpg"].map((src, i) => (
          <CarouselItem key={i}>
            <img
              src={src}
              alt={`About ${i + 1}`}
              className={`w-full h-[82vh] object-cover ${
                i === 1 || i === 2 ? "object-center" : "object-bottom"
              }`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
