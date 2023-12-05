import React from 'react';
import { BiLogoFacebook } from 'react-icons/bi';
import { BsInstagram } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className=''>
      <div className='grid grid-cols-1  md:grid-cols-2'>
           <div className='bg-[#1F2937] text-white'>
             <div className='py-5 text-center'>
               <h1 className='text-3xl font-semibold'>CONTACT US</h1>
               <h1>123 ABS Street, Uni 21, Bangladesh</h1>
               <h1>+88 123456789</h1>
                <h1>Mon - Fri: 08:00 - 22:00</h1>
                <h1>Sat - Sun: 10:00 - 23:00</h1>
             </div>
           </div>
           <div className='bg-[#1f3159] py-5'>
           <div className='text-center lg:text-left py-5 px-4 text-white'>
               <h1 className='text-3xl font-semibold'>Follow US</h1>
               <h1>Join us on social media</h1>
                <ul className='flex text-2xl gap-4 justify-center lg:justify-start py-2'>
                   <li><BiLogoFacebook/></li>
                   <li><BsInstagram/></li>
                   <li><BsTwitter/></li>
                </ul>
             </div>
           </div>
        </div>
        {/* copy rihgt  */}
        <div className='bg-[#111827] py-2'>
           <h1 className='text-center text-white'>Copyright © CulinaryCloud. All rights reserved.</h1>
        </div>
    </div>
  );
};

export default Footer;