import React from 'react';
import Subtitle from '../shared/Subtitle';
import Containerr from '../shared/Containerr';
import Chefcard from './Chefcard'

const Chef = () => {
    return (
        <Containerr>
            <div>
            <Subtitle heading={"---Should Try---"} subheading={"CHEF RECOMMENDS"}></Subtitle>
            
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-9 mb-5'>
             <Chefcard></Chefcard>
             <Chefcard></Chefcard>
             <Chefcard></Chefcard>
          </div>
        </div>
        </Containerr>
    );
};

export default Chef;