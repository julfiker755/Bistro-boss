import React, {useState } from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import useAuthState from '../Hooks/useAuthState';
import Swal from 'sweetalert2'
import { FaCartPlus } from "react-icons/fa";
import useCarts from '../Hooks/useCarts';
// import useAdmin from '../Hooks/useAdmin';
// import Loading from '../Authentication/Loading';


const Header = () => {
    const [toggle, setoogle] = useState(false)
    const {logOut,user}=useAuthState()
    const navigate=useNavigate()
    const  {cart}=useCarts()
    // const [admin,isPending]=useAdmin()
   
    // if(isPending){
    //     return <Loading></Loading>
    // }
    // const locationpath=user && admin?.isAdmin === 'admin' ? '/dashboard/adminhome' : '/dashboard/userhome'

    return (
        <div className='md:!sticky md:top-0 md:left-0 md:z-[9999]'>
            <div className='bg-[#40cacd] text-white'>
            <div className='w-11/12 lg:max-w-7xl m-auto flex justify-between items-center py-2'>
            <h1 className='text-xl font-bold lg:font-semibold'>BISTRO BOSSM<br /><span className='lg:tracking-[.2em]'>Restaurant</span></h1>
                <ul className='hidden lg:flex items-center space-x-4 font-bold uppercase'>
                    <li><NavLink className={({ isActive}) => isActive ? 'text-[#6135b4]':""} to="/">HOME</NavLink></li>
                    <li><NavLink className={({ isActive}) => isActive ? 'text-[#6135b4]':""} to="/menu">Our Menu</NavLink></li>
                    <li><NavLink className={({ isActive}) => isActive ? 'text-[#6135b4]':""} to="/ourshop/salad">Our Shop</NavLink></li>
                     {user &&  <button onClick={()=>navigate('/dashboard/userhome')} className="btn btn-sm btn-error">
                            <FaCartPlus/>
                            <div className="badge badge-secondary">+{cart?.length}</div>
                        </button>}
                         
                     {user ? <button onClick={async()=>{
                        await logOut()
                        navigate("/")
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Log out successfull",
                            showConfirmButton: false,
                            timer: 1500
                          });
                     }} className='bg-[#ff7700] px-2 py-[1px] rounded-md'>Log Out</button> :<li><NavLink className={({ isActive}) => isActive ? 'text-[#6135b4]':""} to="/login">Log In</NavLink></li>
                     }
                   
                </ul>
                    {/* colse button */}
                    <div onClick={() => setoogle(!toggle)} className="lg:hidden cursor-pointer">
               {toggle ? <FaTimes size={20} /> : <AiOutlineMenu size={20} />}

            </div>
            </div>
        </div>




        {/*!// mobile divice --------------------------------------*/}
        <div className={`${toggle ? 'lg:hidden z-50 bg-[#1BB4B9] fixed left-0 top-0 transition-all w-3/4 h-full' : 'lg:hidden  z-50 bg-[#1BB4B9] fixed left-[-100%] top-0 duration-500 w-3/4 h-full'}`}>
        <div className='p-2'>
          <img className='h-[65px] w-[130px] p-3' src="" alt="" />
          <ul className='lg:hidden space-y-3'>
          <li className='border-b-[1px]'><NavLink className={({ isActive}) => isActive ? 'text-[#6135b4]':""} to="/">Home</NavLink></li>
          <li className='border-b-[1px]'><NavLink className={({ isActive}) => isActive ? 'text-[#6135b4]':""} to="/addcart" >Add Product</NavLink></li>
          <li className='border-b-[1px]'><NavLink className={({ isActive}) => isActive ? 'text-[#6135b4]':""} to="/mycart">My Cart</NavLink></li>
          <li className='flex border-b-[1px] items-center gap-2'><span>Dark/Light</span><input  type="checkbox" className="toggle toggle-info h-5 my-1"/></li>
          </ul>
        </div>
        </div>
        </div>
        
    );
};

export default Header;