import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import {  BadgeDollarSign,   Factory, Globe, SearchCheck, Truck, Wrench } from "lucide-react";
import { Menus } from "@/components/shared/menus";
import { Team } from "@/components/shared/team";
import { Hww } from "@/components/shared/hww";
import { Header } from "@/components/shared/header";
import { AutoCarousel } from "@/components/shared/carousels";
import { ContactForm } from "@/components/shared/contact";
import { useTranslation } from "react-i18next";
interface Team {
    _id: string;
    name: string;
    avatar: string;
    job: string;
    number:string,
    social : [
      {
        telegram:{
          image:string,
          url:string
        },
        whatsapp:{
          image:string,
          url:string
        },
        instagram:{
          image:string,
          url:string
        },
      }
    ]

}


export const About = () => {
  const {t} = useTranslation();
  return (
    <div className="w-full bg-[#171f3a] overflow-hidden pt-20">
      <Menus/>
      <Navbar />
      <div className="pb-8">
      <section className="grid grid-cols-1 md:grid-cols-2 p-8 bg-[#1e2550] h-[calc(100vh-75px)]">
      <div
        className="relative bg-cover bg-center rounded-xl  hidden md:block"
      >
        <AutoCarousel/>
        <div className="absolute inset-0 rounded-xl bg-black/20"></div>
      </div>
      <div className="flex flex-col justify-center items-center text-center px-8 py-12 bg-[#1e2550]">
          <img
            src="/head.png"
            alt="Company Logo"
            className="w-32 h-32 md:w-48 md:h-48 drop-shadow-lg "
          />
          <h5 className="text-xl  font-extrabold mb-6  tracking-wide text-white">
            {t("rt_motors_company")}
          </h5>
          <p className="max-w-xl text-white text-sm  font-semibold md:text-lg leading-relaxed ">
           {t("about_rt_motors")}
          </p>
        </div>
      </section>
      <section className="relative">
        <Team/>
      </section>
       <section className="py-16 px-6">
        <h1 className="mt-4 text-3xl font-bold text-center text-white">
          {t("our_services")}
        </h1>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
            <Factory size={60} className="text-[#edb324]" />
            <p className="text-white font-medium text-sm">
              {t("first_service")}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
            <Truck size={60} className="text-[#edb324]" />
            <p className="text-white font-medium">
              {t("second_service")}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
            <SearchCheck size={60} className="text-[#edb324]" />
            <p className="text-white font-medium">
              {t("third_service")}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
            <Globe size={60} className="text-[#edb324]" />
            <p className="text-white font-medium">
              {t("fourth_service")}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02] md:col-span-2 lg:col-span-1">
            <BadgeDollarSign size={60} className="text-[#edb324]" />
            <p className="text-white font-medium">
              {t("fifth_service")}
            </p>
          </div>

           <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02] md:col-span-2 lg:col-span-1">
            <Wrench size={60} className="text-[#edb324]" />
            <p className="text-white font-medium">
              {t("sixth_service")}
            </p>
          </div>
        </div>

      </section>
        <section>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">{t("how_we_work")}</h2>
            <Hww/>
          </section>
      <section className="py-12 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
        {t("our_achievements")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-[#edb324]">
        <div className="bg-[#272f48]  border-2 border-white  backdrop-blur-md rounded-2xl shadow-lg p-8  text-center hover:scale-105 transition-transform">
          <h3 className="text-2xl md:text-4xl font-extrabold  mb-2">
            15+
          </h3>
          <p className="text-white text-xl  font-medium">{t("countries")}</p>
        </div>

        <div className="bg-[#272f48] border-2 border-white backdrop-blur-md rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform">
          <h3 className="text-2xl md:text-4xl font-extrabold  mb-2">
            500+
          </h3>
          <p className="text-white text-xl  font-medium">{t("cars_sold")}</p>
        </div>

        <div className="bg-[#272f48] border-2 border-white backdrop-blur-md rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform">
          <h3 className="text-2xl md:text-4xl font-extrabold  mb-2">
            300+
          </h3>
          <p className="text-white text-xl  font-medium">{t("clients")}</p>
        </div>
      </div>
      </section>
      <section className="py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">{t("our_location")}</h2>
        <div className="max-w-5xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.766713158307!2d128.882603!3d35.2340604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568c76a7d324709%3A0x41a57d1ac576f253!2zNSBCdW5zZW9uZy1ybyAzMzViZW9uLWdpbCwgR2ltaGFlLCBHeWVvbmdzYW5nbmFtLWRvLCDQrtC20L3QsNGPINCa0L7RgNC10Y8!5e1!3m2!1sru!2s!4v1759761259817!5m2!1sru!2s"
            width="100%"
            height="400"
            style={{ border: 0,borderRadius:"20px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <section className="py-12 px-[5%]" id="contact">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">{t("contact")}</h2>
        <ContactForm/>
      </section>
      <section className="py-6 flex px-[5%] md:px-0 flex-col md:flex-row items-center gap-12 max-w-5xl m-auto">
        <iframe  height="290"  className="rounded-xl w-full" src="https://www.youtube.com/embed/EaIQ97_20zs?si=sWraZmvErSEGEOhy" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        <iframe height="290" className="rounded-xl w-full" src="https://www.youtube.com/embed/JpzNKYTW8fA?si=hwnUrQbZOhL3KsGQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </section>
     </div>
      <Footer/>
      <Header/>
    </div>
  );
};
