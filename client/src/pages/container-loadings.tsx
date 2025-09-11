import type { LogisticTypes } from "@/types/types";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Menus } from "@/components/shared/menus";

export const ContainerLoadings = () => {
  const { data, isLoading } = useSWR("/logistic", fetcher);
  const logistics = (data as LogisticTypes[]) || [];

  if (isLoading) {
    return (
      <div className="bg-[#e7e7e7] min-h-screen pt-20">
        <Menus/>
        <Navbar />
        <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold">Container loadings</h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-56">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#e7e7e7] min-h-screen pt-20">
      <Navbar />
      <div className="py-8 px-[5%]" id="all">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-bold">Container loadings</h1>
        </div>

        {logistics.length === 0 ? (
          <div
            className="pt-4 text-center text-muted-foreground"
        
          >
            No container loading found
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {logistics.map(({ _id, image }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt="logistic"
                  className="w-full h-56 object-cover object-center rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
