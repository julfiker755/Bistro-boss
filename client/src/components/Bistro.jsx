import React from 'react';
import chef from '../assets/home/chef-service.jpg'
import Containerr from '../shared/Containerr';

const Bistro = () => {
    return (
        <Containerr>
            <div className='py-20  lg:py-0 lg:my-[30px]'>
           <div className='relative'>
           <img src={chef} alt="" />
           <div className='absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] translate-middle'>
             <div className='bg-[white] text-center text-black w-screen lg:w-[800px] h-fit overflow-hidden  p-10 rounded-md'>
             <h1 className='text-3xl'>Bistro Boss</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
             </div>
           </div>
           </div>
        </div>
        </Containerr>
    );
};



export default Bistro;