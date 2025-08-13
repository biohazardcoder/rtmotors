
export const Brands = () => {
    const brands = [
        {
            img:"/audi.png",
            name:"Audi"
        },
        {
            img:"https://images.seeklogo.com/logo-png/24/2/bmw-logo-png_seeklogo-240426.png",
            name:"BMW"
        },
        {
            img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Ford-Motor-Company-Logo.png/1200px-Ford-Motor-Company-Logo.png",
            name:"Ford"
        },
        {
            img:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
            name:"Mercedes Benz"
        },
        {
            img:"https://img.icons8.com/androidL/512/FD7E14/mclaren.png",
            name:"McLaren"
        },
    ]
  return (
    <div className=" bg-[#e7e7e7]">
       <div className="py-8 px-[5%]">
         <h1 className="text-3xl font-bold">Explore Our Premium Brands</h1>
        <div className="flex gap-10 mt-8 items-center ">
            {brands.map((brand) => (
                <div key={brand.name} className="flex flex-col bg-white  font-bold items-center shadow-md p-4 px-8z rounded-md">
                    <img src={brand.img} alt={brand.name} className="w-24 h-24 object-contain" />
                    <span className="mt-2">{brand.name}</span>
                </div>
            ))}
        </div>
       </div>
    </div>
  )
}
