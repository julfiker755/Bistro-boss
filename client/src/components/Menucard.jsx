import React from 'react';

const Menucard = ({items}) => {
    const {_id,category,image,name,price,recipe}=items
    return (
        <div className='flex-row lg:flex lg:space-x-2 items-center'>
         <img className='w-full lg:w-[70px] h-fit rounded-md border p-1 ' src={image} alt="" />
         <div>
            <h1 className='font-semibold font-xl'> {name} ----------- </h1>
             <p>{recipe}</p>
         </div>
         <h1 className='text-[#BB8506] mr-0 font-semibold'><span className='lg:hidden'>Price:</span>${price}</h1>
        </div>
    );
};

export default Menucard;