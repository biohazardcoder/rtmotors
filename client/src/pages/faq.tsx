import Footer from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { Menus } from "@/components/shared/menus"
import { Navbar } from "@/components/shared/navbar"

interface FaqTypes{
  question:string,
  answer:string
} 

export const Faq = () => {

  const faqs:FaqTypes[] = [
    {
      question:"Which countries does RT MOTORS export vehicles to?",
      answer:"We export vehicles from South Korea to almost every country in the world. Our main destinations include Central Asia, the Middle East, Europe, and Africa."
    },
    {
      question: "How long does shipping take and which factors influence it?",
      answer:"Delivery time depends on the destination. For Asia and the Middle East, it usually takes 2–4 weeks, while shipments to Europe and Africa may take 4–8 weeks."
    },
    {
      question:"What documents will I receive after the vehicle is shipped?",
      answer:"We provide all necessary documents, including the sales contract, invoice, vehicle registration, Bill of Lading (BL), and customs clearance papers."
    },
    {
      question:"Can I check the condition of the vehicle before purchase?",
      answer:"Yes, our team inspects every selected vehicle and provides detailed photos and videos. This way, you can verify the real condition of the car before making your purchase."
    },
    {
      question:"Can RT MOTORS help me find a specific vehicle model?",
      answer:"Yes, if you are looking for a particular brand, model, or specification, our team will search and source it directly from trusted Korean markets and auctions."
    },
    {
      question:"Do you offer warranty on exported vehicles?",
      answer:"Since vehicles are sold as export units, official warranty is not provided. However, we guarantee that the vehicle’s condition matches the inspection report, photos, and videos we share with you."
    },
    {
      question:"What shipping options are available?",
      answer:"We provide two main shipping methods:Ro-Ro (Roll-on/Roll-off): cost-effective for multiple cars.Container shipping: secure and suitable for high-value or luxury vehicles."
    },
    {
      question:"Why should I choose RT MOTORS over other exporters?",
      answer:"We ensure transparency, professional inspections, reliable shipping, and full document support. Our goal is to make car importing safe, fast, and hassle-free for our clients worldwide."
    }
  ] 


  return (
    <div className="pt-24" id="all">
        <Navbar/>
        <Menus/>
        <div className="pb-8 px-[5%]">
          <h1 className="text-xl md:text-3xl font-bold text-white">Frequently Asked Questions (FAQ)</h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {
              faqs.map(({answer,question})=>(
               <div 
                key={answer} 
                className="space-y-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]"
              >
                <h1 className="font-semibold text-lg text-[#edb324]">
                  {question}
                </h1> 
                <div className="h-[1px] w-full bg-white" />

                <p className="text-sm text-white">
                  {answer}
                </p>
              </div>
              ))
            }
          </div>
        </div>
        <Footer/>
        <Header/>
    </div>
  )
}
