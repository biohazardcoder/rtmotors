import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { User,  Loader2,  } from "lucide-react"
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Menu } from "./menu";

export const Navbar = () => {

  const { user,isLoaded,isSignedIn } = useUser()

  const {pathname} = useLocation()
  const items = [
    {
      url: "/",
      label: "Home"
    },
    {
      url: "/cars",
      label: "Cars"
    },
    {
      url: "/about",
      label: "About"
    },
    {
      url: "/blog",
      label: "Blog"
    },
  ]

  return (
    <div className={cn("absolute top-0 left-0 w-full h-[10vh] bg-transparent flex items-center justify-between px-[5%] z-50", pathname === "/" ? "text-white" : "text-black")}>
      <Link to={"/"}>
       <img src="/logo.png" alt="RT Motors"className="w-20" />
       </Link>
      <div className="hidden md:flex items-center gap-4">
        <ul className="flex items-center gap-12">
          {items.map(item => (
            <li key={item.label}>
              <Link to={item.url} className="font-semibold">{item.label}</Link>
            </li>
          ))}
        {
          isLoaded && isSignedIn ? (
                         <Link to={"/dashboard"}>
                    {isLoaded ? (<div className="flex items-center gap-2 font-semibold">
                      <Button
                  disabled={!isLoaded}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white "
                >
                      <Avatar className="w-7 h-7">
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback>RT</AvatarFallback> 
                    </Avatar>
                      Dashboard
              </Button>
                    </div>) : <Loader2 className="animate-spin text-white" />}
              </Link>
          ) : (
             <Link to={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
                <Button
                  disabled={!isLoaded}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white "
                >
                    {isLoaded ? <User size={28} /> : <Loader2 className="animate-spin text-white" />}
                    {pathname === "/sign-in" ? "Sign Up" : "Sign In"}
              </Button>
              </Link>
          )
        }
        </ul>
      </div>
      <div className="md:flex items-center gap-2 hidden">
            <Link to={"https://t.me/rtmotors_trade"} target="_blank" className="bg-blue-500 rounded-full w-12 h-12 ">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png" alt="" className="w-full h-full object-center border-2 border-white rounded-full" />
            </Link>
         <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAadJPgnYNVo9GXHZ2qm3Eb9SgAMuzMYmUsGJWc_mNTVj9xYe7pXGoVn87W7Wag_aem_huhiPqYgunrY5PTzgGYFaA"} target="_blank" className="bg-green-500 rounded-full w-12 h-12 ">
                <img src="/whatsapp.png" alt="" className="w-full h-full object-center" />
            </Link>
             <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAadJPgnYNVo9GXHZ2qm3Eb9SgAMuzMYmUsGJWc_mNTVj9xYe7pXGoVn87W7Wag_aem_huhiPqYgunrY5PTzgGYFaA"} target="_blank" className="bg-green-500 rounded-full w-12 h-12 ">
                <img src="https://www.citypng.com/public/uploads/preview/tiktok-circle-round-logo-brand-video-tik-tok-7017516947932520ecgdidi6e.png?v=2025072701" alt="" className="w-full h-full object-center rounded-full" />
            </Link>
         <Link target="_blank" to={"https://www.instagram.com/rtmotors_trade"}>
            <img src="https://img.freepik.com/premium-vector/round-youtube-logo-isolated-white-background_469489-983.jpg?semt=ais_hybrid&w=740&q=80"
             alt="YouTube" className="w-12 h-12 rounded-full bg-white object-contain"/>
        </Link>
         <Link target="_blank" to={"https://www.instagram.com/rtmotors_trade"}>
            <img src="https://i.pinimg.com/736x/24/37/73/2437730f7e3a5705e205e67fa2cd1020.jpg" alt="Instagram" 
            className="w-12 h-12 rounded-full bg-white object-cover object-center border-2  border-white"/>
        </Link>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        {
          !isSignedIn && (
             <Link to={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
          <Button
          disabled={!isLoaded}
          className="md:hidden flex items-center bg-blue-500 hover:bg-blue-600 text-white "
          >
            {isLoaded ? <User size={28} /> : <Loader2 className="animate-spin text-white" />}
            {pathname === "/sign-in" ? "Sign Up" : "Sign In"}
        </Button>
          </Link>
        )}
        <Menu />
      </div>
    </div>
  )
}
