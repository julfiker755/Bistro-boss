import React from 'react';
import { useNavigate } from 'react-router-dom';
import Subtitle from '../shared/Subtitle';
import Menucard from './Menucard';

const Menucatagory = ({menu,offer,title}) => {
    const navigate=useNavigate()
    return (
        <div className='py-5'>
           {offer &&  <Subtitle heading={"---Don't miss---"} subheading={"TODAY'S OFFER"}></Subtitle>}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8'>
                {menu.map(item=><Menucard items={item} key={item._id}></Menucard>)}
            </div>
            <button onClick={()=>navigate(`/ourshop/${title}`)}  className='btn border-b-4 mt-4 flex justify-center mx-auto mb-4  btn-secondary btn-outline'>ORDER YOUR FAVOURITE FOOD</button>  
        </div>
    );
};

export default Menucatagory;