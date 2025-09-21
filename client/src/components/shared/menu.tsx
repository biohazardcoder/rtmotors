import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Separator } from "../ui/separator"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { CarFront,  Link2,  FileText,  Home, LogOut, MenuIcon,  Newspaper, User, Headset  } from "lucide-react"
import { HashLink } from "react-router-hash-link"

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
                  Log in
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
         <HashLink to={"/about/#contact"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <Headset/>
          Contact
          </div>
        </Button>
        </HashLink>
        <Separator className="my-2"/>
        <Link to={"https://t.me/rtmotors_trade"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <Link2/>
          Telegram
          </div>
        </Button>
        </Link>
        <Link to={"https://chat.whatsapp.com/HSdW0bnRDdPFDV81GsgN85?mode=ems_copy_t"}>
          <Button variant={"ghost"} className="w-auto h-auto rounded-full">
          <div className="flex items-center gap-2">
          <Link2/>
          Whatsapp
          </div>
        </Button>
        </Link>
         <Link to={"https://www.youtube.com/@rtmotorstrade"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <Link2/>
          YouTube
          </div>
        </Button>
        </Link>
        <Link to={"https://www.instagram.com/rtmotors_trade?igsh=bjBuNWYzN2cwcG8%3D&utm_source=qr"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <Link2/>
          Instagram
          </div>
        </Button>
        </Link>
         <Link to={"https://www.tiktok.com/@rt.motors.trade?_t=ZS-8zkQ7huqwnC&_r=1"}>
        <Button variant="ghost" className="w-full block">
          <div className="flex items-center gap-2">
          <Link2/>
          Tik Tok
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
