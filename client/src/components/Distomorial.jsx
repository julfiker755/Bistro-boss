import React from 'react';
import Subtitle from '../shared/Subtitle';
import Containerr from '../shared/Containerr';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';
// import required modules
import { Navigation } from 'swiper/modules';

const Distomorial = () => {
    return (
        <div className='py-5'>
            <Subtitle heading={"---What Our Clients Say---"} subheading={"TESTIMONIALS"}></Subtitle>
            <Containerr>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide> <div className='text-center max-w-5xl m-auto'>
                    <div className='flex justify-center'>
                        <Rating style={{ maxWidth: 130 }} value={5} />
                    </div>
                    <p>Various version have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <h1 className='text-3xl font-semibold text-[#CD9003] py-2'>JANE DOE</h1>
                </div></SwiperSlide>
                <SwiperSlide> <div className='text-center max-w-5xl m-auto'>
                    <div className='flex justify-center'>
                        <Rating style={{ maxWidth: 130 }} value={5} />
                    </div>
                    <p>Various version have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <h1 className='text-3xl font-semibold text-[#CD9003] py-2'>JANE DOE</h1>
                </div></SwiperSlide>
                <SwiperSlide> <div className='text-center max-w-5xl m-auto'>
                    <div className='flex justify-center'>
                        <Rating style={{ maxWidth: 130 }} value={5} />
                    </div>
                    <p>Various version have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <h1 className='text-3xl font-semibold text-[#CD9003] py-2'>JANE DOE</h1>
                </div></SwiperSlide>
            </Swiper>
            </Containerr>
        </div>
    );
};

export default Distomorial;