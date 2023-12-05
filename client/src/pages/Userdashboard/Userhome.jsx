import React from 'react';
import p1 from '../../assets/user/p1.png'
import p2 from '../../assets/user/p2.png'
import p3 from '../../assets/user/p3.png'
import { FaCartArrowDown } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";
import useAuthState from '../../Hooks/useAuthState';

const Userhome = () => {
    const {user}=useAuthState()
  
    return (
        <div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 py-3 lg:py-5">
  <div className="stat border rounded-md">
    <div className="stat-figure text-secondary">
      <img className='w-[50px]' src={p1} alt="" />
    </div>
    <div className="stat-value text-primary">205</div>
    <div className="stat-desc">Menu</div>
  </div>
  
  <div className="stat border rounded-md">
    <div className="stat-figure">
      <img src={p2} alt="" />
    </div>
    <div className="stat-value text-info">103</div>
    <div className="stat-desc">Shop</div>
  </div>
  
  <div className="stat border rounded-md"> 
    <div className="stat-figure">
     <img src={p3} alt="" />
    </div>
    <div className="stat-value text-error">03</div>
    <div className="stat-desc">Contact</div>
  </div>
  
</div>
 {/* menu */}
  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-2'>
    <div className='text-black w-full relative border  h-[300px] lg:h-[300px] rounded-md shadow-sm'>
          <div className='absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)]'>
          <img className='w-[150px] ring-2 ring-[#3ABFF8] h-[150px]  rounded-full m-auto my-auto' src={user?.photoURL}  alt="" />
        <h1 className='text-xl text-center lg:text3xl font-bold text-[#ff0084]'>{user?.displayName}</h1>
        <h1 className='text-xs text-center text-[#e34f9c]'>{user?.email}</h1>
          </div>
      
    </div>
    <div className=' text-black p-3 border relative  h-[300px] lg:h-[300px] rounded-md shadow-sm'>
        <div className='absolute top-1/2  [transform:translateY(-50%)]'>
        <h1 className='text-bold lg:text-3xl font-bold py-2'>Your Activities</h1>
        <ul>
            <li className='text-[#0088FE] text-xl font-semibold flex items-center gap-1'><FaCartArrowDown size={15}/>Orders: 6</li>
            <li className='text-[#00C4A1] text-xl font-semibold flex items-center gap-1'><FaStar size={15}/>Reviews: 2</li>
            <li className='text-[#FFBB28] text-xl font-semibold flex items-center gap-1'><FaAddressBook size={15}/>Bookings: 1</li>
            <li className='text-[#FF8042] text-xl font-semibold flex items-center gap-1'><FaCcAmazonPay size={15}/>Payment: 3</li>
        </ul>   
          </div>
    </div>
  </div>
        </div>
    );
};

export default Userhome;