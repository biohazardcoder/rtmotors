import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { User, Menu, X } from "lucide-react"
import { useState } from "react";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
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
    <div className="absolute top-0 left-0 w-full h-[10vh] bg-transparent flex items-center justify-between px-[5%] text-white z-50">
      <img src="/logo.png" alt="RT Motors"className="w-20" />
      <div className="hidden md:flex items-center gap-4">
        <ul className="flex gap-8">
          {items.map(item => (
            <li key={item.label}>
              <Link to={item.url} className="font-semibold">{item.label}</Link>
            </li>
          ))}
        </ul>
        <Button variant={"secondary"} className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
          <User />
          Sign in
        </Button>
      </div>
      <Button
        variant={"secondary"}
        className="md:hidden flex items-center bg-blue-500 hover:bg-blue-600 text-white "
        onClick={() => setToggle(!toggle)}
        aria-label="Toggle menu"
      >
        {toggle ? <X size={28} /> : <Menu size={28} />}
      </Button>
      {toggle && (
        <div className="fixed top-20 left-0 w-full h-1/2 bg-black opacity-80 flex flex-col  justify-center p-4 gap-8 md:hidden z-50">
          <ul className="flex flex-col gap-6 text-2xl">
            {items.map(item => (
              <li key={item.label}>
                <Link
                  to={item.url}
                  className="font-semibold"
                  onClick={() => setToggle(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                  to={"/login"}
                  className="font-semibold"
                  onClick={() => setToggle(false)}
                >
                  Sign in
                </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
