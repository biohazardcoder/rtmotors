import { Mail, PhoneCall } from "lucide-react"
import { Link } from "react-router-dom"

export const Header = () => {
  return (
  <div className="w-full h-10 flex items-center justify-between px-[5%] bg-[#1e2550] border-b text-muted-foreground">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] md:text-xs">
            <PhoneCall size={12} />
            +8210-8465-8085
        </div>
         <div className="flex items-center gap-2 text-[10px] md:text-xs border-l border-muted-foreground pl-4">
            <Mail size={12} />
            rtmotorssales@gmail.com
        </div>
        </div>
           <div className="md:flex items-center hidden">
            <Link to={"https://t.me/rtmotors_trade"} target="_blank" >
                <img src="/3d/telegram.webp" alt="" className="w-6 h-6 object-center rounded-md" />
            </Link>
         <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAadJPgnYNVo9GXHZ2qm3Eb9SgAMuzMYmUsGJWc_mNTVj9xYe7pXGoVn87W7Wag_aem_huhiPqYgunrY5PTzgGYFaA"} target="_blank" >
                <img src="/3d/whatsapp.png" alt="" className="w-8 h-8 object-center rounded-md" />
            </Link>
         <Link target="_blank" to={"https://www.instagram.com/rtmotors_trade"}>
            <img src="/3d/youtube.webp"
             alt="YouTube" className="w-6 h-6 rounded-mdobject-contain mr-1"/>
        </Link>
         <Link target="_blank" to={"https://www.instagram.com/rtmotors_trade"}>
            <img src="/3d/instagram.webp" alt="Instagram" 
            className="w-6 h-6 rounded-md object-cover object-center "/>
        </Link>
             <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAadJPgnYNVo9GXHZ2qm3Eb9SgAMuzMYmUsGJWc_mNTVj9xYe7pXGoVn87W7Wag_aem_huhiPqYgunrY5PTzgGYFaA"} target="_blank" >
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/tiktok-3d-icon-png-download-8550499.png" alt="" className="w-[26px] h-7 object-center rounded-md " />
            </Link>
      </div>
    </div>
  )
}
