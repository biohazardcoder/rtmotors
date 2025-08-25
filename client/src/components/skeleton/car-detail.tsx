import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"

export const CarDetailSkeleton = () => {
  return (
    <div className="bg-[#e7e7e7] pt-14">
      <Navbar />
      <div className="py-8 px-[5%] space-y-6">
        {/* Title */}
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>

        {/* Main Car Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Image Carousel */}
          <Skeleton className="w-full h-56 md:h-64 rounded-lg col-span-1" />

          {/* Details */}
          <div className="p-6 bg-white col-span-2 rounded-lg space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-28" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10 space-y-6">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Cars */}
        <div className="mt-10 space-y-4">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm space-y-3"
              >
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
