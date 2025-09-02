import AOS from "aos";
import "aos/dist/aos.css";
import { BriefcaseBusiness, Phone } from "lucide-react";
import { useEffect } from "react";

interface Team {
    _id: string;
    name: string;
    avatar: string;
    job: string;
    number:string,
    lang : string[]

}

export const Team = () => {

    
      useEffect(() => {
        AOS.init({ duration: 800});
      }, []);
    

    const team: Team[] = [
        {
            _id: "1",
            name: "Ahliddin Teshaboev",
            avatar: "/team/ceo.jpg",
            job: "CEO",
            number: "+8210-2989-8641",
            lang :["kr.png", "en.png"]
        },
        {
            _id: "2",
            name: "Rakhmatilla Akhmedov",
            avatar: "/team/operation_m.jpg",
            job: "Operation Manager",
            number:"+8210-9687-9796",
            lang :["kr.png", "en.png", "ru.png"]

        },
        {
            _id: "3",
            name: "Abdullaev Bekmurod",
            avatar: "/team/sales_m.jpg",
            job: "Sales Manager",
            number:"+8210-8465-8085",
            lang :["kr.png", "en.png"]
        },
    ];

    return (
        <div className="bg-[#e7e7e7]">
            <div className="py-8 px-[5%]" data-aos="fade-up">
            <h1 className="text-xl md:text-3xl font-bold">Our Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
              
                 {team.map(team => (
                            <div key={team._id} className="bg-white  rounded-md shadow p-4">
                                <div className="flex  gap-4 flex-col">
                                    <img src={team.avatar} alt={team.name} className="w-full h-[400px] md:h-[300px] rounded-md object-center object-cover" />
                                    <div className="space-y-2">
                                        <p className="font-semibold">{team.name}</p>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <BriefcaseBusiness size={20}/> 
                                            {team.job}
                                        </p>
                                         <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Phone size={20}/> 
                                            {team.number}
                                        </p>
                                        <div className="flex items-center justify-center gap-2">
                                            {team.lang.map((item)=>(
                                                <img src={`/lang/${item}`} alt=""  className="w-10 h-10 object-cover object-center rounded-full"/>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))}
                      <div className="bg-white  rounded-md shadow p-4 col-span-1 md:col-span-2">
                     <h1 className="mt-4 text-2xl font-bold text-center">Shu yerga nimadur yozish kerak!</h1>
                </div>
            </div>
        </div>
        </div>
    );
}
