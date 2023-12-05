import React from 'react';
import banner from '../../assets/shop/banner2.jpg'

const Cover = () => {
    return (
        <div className="hero  max-h-[900px] lg:h-[500px] max-w-7xl mx-auto" style={{backgroundImage:`url(${banner})`}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center w-fit lg:w-1/2 rounded-md lg:bg-[#0000006c] text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-xl lg:text-5xl font-bold">OUR SHOP</h1>
            <p className="mb-5 text-sm lg:text-base">Would you like to try a dish?</p>
          </div>
        </div>
      </div>
    );
};

export default Cover;