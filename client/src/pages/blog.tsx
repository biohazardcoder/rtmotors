import type { BlogTypes } from "@/types/types";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import VideoPlayer from "@/components/shared/video-player";
import { Skeleton } from "@/components/ui/skeleton";
import { Menus } from "@/components/shared/menus";
import { Header } from "@/components/shared/header";
import { useTranslation } from "react-i18next";

export const Blog = () => {
    const { data,isLoading} = useSWR("/blog", fetcher)
    const {t, i18n} = useTranslation();
  if (isLoading) {
    return (
      <div className="pt-24">
        <Navbar />
        <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold text-white">{t("blogs")}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-md space-y-4"
              >
                <Skeleton className="w-full h-52 rounded-md" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
        <Header/>
      </div>
    );
  }


  const blog = data as BlogTypes[] || []

  return (
    <div className="pt-24" >
        <Menus/>
        <Navbar />
      <div className="py-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold text-white">{t("blogs")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {
            blog.length === 0 ? (
              <p className="text-white">{t("no_blogs_found")}</p>
            ) : (
                blog.map(
            ({
              _id,
              title,
              text,
              image,
              video
            }) => (
              <div
                key={_id}
                className="bg-[#272f48] group border-white border shadow-white rounded-lg overflow-hidden shadow-none hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative o">
                { video ? (
                  <VideoPlayer videoUrl={video} />
                ):(
                  <img
                  src={image}
                  alt={title}
                  className="w-full group-hover:scale-105 transition-all duration-300 h-44 object-cover"
                />
                )}
                <div className="px-6 py-4">
                  <h6 className="text-lg text  font-semibold ">
                    {title}
                  </h6>
               <p className="text-secondary text-sm mb-3 whitespace-pre-line">
                  {(() => {
                    const lang = i18n.language;
                    const parts = text?.split("@") || []; 

                    const selected =
                      lang === "ru"
                        ? parts[1]?.trim() || parts[0]?.trim() || ""
                        : parts[0]?.trim() || "";

                    return selected
                      .split("•")
                      .map((item, i) =>
                        item.trim() ? (
                          <li key={i} className="list-disc ml-5 mb-1">
                            {item.trim()}
                          </li>
                        ) : null
                      );
                  })()}
                </p>
                </div>
                </div>
                
              </div>
            )
          ))}
        </div>
      </div>
      <Footer/>
      <Header/>   
    </div>
  );
};


