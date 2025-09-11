import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { Button } from '../ui/button';

function Footer() {
  return (
    <div className='bg-primary-foreground py-8 px-[5%]'>
        <section>
            <div className='grid grid-cols-1 md:grid-cols-4 py-5'>
                <div className=''>
                    <h1 className=' text-xl sm:text-3xl text-primary font-bold sm:text-left text-justify mb-3'>RT MOTORS</h1>
                    <p className='text-primary'>Get Exclusive <span className='font-bold text-blue-500'>Updatestraigt</span> to your inbox.</p>
                    <br />
                    <div className='flex items-center h-10'>
                        <input type="text" placeholder='Email' className='w-full h-full pl-4 rounded-none bg-secondary border-2 border-primary outline-none '/>
                        <Button className='rounded-none h-full'>OK</Button>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-start gap-4  lg:gap-10  md:pl-30 col-span-3">
                    <div>
                        <div className="mt-4">
                            <h1 className='text-xl font-bold mb-3 text-primary text-center'>Quick Links</h1>
                            <ul className='flex items-center justify-evenly lg:justify-start text-primary gap-3 '>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="/cars">Cars</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/blog">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div>
                            <h1 className=' text-xl font-bold mb-3 text-primary text-center'>Contact Us</h1>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center gap-3 '>
                            <div className='flex items-center gap-2'>
                                <MapPin />
                                <p>Gimhae, South Korea</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Mail  />
                                <p>rtmotorssales@gmail.com</p>
                            </div>
                            <div className=' flex items-center gap-2'>
                                <PhoneCall />
                                <p>+8210-8465-8085</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t-2 py-8'>
                <div className=' flex justify-between'>
                    <span className='text-primary text-sm'>All Rights Reserved © 2025.</span>
                <div className='flex  flex-col gap-1 md:flex-row'>
                    <span className='text-primary text-sm'>Privacy Policy </span><span className='ml-2'> </span>   <span className='text-primary text-sm'>Terms & Conditions</span>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer