import React from 'react';
import { Parallax} from 'react-parallax';
import './Menubanner.css'
const Menubanner = ({title,discripation,img}) => {
    return (
        <Parallax
        blur={{ min: -20, max: 20 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-300}
        
    >
   <div className="hero  max-h-[700px] lg:h-[700px]">
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center w-fit lg:w-1/2 rounded-md lg:bg-[#0000006c] text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-xl lg:text-5xl font-bold">{title}</h1>
      <p className="mb-5 text-sm lg:text-base">{discripation}</p>
    </div>
  </div>
</div>
    </Parallax>
    );
};

export default Menubanner;