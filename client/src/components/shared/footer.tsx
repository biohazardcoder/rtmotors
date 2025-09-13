import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Footer() {
  return (
    <div className='bg-[#1e2550] py-8 px-[5%]'>
        <section>
            <div className='grid grid-cols-1 md:grid-cols-6 py-5'>
                <div className=''>
                    <h1 className=' text-xl md:text-2xl text-white font-bold sm:text-left text-justify mb-1'>RT MOTORS</h1>
                    <p className='text-white text-lg font-semibold'>From Korea To The world</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-start gap-4  lg:gap-10  md:pl-30 col-span-5">
                    <div>
                        <div className="mt-4 md:mt-0">
                            <h1 className='text-xl font-bold mb-3 text-white text-center'>Quick Links</h1>
                            <ul className='flex items-center justify-evenly text-sm lg:justify-start text-white gap-4 '>
                                <li>
                                    <a href="#">Homepage</a>
                                </li>
                                <li>
                                    <a href="/blog">Blog Posts</a>
                                </li>
                                 <li>
                                    <a href="/cars">Find Cars</a>
                                </li>
                                <li>
                                    <a href="/about">About Us</a>
                                </li>
                                <li>
                                    <HashLink to="/about/#contact">Contact Us</HashLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-4 md:mt-0'>
                        <div>
                            <h1 className=' text-xl font-bold mb-3 text-white text-center'>Contact Us</h1>
                        </div>
                        <div className='flex flex-col lg:flex-row text-sm text-white items-center gap-4 '>
                            <div className='flex items-center gap-1'>
                                <MapPin size={16}/>
                                <p>Gimhae, South Korea</p>
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
                <div className=' flex justify-between'>
                    <span className='text-white text-sm font-semibold'>All Rights Reserved © 2025.</span>
                <div className='flex  flex-col gap-1 md:flex-row'>
                    <Link to='/faq' className='text-white text-sm font-semibold'>Frequently Asked Question(FAQ)</Link>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer