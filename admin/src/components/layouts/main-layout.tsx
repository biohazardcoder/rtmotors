import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../shared/app-sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar title="RT Motors" />
      <main className="flex-1 overflow-y-auto p-4 bg-[#e7e7e7]">
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}