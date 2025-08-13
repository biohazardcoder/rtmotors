import { Brands } from "@/components/shared/brands"
import { Main } from "@/components/shared/main"
import { Navbar } from "@/components/shared/navbar"

export const Home = () => {
  return (
    <div>
        <Navbar />
        <Main />
        <Brands />
    </div>
  )
}
