import slide1 from '../assets/home/slide1.jpg';
import slide2 from '../assets/home/slide4.jpg';
import slide3 from '../assets/home/slide3.jpg';
import slide4 from '../assets/home/slide4.jpg';
import Containerr from '../shared/Containerr';
import Subtitle from '../shared/Subtitle';

const Online = () => {
  return (
     <Containerr>
            <div>
      <Subtitle heading="---From 11:00 am to 10:00 pm---" subheading={'ORDER ONLINE'} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5 gap-3 lg:gap-8 m-auto'>
         <div className='relative'>
         <img className='w-full h-[350px] object-cover rounded-md' src={slide1} alt="" />
         <h1 className='text-3xl font-bold text-center bottom-3 left-1/2 [transform:translateX(-50%)] text-[black] absolute'>Salads</h1>
         </div>
         <div className='relative'>
         <img className='w-full h-[350px] object-cover rounded-md' src={slide2} alt="" />
         <h1 className='text-3xl font-bold text-center bottom-3 left-1/2 [transform:translateX(-50%)] text-[black] absolute'>Soups</h1>
         </div>
         <div className='relative'>
         <img className='w-full h-[350px] object-cover rounded-md' src={slide3} alt="" />
         <h1 className='text-3xl font-bold text-center bottom-3 left-1/2 [transform:translateX(-50%)] text-[black] absolute'>Pizzas</h1>
         </div>
         <div className='relative'>
         <img className='w-full h-[350px] object-cover rounded-md' src={slide4} alt="" />
         <h1 className='text-3xl font-bold text-center bottom-3 left-1/2 [transform:translateX(-50%)] text-[black] absolute'>Desserts</h1>
         </div>
      </div>
    </div>
     </Containerr>
  );
};

export default Online;
