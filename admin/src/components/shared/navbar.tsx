import { useLocation } from "react-router-dom"

export const Navbar = () => {
    const {pathname} = useLocation()
    return (
    <div className="w-full flex items-center justify-between px-4 h-[10vh]">
        <h1 className="text-sm text-muted-foreground ">
            Tracking: <span className="font-semibold text-accent-foreground capitalize">{pathname === "/" ? "Home" : pathname.slice(1)}</span>
        </h1>
    </div>
  )
}
