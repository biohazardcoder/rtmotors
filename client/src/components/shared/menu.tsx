import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Separator } from "../ui/separator"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { CarFront,  FileText,  Home, LogOut, MenuIcon,  Newspaper, User  } from "lucide-react"

export const Menu = () => {
  const {user, isLoaded,isSignedIn} = useUser()
  
  return (
  <Popover>
      <PopoverTrigger asChild>
        <Button
        variant={"secondary"}
        className="md:hidden flex items-center bg-blue-500 hover:bg-blue-600 text-white "
      >
         <MenuIcon size={28} />
      </Button>
      </PopoverTrigger>
      <PopoverContent >
      {
        isLoaded && isSignedIn  && (
           <div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt="User Avatar" />
            <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
          </Avatar>
         <div>
           <h1 className="font-semibold">{user?.firstName} {user?.lastName}</h1>
          <p className="text-sm text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</p>
         </div>
        </div>
        <Separator className="my-2"/>
      </div>
        )
      }
      <div className="space-y-1">
        <Link to={"/"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <Home/>
          Home
          </div>
        </Button>
        </Link>
        <Link to={"/cars"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <CarFront/>
          Cars
          </div>
        </Button>
        </Link>
        {
          isLoaded && isSignedIn ? (
              <div>
            <Link to={"/dashboard"}>
            <Button variant="ghost" className="w-full block">
              <div className="flex items-center gap-2">
                <User/>
                Dashboard
              </div>
          </Button>
          </Link>
          </div>
          ) : (
            <Link to={"/sign-in"}>
              <Button variant="ghost" className="w-full block">
                <div className="flex items-center gap-2">
                  <User/>
                  Sign In
                </div>
              </Button>
            </Link>
          )
        }
        <Separator className="my-2"/>
        <Link to={"/about"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <FileText/>
          About
          </div>
        </Button>
        </Link>
        <Link to={"/blog"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <Newspaper/>
          Blog
          </div>
        </Button>
        </Link>
        <Separator className="my-2"/>
        <Link to={"https://t.me/RTMotors"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png" alt="WhatsApp" className="w-4 h-5 object-contain"/>
          Telegram
          </div>
        </Button>
        </Link>
        <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?fbclid=PAZXh0bgNhZW0CMTEAAac3f2TQT2NU3SmYEoJ2A7tCmZQmDK620yabGiU9J0KRQfXYevmMiR7avEuoNA_aem_SlM0LQvY9eK1891aSFwn9w"}>
          <Button variant={"ghost"} className="w-auto h-auto rounded-full">
          <div className="flex items-center gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904" alt="WhatsApp" className="w-4 h-6 object-cover"/>
          Whatsapp
          </div>
        </Button>
        </Link>
         <Link to={"https://www.instagram.com/rtmotors_trade"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <img src="https://www.citypng.com/public/uploads/preview/tiktok-circle-round-logo-brand-video-tik-tok-7017516947932520ecgdidi6e.png?v=2025072701" alt="Instagram" className="w-4 rounded-full h-4 object-cover"/>
          Tik Tok
          </div>
        </Button>
        </Link>
         <Link to={"https://www.instagram.com/rtmotors_trade"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <img src="https://img.freepik.com/premium-vector/round-youtube-logo-isolated-white-background_469489-983.jpg?semt=ais_hybrid&w=740&q=80" alt="Instagram" className="w-4 rounded-full h-4 object-contain"/>
          YouTube
          </div>
        </Button>
        </Link>
        <Link to={"https://www.instagram.com/rtmotors_trade"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <img src="https://i.pinimg.com/736x/24/37/73/2437730f7e3a5705e205e67fa2cd1020.jpg" alt="Instagram" className="w-4 rounded-full h-4 object-cover"/>
          Instagram
          </div>
        </Button>
        </Link>
        <Separator className="my-2"/>
        <SignOutButton>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <LogOut/>
          Logout
          </div>
        </Button>
        </SignOutButton>
      </div>
      </PopoverContent>
    </Popover>
  )
}
