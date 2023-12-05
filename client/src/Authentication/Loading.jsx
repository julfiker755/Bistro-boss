import React from 'react';
import { Dna } from  'react-loader-spinner';


const Loading = () => {
    return (
        <div className='w-full h-[400px] flex justify-center items-center'>
        <Dna
        visible={true}
        height="100"
        width="140"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
    />
    </div>
    );
};



export default Loading;