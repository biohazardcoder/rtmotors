import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../ui/button';

function Footer() {
  return (
    <div className='bg-primary-foreground py-8 px-[5%]'>
        <section>
            <div className='grid grid-cols-1 md:grid-cols-3 py-5'>
                <div className=''>
                    <h1 className=' text-xl sm:text-3xl text-primary font-bold sm:text-left text-justify mb-3'>Be Ready To Grow</h1>
                    <p className='text-primary'>Get Exclusive <span className='font-bold text-primary'>Updatestraigt</span> to your inbox.</p>
                    <br />
                    <div className='flex items-center h-10'>
                        <input type="text" placeholder='Email' className='w-full h-full pl-4 rounded-none bg-secondary border-2 border-primary outline-none '/>
                        <Button className='rounded-none h-full'>OK</Button>
                    </div>
                </div>
                <div className="flex  justify-start md:justify-between gap-10 flex-wrap md:pl-10 col-span-2">
                    <div>
                        <div className="mt-4 ">
                            <h1 className='text-xl font-bold mb-3 text-primary'>Quick Links</h1>
                            <ul className='flex flex-col text-primary gap-3'>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">Cars</a>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4">
                            <h1 className='text-xl font-bold mb-3 text-primary'>Important Links</h1>
                            <ul className='flex flex-col gap-3 text-primary'>
                                <li>
                                    <a href="#">Login</a>
                                </li>
                                <li>
                                    <a href="#">Brands</a>
                                </li>
                                <li>
                                    <a href="#">Our team</a>
                                </li>
                                <li>
                                    <a href="#">Partners</a>
                                </li>
                                <li>
                                    <a href="#">Comments</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div>
                            <h1 className=' text-xl font-bold mb-3 text-primary'>Contact Us</h1>
                        </div>
                        <div className='flex flex-col gap-3 '>
                            <div className='flex items-center gap-2'>
                                <MapPin />
                                <p>Gimhae, South Korea</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Mail  />
                                <p>rtmotorssales@gmail.com</p>
                            </div>
                            <div className=' flex items-center gap-2'>
                                <Phone />
                                <p>+8210-8465-8085</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='  sm:block border-t-2 bt-white py-8'>
                <div className=' flex justify-between'>
                    <span className='text-primary text-sm'>All Rights Reserved © 2025.</span>
                <div className='flex  flex-col gap-1'>
                    <span className='text-primary text-sm'>Privacy Policy </span><span className='ml-2'> </span>   <span className='text-primary text-sm'>Terms & Conditions</span>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer