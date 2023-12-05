import React, { useEffect, useState } from 'react';
import Subtitle from '../shared/Subtitle';
import axios from 'axios'
import Menucard from './Menucard';
import Containerr from '../shared/Containerr';
import UseIncaptor from '../Hooks/UseIncaptor';

const Menu = () => {
    const [menu,setmenu]=useState([])
    const [show,setshow]=useState(true)
    const axiosincapto=UseIncaptor()
    useEffect(()=>{
     (async()=>{
        const {data}=await axiosincapto.get("/menu")
        setmenu(data)
     })()
    },[])

    return (
        <Containerr>
            <div className='my-[30px]'>
            <Subtitle  heading={"---Check it out---"} subheading={"FROM OUR MENU"}></Subtitle>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
            {menu.slice(0,show ? 6:57).map(item=><Menucard items={item} key={item._id}></Menucard>)}
        </div>
        <button onClick={()=>setshow(!show)} className='btn border-b-4 mt-4 flex justify-center mx-auto btn-primary btn-outline'>View Full  Menu</button>
    </div>
        </Containerr>
    );
};

export default Menu;