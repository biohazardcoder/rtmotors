import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { User } from "lucide-react"

export const Navbar = () => {
  
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
    <div className="absolute top-0 left-0 w-full h-[10vh] bg-transparent flex items-center justify-between px-[5%] text-white">
      <h1 className="font-bold text-2xl">RT MOTORS</h1>
      <div className="flex items-center gap-4">
        <ul className="flex gap-8">
          {items.map(item => (
            <li key={item.url}>
              <Link to={item.url} className="font-semibold">{item.label}</Link>
            </li>
          ))}
        </ul>
        <Button variant={"secondary"}>
          <User/>
          Sign in
        </Button>
      </div>
    </div>
  )
}
