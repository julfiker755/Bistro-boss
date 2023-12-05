import React from 'react';
import slide5 from '../assets/home/slide5.jpg'

const Chefcard = () => {
    return (
        <div className="card p-4 m-auto shadow-xl">
     <figure><img className='w-full h-[300px] object-cover' src={slide5} alt="Shoes" /></figure>
      <div className='pb-2 rounded-b-md text-center'>
          <h1 className='font-bold py-2'>Caeser Salad</h1>
        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
        <button className='btn border-b-4 mt-4  btn-secondary btn-outline'>ADD TO CARD</button>
        </div>
</div>
    );
};

export default Chefcard;