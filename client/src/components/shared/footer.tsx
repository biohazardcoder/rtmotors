import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';

function Footer() {
    const { t} = useTranslation();
  return (
    <div className='bg-[#1e2550] pt-8 px-[5%]'>
        <section>
            <div className='grid grid-cols-1 md:grid-cols-6 py-5'>
                <div className=''>
                    <h1 className=' text-xl md:text-2xl text-white font-bold sm:text-left text-justify mb-1'>RT MOTORS</h1>
                    <p className='text-white text-lg font-semibold'>{t("from_korea_to_the_world")}</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-start gap-4  lg:gap-10  md:pl-30 col-span-5">
                    <div>
                        <div className="mt-4 md:mt-0">
                            <h1 className='text-xl font-bold mb-3 text-white text-center'>{t("quick_links")}</h1>
                            <ul className='flex items-center flex-wrap justify-evenly text-sm lg:justify-evenly text-white gap-4 '>
                                <li>
                                    <a href="#">{t("home")}</a>
                                </li>
                                <li>
                                    <a href="/blog">{t("blog")}</a>
                                </li>
                                 <li>
                                    <a href="/cars">{t("find")}</a>
                                </li>
                                <li>
                                    <a href="/about">{t("about")}</a>
                                </li>
                                <li>
                                    <HashLink to="/about/#contact">{t("contact")}</HashLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-4 md:mt-0'>
                        <div>
                            <h1 className=' text-xl font-bold mb-3 text-white text-center'>{t("contact")}</h1>
                        </div>
                        <div className='flex flex-col lg:flex-row text-xs text-white items-center gap-4 '>
                            <div className='flex items-center gap-1'>
                                <MapPin size={16}/>
                                <p>{t("location")}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <Mail  size={16}/>
                                <p>rtmotorssales@gmail.com</p>
                            </div>
                            <div className=' flex items-center gap-1'>
                                <PhoneCall size={16}/>
                                <p>+8210-8465-8085</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t-2 py-8'>
                <div className=' flex items-center flex-wrap gap-2 justify-between'>
                    <span className='text-white text-sm font-semibold'>{t("all_rights_reserved")} © 2025.</span>
                <div className='flex  flex-col gap-1 md:flex-row'>
                    <HashLink to='/faq/#all' className='text-white text-sm font-semibold'>{t("frequently_asked_questions")}</HashLink>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer