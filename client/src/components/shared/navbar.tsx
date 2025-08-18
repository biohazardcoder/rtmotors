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
      url: "/",
      label: "Cars"
    },
    {
      url: "/",
      label: "About"
    },
    {
      url: "/",
      label: "Blog"
    },
    {
      url: "/",
      label: "Contact"
    },
  ]

  return (
    <div className={cn("absolute top-0 left-0 w-full h-[10vh] bg-transparent flex items-center justify-between px-[5%] z-50", pathname === "/" ? "text-white" : "text-black")}>
      <Link to={"/"}>
       <img src="/logo.png" alt="RT Motors"className="w-20" />
       </Link>
      <div className="hidden md:flex items-center gap-4">
        <ul className="flex gap-8">
          {items.map(item => (
            <li key={item.label}>
              <Link to={item.url} className="font-semibold">{item.label}</Link>
            </li>
          ))}
        </ul>
        {
          isLoaded && isSignedIn ? (
                         <Link to={"/profile"}>
                    {isLoaded ? (<Avatar className="w-8 h-8">
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback>RT</AvatarFallback>
                    </Avatar>) : <Loader2 className="animate-spin text-white" />}
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
