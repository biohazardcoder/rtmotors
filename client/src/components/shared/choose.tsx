import { Diamond, Handshake, User } from "lucide-react"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export const Choose = () => {
         useEffect(() => {
            AOS.init({ duration: 800});
          }, []);
        
  return (
    <div style={{ backgroundImage: "url('https://smart-motoring.com/wp-content/uploads/2022/03/Are-Modern-Cars-Over-Styled-2.jpg')", padding: "20px 5%" }} 
        className="relative bg-cover bg-left text-white flex flex-col items-center justify-center min-h-[70vh]"
    >
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="text-3xl lg:text-5xl font-bold" data-aos="fade-up">Why choose us?</h1>
        <div className="z-10 flex flex-col md:flex-row  gap-8 mt-8">
            <div className="flex flex-col items-center justify-center gap-2" data-aos="fade-up">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center bg-[#f48912] rounded-full w-14 h-14 mb-4">
                        <Diamond />
                    </div>
                    <h1 className="text-2xl font-semibold text-center">Reliable</h1>
                </div>
                <p className="bg-blue-500 p-4 rounded-md">We ensure  seamless experience, from sourcing luxury vehicles to delivering them safely on time. Trust us to deliver excellence every step of the way.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2" data-aos="fade-up">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center bg-[#f48912] rounded-full w-14 h-14 mb-4">
                        <User />
                    </div>
                    <h1 className="text-2xl font-semibold text-center">Customer-centric</h1>
                </div>
                <p className="bg-blue-500 p-4 rounded-md">Your satisfaction is our priority. We offer tailored solutions, multilingual support, and expert guidance to make owning your dream car effortless.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2" data-aos="fade-up">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center bg-[#f48912] rounded-full w-14 h-14 mb-4">
                        <Handshake />
                    </div>
                    <h1 className="text-2xl font-semibold text-center">Professional</h1>
                </div>
                <p className="bg-blue-500 p-4 rounded-md">Our skilled team upholds the highest standards, handling every detail with precision and care to ensure a smooth and premium experience.</p>
            </div>
        </div>
    </div>
  )
}
