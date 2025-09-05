import { ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Menus = () => {
    const [showChevron, setShowChevron] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowChevron(window.scrollY > window.innerHeight);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="fixed bottom-20 right-10 z-50 flex flex-col gap-2">
            <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAadJPgnYNVo9GXHZ2qm3Eb9SgAMuzMYmUsGJWc_mNTVj9xYe7pXGoVn87W7Wag_aem_huhiPqYgunrY5PTzgGYFaA"} target="_blank" className="bg-green-500 rounded-full w-14 h-14 ">
                <img src="/whatsapp.png" alt="" className="w-full h-full object-center p-4" />
            </Link>
            <Link to={"https://t.me/rtmotors_trade"} target="_blank" className="bg-blue-500 rounded-full w-14 h-14 ">
                <img src="/telegram.png" alt="" className="w-full h-full object-center p-4" />
            </Link>
            {showChevron && (
                <button
                    onClick={scrollToTop}
                    className="border relative border-primary bg-white flex-col  cursor-pointer rounded-full  w-14 h-14 flex items-center p-2"
                >
                    <ChevronUp size={20}  />
                    <span className="absolute bottom-3 text-sm">TOP</span>
                </button>
            )}
        </div>
    );
};