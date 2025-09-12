import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BriefcaseBusiness, Check, CreditCard, FileCheck, FileText, Mail, Search, Ship, Smartphone, } from "lucide-react";
import { Menus } from "@/components/shared/menus";
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
const team: Team[] = [
        {
            _id: "1",
            name: "Ahliddin Teshaboev",
            avatar: "/team/ceo.jpg",
            job: "CEO",
            number: "+8210-2989-8641",
            social:[
              {
                telegram:{
                  image:"/3d/telegram.webp",
                  url:"nimadur"
                },
                 instagram:{
                  image:"/3d/instagram.webp",
                  url:"nimadur"
                },
                 whatsapp:{
                  image:"/3d/whatsapp.png",
                  url:"nimadur"
                },
              }
            ]
        },
        {
            _id: "2",
            name: "Rakhmatilla Akhmedov",
            avatar: "/team/operation_m.jpg",
            job: "Operation Manager",
            number:"+8210-9687-9796",
            social:[
              {
                telegram:{
                  image:"/3d/telegram.webp",
                  url:"nimadur"
                },
                 instagram:{
                  image:"/3d/instagram.webp",
                  url:"nimadur"
                },
                 whatsapp:{
                  image:"/3d/whatsapp.png",
                  url:"nimadur"
                },
              }
            ]

        },
        {
            _id: "3",
            name: "Abdullaev Bekmurod",
            avatar: "/team/sales_m.jpg",
            job: "Sales Manager",
            number:"+8210-8465-8085",
            social:[
              {
                telegram:{
                  image:"/3d/telegram.webp",
                  url:"nimadur"
                },
                 instagram:{
                  image:"/3d/instagram.webp",
                  url:"nimadur"
                },
                 whatsapp:{
                  image:"/3d/whatsapp.png",
                  url:"nimadur"
                },
              }
            ]
        },
    ];
const howWeWork = [
  {
    icon: Search,
    title: "Step 1. Explore Vehicles",
    description:
      "Browse and discover cars through RT Motors – from reliable dealers, verified platforms, and official auto auctions.",
  },
  {
    icon: FileText,
    title: "Step 2. Get an Estimate",
    description:
      "Request a detailed cost estimate in USD or EUR, covering both the vehicle price and shipping charges, prepared by our team.",
  },
  {
    icon: CreditCard,
    title: "Step 3. Confirm & Pay",
    description:
      "Finalize your order and complete the payment securely via international bank transfer for the provided invoice.",
  },
  {
    icon: Ship,
    title: "Step 4. Arrange Shipment",
    description:
      "We organize the quickest and most efficient shipping option for you, whether via container or Ro-Ro service.",
  },
  {
    icon: FileCheck,
    title: "Step 5. Track & Receive Documents",
    description:
      "Monitor your shipment with the container number and receive all necessary import documents through express courier for customs clearance.",
  },
];

export const About = () => {

  return (
    <div className="w-full bg-[#e7e7e7] pt-20">
      <Menus/>
      <Navbar />
      <div className="pb-8 ">
  <section className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-121px)]">
  <div
    className="relative bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/55f37d4ae4b06a2b4bf597a0/1675203467875-0HVGHRZSFU5O6M24OPDQ/IM5_0441.jpg')`,
    }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
  </div>

  <div className="flex flex-col justify-center items-center text-center px-8 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <img
      src="/logo.png"
      alt="Company Logo"
      className="w-48 h-48 drop-shadow-lg"
    />
    <h1 className="text-4xl font-extrabold mb-6  tracking-wide">
      RT Motors Company
    </h1>
    <p className="max-w-xl  font-semibold text-lg leading-relaxed text-gray-700">
      RT MOTORS specializes in delivering high-quality vehicles from South Korea
      to customers worldwide. With years of experience, we have established strong
      partnerships with Korea’s top manufacturers and maintain reliable connections
      with trusted and competitively priced dealers in the automotive sector.
    </p>
  </div>
</section>


         <section className="w-full">
             <div className="py-8 px-[5%]  flex flex-col items-center justify-center" >
            <h1 className="text-xl md:text-3xl font-bold text-center">Our Team</h1>
            <div className="flex flex-col md:flex-row gap-4 mt-8">
                 {team.map(team => (
                            <div key={team._id} className="bg-white  rounded-md shadow p-4">
                                <div className="flex  gap-4 flex-col">
                                    <img src={team.avatar} alt={team.name} className="w-full h-[400px] md:h-[300px] rounded-md object-center object-cover" />
                                    <div className="space-y-2">
                                        <p className="font-semibold">{team.name}</p>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <BriefcaseBusiness size={18}/> 
                                            {team.job}
                                        </p>
                                         <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Smartphone size={18}/> 
                                            {team.number}
                                        </p>
                                         <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Mail size={18}/> 
                                            email@gmail.com
                                        </p>
                                        <div className="flex items-center justify-between gap-2">
                                          {team.social.map((social, idx) => (
                                            <div key={idx} className="flex gap-2 items-center text-muted-foreground">
                                              <a href={social.telegram.url} target="_blank" rel="noopener noreferrer">
                                               <h1 className=" font-semibold text-xs">Telegram</h1>
                                              </a>
                                              <a href={social.whatsapp.url} target="_blank" rel="noopener noreferrer">
                                                <h1 className="font-semibold border-l-2 border-primary pl-2 text-xs">Whatsapp</h1>
                                              </a>
                                              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer">
                                                  <h1 className=" font-semibold border-l-2 border-primary pl-2 text-xs">Instagram</h1>
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))}
            </div>
        </div>
         </section>
     
       <section className="py-16 px-6">
  <h1 className="mt-4 text-3xl font-bold text-center text-gray-800">
    Our Services and Strengths Include:
  </h1>

  <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
    <div className="flex items-start gap-3 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
     <Check size={40} className="text-blue-500"/>
      <p className="text-gray-700 font-medium text-sm">
        Direct sourcing from top Korean manufacturers and verified auctions
      </p>
    </div>

    <div className="flex items-start gap-3 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
      <Check size={40} className="text-blue-500"/>
      <p className="text-gray-700 font-medium">
        Export of a wide range of vehicles: sedans, SUVs, EVs
      </p>
    </div>

    <div className="flex items-start gap-3 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
       <Check size={40} className="text-blue-500"/>
      <p className="text-gray-700 font-medium">
        Personalized vehicle sourcing based on your market demand
      </p>
    </div>

    <div className="flex items-start gap-3 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]">
       <Check size={40} className="text-blue-500"/>
      <p className="text-gray-700 font-medium">
        Full customs clearance and international logistics support
      </p>
    </div>

    <div className="flex items-start gap-3 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02] md:col-span-2 lg:col-span-1">
       <Check size={40} className="text-blue-500"/>
      <p className="text-gray-700 font-medium">
        Competitive pricing and long-term partner incentives
      </p>
    </div>
  </div>
</section>

      

   <section className="py-12 px-6 text-center">
      <h2 className="text-2xl font-bold mb-6">How We Work</h2>
      <div className="grid md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
        {howWeWork.map((step, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl "
          >
            <step.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h3 className="font-bold mb-2 text-xl">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>

      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Our Location</h2>
        <div className="max-w-5xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.7474014112335!2d69.27973771571658!3d41.311158979271846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjIiTiA2OcKwMTYnNTAuOSJF!5e0!3m2!1sen!2s!4v1678979876543"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="py-12" id="contact">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
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
            className="w-full bg-white"
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
