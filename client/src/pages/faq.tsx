import Footer from "@/components/shared/footer"
import { Menus } from "@/components/shared/menus"
import { Navbar } from "@/components/shared/navbar"

export const Faq = () => {
  return (
    <div className="bg-[#e7e7e7] pt-24">
        <Navbar/>
        <Menus/>
        <div className="text-center py-10">
            Faq
        </div>
        <Footer/>
    </div>
  )
}
