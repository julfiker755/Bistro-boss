import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom'
import { HiHome } from 'react-icons/hi';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { IoMdMenu } from 'react-icons/io';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { FaUsers } from "react-icons/fa6";
import useAdmin from '../Hooks/useAdmin';
import Loading from '../Authentication/Loading';
import { MdAddCard } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { MdPayment } from "react-icons/md";



const Dashboard = () => {
    const [admin,isPending]=useAdmin()

    if(isPending){
        return <Loading></Loading>
    }


    
   
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <label htmlFor="my-drawer-2" className="btn btn-sm btn-primary fixed -full left-2 top-2 drawer-button lg:hidden"><AiOutlineDoubleRight /></label>
            <div className="drawer-content flex flex-col p-4">
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side h-full lg:h-screen">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu text-xl lg:text-[18px] p-4 w-80 h-full capitalize bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <h1 className='text-xl select-none text-[#cd3a3a] font-bold lg:font-semibold ml-3 mb-6'>BISTRO BOSSM<br /><span className='lg:tracking-[.2em]'>Restaurant</span></h1>
                        {admin?.isAdmin === 'admin' ? <>
                        {/* admin user links */}
                        <li><NavLink to="/dashboard/userhome"><HiHome />User Home</NavLink></li>
                        <li><NavLink to="/dashboard/mycart"><BsFillCartPlusFill /> My Carts</NavLink></li>
                        <li><NavLink to="/dashboard/paymenthistory"><MdPayment />Payment History</NavLink></li>
                        <hr className='border-b-1 border-[#d7cdcde5] my-2 w-full'></hr>
                        <li><NavLink to="/dashboard/adminhome"><FaUsers /> Admin Home</NavLink></li>
                        <li><NavLink to="/dashboard/alluser"><FaUsers /> All user</NavLink></li>
                        <li><NavLink to="/dashboard/additems"><MdAddCard/> Add items</NavLink></li>
                        <li><NavLink to="/dashboard/mangeitems"><SiGoogletagmanager/> Mange items</NavLink></li>
                        </>:<>
                        {/* normal user links */}
                        <li><NavLink to="/dashboard/userhome"><HiHome />User Home</NavLink></li>
                        <li><NavLink to="/dashboard/mycart"><BsFillCartPlusFill /> My Carts</NavLink></li>
                        <li><NavLink to="/dashboard/paymenthistory"><MdPayment />Payment History</NavLink></li>
                        </>}
                        
                        
                    {/* {Admin ? <>
                        <li><CustomLink to="/dasboard/home"><HiHome />User Home</CustomLink></li>
                        <li><CustomLink to="/dasboard/manage"><BsCalendar3Fill />Manage items</CustomLink></li>
                        <li><CustomLink to="/dasboard/additems"><BsCalendar3Fill />Add items</CustomLink></li>
                        <li><CustomLink to="/dasboard/alluser"><FaUserPlus />All Users</CustomLink></li>
                        <li><CustomLink to="/dasboard/mycart"><BsFillCartPlusFill /> My Carts<span className="indicator-item bg-[red] text-white badge">{cart?.length || 0}</span></CustomLink></li>
                    </> : <> </>} */}

                    <div className="divider">OR</div>
                    <li><Link to="/"><HiHome /> Home</Link></li>
                    <li><Link><RiContactsBook2Fill /> Contact Us</Link></li>
                    <li><Link to="/menu"><IoMdMenu /> Our Menu</Link></li>
                    <li><Link to="/shop/dessert"><BsFillCartPlusFill /> Shop</Link></li>
                </ul>

            </div>
        </div>
    );
};



export default Dashboard;