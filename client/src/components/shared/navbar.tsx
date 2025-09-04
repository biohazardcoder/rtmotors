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
    <div className={cn("absolute top-0 left-0 w-full h-[8vh] bg-transparent flex items-center justify-between px-[5%] z-50", pathname === "/" ? "text-white" : "text-black")}>
      <Link to={"/"}>
       <img src="/logo.png" alt="RT Motors"className="w-20" />
       </Link>
      <div className="hidden md:flex items-center gap-4">
        <ul className="flex items-center gap-8">
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
      <div className="md:flex items-center hidden">
            <Link to={"https://t.me/rtmotors_trade"} target="_blank" >
                <img src="/3d/telegram.webp" alt="" className="w-9 h-9 object-center rounded-md" />
            </Link>
         <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAadJPgnYNVo9GXHZ2qm3Eb9SgAMuzMYmUsGJWc_mNTVj9xYe7pXGoVn87W7Wag_aem_huhiPqYgunrY5PTzgGYFaA"} target="_blank" >
                <img src="/3d/whatsapp.png" alt="" className="w-12 h-12 object-center rounded-md" />
            </Link>
         <Link target="_blank" to={"https://www.instagram.com/rtmotors_trade"}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/YouTube_play_button_square_%282013-2017%29.svg/250px-YouTube_play_button_square_%282013-2017%29.svg.png"
             alt="YouTube" className="w-8 h-8 rounded-md bg-white object-contain mr-2"/>
        </Link>
         <Link target="_blank" to={"https://www.instagram.com/rtmotors_trade"}>
            <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-square2-512.png" alt="Instagram" 
            className="w-8 h-8 rounded-md object-cover object-center  mr-2"/>
        </Link>
             <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAadJPgnYNVo9GXHZ2qm3Eb9SgAMuzMYmUsGJWc_mNTVj9xYe7pXGoVn87W7Wag_aem_huhiPqYgunrY5PTzgGYFaA"} target="_blank" className="bg-white rounded-full w-8 h-8 ">
                <img src="https://thumbs.dreamstime.com/b/tiktok-social-media-app-icon-tiktok-social-media-app-icon-square-shape-vector-illustration-269930887.jpg" alt="" className="w-full h-full object-center rounded-md " />
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
