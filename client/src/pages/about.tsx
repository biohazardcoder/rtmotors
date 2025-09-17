import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {  CheckCircle2    } from "lucide-react";
import { Menus } from "@/components/shared/menus";
import { Team } from "@/components/shared/team";
import { Hww } from "@/components/shared/hww";
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

  return (
    <div className="w-full bg-[#171f3a] overflow-hidden pt-20">
      <Menus/>
      <Navbar />
      <div className="pb-8">
  <section className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-75px)]">
  <div
    className="relative bg-cover bg-center hidden md:block"
    style={{
      backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/55f37d4ae4b06a2b4bf597a0/1675203467875-0HVGHRZSFU5O6M24OPDQ/IM5_0441.jpg')`,
    }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
  </div>

<div className="flex flex-col justify-center items-center text-center px-8 py-12 bg-[#1e2550]">
    <img
      src="/logo.png"
      alt="Company Logo"
      className="w-48 h-48 drop-shadow-lg"
    />
    <h5 className="text-2xl  font-extrabold mb-6  tracking-wide text-white">
      RT Motors Company
    </h5>
    <p className="max-w-xl text-white text-sm  font-semibold md:text-lg leading-relaxed ">
      RT MOTORS specializes in delivering high-quality vehicles from South Korea
      to customers worldwide. With years of experience, we have established strong
      partnerships with Korea’s top manufacturers and maintain reliable connections
      with trusted and competitively priced dealers in the automotive sector.
    </p>
  </div>
</section>

<section className="relative">
  <Team/>
</section>
     
       <section className="py-16 px-6">
  <h1 className="mt-4 text-3xl font-bold text-center text-white">
    Our Services and Strengths Include:
  </h1>

  <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
    <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
     <CheckCircle2  size={60} className="text-[#edb324]"/>
      <p className="text-white font-medium text-sm">
        Direct sourcing from top Korean manufacturers and verified auctions
      </p>
    </div>

    <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
      <CheckCircle2  size={60} className="text-[#edb324]"/>
      <p className="text-white font-medium">
        Export of a wide range of vehicles: sedans, SUVs, EVs
      </p>
    </div>

    <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
       <CheckCircle2  size={60} className="text-[#edb324]"/>
      <p className="text-white font-medium">
        Personalized vehicle sourcing based on your market demand
      </p>
    </div>

    <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
       <CheckCircle2  size={60} className="text-[#edb324]"/>
      <p className="text-white font-medium">
        Full customs clearance and international logistics support
      </p>
    </div>

    <div className="flex items-center gap-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02] md:col-span-2 lg:col-span-1">
       <CheckCircle2  size={60} className="text-[#edb324]"/>
      <p className="text-white font-medium">
        Competitive pricing and long-term partner incentives
      </p>
    </div>
  </div>
</section>

      

        <section>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">How We Work</h2>
            <Hww/>
          </section>

      <section className="py-12 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
        Our Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-[#edb324]">
        <div className="bg-[#272f48]  border-2 border-white  backdrop-blur-md rounded-2xl shadow-lg p-8  text-center hover:scale-105 transition-transform">
          <h3 className="text-2xl md:text-4xl font-extrabold  mb-2">
            1000+
          </h3>
          <p className="text-white text-xl md:text-2xl font-medium">Clients</p>
        </div>

        <div className="bg-[#272f48] border-2 border-white backdrop-blur-md rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform">
          <h3 className="text-2xl md:text-4xl font-extrabold  mb-2">
            1000+
          </h3>
          <p className="text-white text-xl md:text-2xl font-medium">Cars</p>
        </div>

        <div className="bg-[#272f48] border-2 border-white backdrop-blur-md rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform">
          <h3 className="text-2xl md:text-4xl font-extrabold  mb-2">
            1000+
          </h3>
          <p className="text-white text-xl md:text-2xl font-medium">Orders</p>
        </div>
      </div>
      </section>
      <section className="py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">Our Location</h2>
        <div className="max-w-5xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.7474014112335!2d69.27973771571658!3d41.311158979271846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjIiTiA2OcKwMTYnNTAuOSJF!5e0!3m2!1sen!2s!4v1678979876543"
            width="100%"
            height="400"
            style={{ border: 0,borderRadius:"20px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <section className="py-12 px-[5%]" id="contact">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">Contact Us</h2>
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Input
            type="text"
            placeholder="Name"
            className="w-full bg-white"
          />
          <Input
            type="email"
            placeholder="Email"
            className="w-full bg-white"
          />
            <Input
            type="text"
            placeholder="Phone"
            className="w-full bg-white"
          />
          </div>
          <Textarea
            placeholder="Message"
            className="w-full bg-white min-h-40"
            rows={5}
          ></Textarea>
          <Button
            className="bg-blue-600 text-whitehover:text-white w-full md:w-auto hover:bg-blue-700"
          >
            Send Message
          </Button>
        </div>
      </section>
     </div>
      <Footer/>
    </div>
  );
};
