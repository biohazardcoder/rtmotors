import { useLocation } from "react-router-dom"
import { SidebarTrigger } from "../ui/sidebar"
import { Sheet } from "../ui/sheet"
interface NavbarProps {
  button?: boolean;
  component?: React.ReactNode;
}

export const Navbar = ({button, component}:NavbarProps) => {
    const {pathname} = useLocation()
    return (
    <div className="w-full flex items-center justify-between px-4 h-[10vh]">
      <div className="flex items-center gap-4">
         <SidebarTrigger/>
        <h1 className="text-sm text-muted-foreground ">
            Tracking: <span className="font-semibold text-xs md:text-sm text-accent-foreground capitalize">{pathname === "/" ? "Orders" : pathname.slice(1)}</span>
        </h1>
      </div>
        <div className="text-xs ">
          {button && component && <div>
            <Sheet>
              {component}
            </Sheet>
            </div>}
        </div>
    </div>
  )
}
