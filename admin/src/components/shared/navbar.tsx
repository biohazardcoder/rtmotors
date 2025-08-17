import { useLocation } from "react-router-dom"
import { SidebarTrigger } from "../ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const Navbar = () => {
    const {pathname} = useLocation()
    return (
    <div className="w-full flex items-center justify-between px-4 h-[10vh]">
      <div className="flex items-center gap-4">
        <SidebarTrigger/>
        <h1 className="text-sm text-muted-foreground ">
            Tracking: <span className="font-semibold text-accent-foreground capitalize">{pathname === "/" ? "Orders" : pathname.slice(1)}</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png"/>
            <AvatarFallback>RT</AvatarFallback>
        </Avatar>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-accent-foreground">User Name</p>
          <p className="text-xs">user@example.com</p>
        </div>
      </div>
    </div>
  )
}
