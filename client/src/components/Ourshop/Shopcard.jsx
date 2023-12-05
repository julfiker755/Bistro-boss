import React from 'react';



const Shopcard = ({ orders,handlecart }) => {
    const { image, name, recipe, price, _id } = orders
 
    return (
        <div className="card border p-10 m-auto">
            <figure className='relative'>
                <img className='rounded-md w-full  h-full lg:h-[200px] object-cover' src={image} alt="Shoes" />
                <h1 className='absolute top-3 right-3 bg-[#00d9ffb1] text-white py-1 px-3 rounded-md'>${price}</h1>
            </figure>
            <div className='pb-2 rounded-b-md text-center'>
                <h1 className='font-bold py-2'>{name.slice(0,30)}</h1>
                <p>{recipe.slice(0,70)}</p>
                <button onClick={()=>handlecart(orders)} className='btn border-b-4 mt-4  btn-secondary btn-outline'>ADD TO CARD</button>
            </div>
        </div>
    );
};


export default Shopcard;