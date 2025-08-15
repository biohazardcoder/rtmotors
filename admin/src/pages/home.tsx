import { Navbar } from "@/components/shared/navbar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export const Home = () => {
  return (
    <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <SidebarTrigger/>
      <Navbar/>
    </div>
  )
}
