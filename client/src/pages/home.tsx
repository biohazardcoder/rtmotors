import { Auction } from "@/components/shared/auction"
import { Brands } from "@/components/shared/brands"
import { Comments } from "@/components/shared/comments"
import { Exchange } from "@/components/shared/exchange"
import Footer from "@/components/shared/footer"
import { Logistic } from "@/components/shared/logistics"
import { Main } from "@/components/shared/main"
import { Menus } from "@/components/shared/menus"
import { Navbar } from "@/components/shared/navbar"
import { Partners } from "@/components/shared/partners"
import { Vehicles } from "@/components/shared/vehicles"
import { useState } from "react"

export const Home = () => {

  const [type, setType] = useState("all");
  const [year, setYear] = useState<string>("any");
  const [price, setPrice] = useState<string>("any");
  const [brand, setBrand] = useState("all");
  return (
    <div>
        <Navbar />
        <Main type={type} brand={brand} year={year} price={price} setType={setType} setBrand={setBrand} setYear={setYear} setPrice={setPrice} />
        <Brands />
        <Vehicles setBrand={setBrand} setPrice={setPrice} setType={setType} setYear={setYear} type={type} year={year} price={price} brand={brand} />
        <Logistic/>
        {/* <Choose /> */}
        <Exchange/>
        <Partners/>
        <Auction/>
        <Comments />
        <Footer/>
      <Menus/>

    </div>
  )
}
