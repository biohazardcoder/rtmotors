import { BanknoteArrowUp, CarFront, ClipboardList,  GalleryHorizontalEnd, Handshake,  LogOut,  MessageSquareMore,   Newspaper,   Package,    Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link,  useLocation } from "react-router-dom"
import { Button } from "../ui/button"

const items = [
  {
    title: "Orders",
    url: "/",
    icon: ClipboardList,
  },
  {
    title: "Cars",
    url: "/cars",
    icon: CarFront,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Brands",
    url: "/brands",
    icon: GalleryHorizontalEnd,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: MessageSquareMore,
  },
  {
    title: "Partners",
    url: "/partners",
    icon: Handshake,
  },
  {
    title: "Auctions",
    url: "/auctions",
    icon: BanknoteArrowUp,
  },
  {
    title: "Logistics",
    url: "/Logistics",
    icon: Package,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: Newspaper,
  },
]

export function AppSidebar({ title }: { title?: string }) {

  const {pathname} = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-[#e7e7e7] gap-0">
        <SidebarGroup>
          <SidebarGroupLabel >
            {title || "Application"}
          </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-full py-4 font-semibold px-6 text-lg rounded-none rounded-r-2xl">
                    <Link
                      to={item.url}
                      className={
                        pathname === item.url
                          ? "flex items-center gap-2 bg-[#003939] text-white"
                          : "flex items-center gap-2"
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter className="bg-[#e7e7e7] pb-4">
          <Button 
          onClick={handleLogout}
          variant={"ghost"} className="justify-start cursor-pointer">
            <LogOut size={20}/>
            <span className="font-semibold">Logout</span>
          </Button>
        </SidebarFooter>
    </Sidebar>
  )
}