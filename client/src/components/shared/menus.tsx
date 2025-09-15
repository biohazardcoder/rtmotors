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
        <div className="fixed bottom-20 right-5 z-50 flex flex-col items-center gap-1">
            <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?mode=ems_copy_t"} target="_blank">
                <img src="/3d/whatsapp.png" alt="" className="w-16 h-16 object-center" />
            </Link>
            <Link to={"https://t.me/rtmotors_trade"} target="_blank">
                <img src="/3d/telegram.webp" alt="" className="w-12 h-12 object-center mb-1" />
            </Link>
            {showChevron && (
               <button
                onClick={scrollToTop}>
                    <img src="/3d/top.png" alt="" className="w-14 h-14 object-center" />
                </button>
            )}
        </div>
    );
};