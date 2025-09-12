import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { User,  Loader2,  } from "lucide-react"
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { Menu } from "./menu";
import { HashLink } from "react-router-hash-link";

export const Navbar = () => {

  const { isLoaded,isSignedIn } = useUser()

  const {pathname} = useLocation()
  const items = [
    {
      url: "/",
      label: "Homepage"
    },
    {
      url: "/blog",
      label: "Blog Posts"
    },
    {
      url: "/cars",
      label: "Find Cars"
    },
    {
      url: "/about",
      label: "About Us"
    },
    {
      url: "/about/#contact",
      label: "Contact Us"
    },
  ]

  return (
  <div className={cn("absolute bg-[#12171d]  left-0 w-full top-10 h-[12vh] flex items-center justify-between px-[5%] z-50", pathname === "/" ? "text-white" : "text-black")}>
      <Link to={"/"}>
       <img src="/white.png" alt="RT Motors" className="w-20" />
       </Link>
      <div className="hidden md:flex items-center gap-4">
        <ul className="flex items-center gap-8 text-white">
          {items.map(item => (
            <li key={item.label}>
              <HashLink to={item.url} className="font-semibold text-xl">{item.label}</HashLink>
            </li>
          ))}
        {
          isLoaded && isSignedIn ? (
                         <Link to={"/dashboard"}>
                    {isLoaded ? (<div className="flex items-center gap-2 font-semibold text-xl">
                    <li >
              <Link to={"/dashboard"} className="font-semibold">Dashboard</Link>
            </li>
                    </div>) : <Loader2 className="animate-spin text-white" />}
              </Link>
          ) : (
             <Link className="font-semibold text-xl flex items-center gap-2" to={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
                    {isLoaded ? pathname === "/sign-in" ? "Sign Up" : "Sign In" : <Loader2 className="animate-spin text-white" />}
                   
              </Link>
          )
        }
        </ul>
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
