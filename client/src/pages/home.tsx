import { Brands } from "@/components/shared/brands"
import { Main } from "@/components/shared/main"
import { Navbar } from "@/components/shared/navbar"
import { Vehicles } from "@/components/shared/vehicles"
import { useState } from "react"

export const Home = () => {

  const [type, setType] = useState("all");
  const [year, setYear] = useState<number | any>(0);
  const [price, setPrice] = useState<number | any>(0);
  const [brand, setBrand] = useState("all");
  return (
    <div>
        <Navbar />
        <Main type={type} brand={brand} year={year} price={price} setType={setType} setBrand={setBrand} setYear={setYear} setPrice={setPrice} />
        <Brands />
        <Vehicles type={type} year={year} price={price} brand={brand} />
    </div>
  )
}
