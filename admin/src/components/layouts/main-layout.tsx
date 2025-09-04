import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../shared/app-sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../shared/navbar"
import { AddAuction } from "@/modules/AddAuction";
import { AddBrand } from "@/modules/AddBrand";
import { AddCar } from "@/modules/AddCar";
import { AddBlog } from "@/modules/AddBlog";
import { AddLogistic } from "@/modules/AddLogistic";
import { AddPartner } from "@/modules/AddPartner";
import { AddCustomer } from "@/modules/AddCustomer";
import { AddAdmin } from "@/modules/AddAdmin";

export default function Layout() {

  const {pathname} = useLocation()
  const buttonData = [
    {
      path: "/auctions",
      button: <AddAuction />
    },
    {
      path: "/brands",
      button: <AddBrand />
    },
    {
      path: "/blog",
      button: <AddBlog />
    },
    {
      path: "/cars",
      button: <AddCar />
    },
    {
      path: "/users",
      button: <AddAdmin />
    },
     {
      path: "/logistics",
      button: <AddLogistic />
    },
    {
      path: "/partners",
      button: <AddPartner />
    },
      {
      path: "/customers",
      button: <AddCustomer />
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar title="RT Motors" />
      <main className="flex-1 overflow-y-auto p-4 bg-[#e7e7e7]">
           <div className="flex items-center ">
            <SidebarTrigger/>
        <Navbar button={true} component={buttonData.find(btn => btn.path === pathname)?.button} />
           </div>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}