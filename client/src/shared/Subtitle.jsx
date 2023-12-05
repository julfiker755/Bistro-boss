import React from 'react';


const Subtitle = ({heading,subheading}) => {
    return (
        <div className='text-center w-fit m-auto my-[20px]'>
            <h1 className='py-2 text-xs  text-[#D99904] border-[#0d6481]'>{heading}</h1>
             <h1 className='text-xl lg:text-2xl border-t-2  border-b-2 py-2 font-semibold'>{subheading}</h1>
        </div>
    );
};


export default Subtitle;