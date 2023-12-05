import React from 'react';
import Subtitle from '../../shared/Subtitle';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement,Elements,useStripe,useElements,} from '@stripe/react-stripe-js';
import Paymentfrom from './Paymentfrom';



const Payment = () => {
    const stripePromise = loadStripe('pk_test_51OEngWDbR4bZMF6dCDjhjSgCi09S9OlYlaJpvxdUblNTikXULINqRs0zxmrax0QQIdZ7D2qXhyo1Xl5c1XmRYtST00H2QUr5H3')
    // const elements = useElements()
    return (
        <div>
            <Subtitle heading={"Payment"} subheading={"Please Pay to eat"}></Subtitle>
             <div className='w-11/12 lg:max-w-xl m-auto my-10'>
                <Elements stripe={stripePromise}>
                       <Paymentfrom></Paymentfrom>
                </Elements>
             </div>
        </div>
    );
};

export default Payment;