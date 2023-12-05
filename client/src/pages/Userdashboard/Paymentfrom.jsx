import React, { useEffect, useState } from 'react';
import {PaymentElement,Elements,useStripe,useElements, CardElement,} from '@stripe/react-stripe-js';
import useCarts from '../../Hooks/useCarts';
import UseIncaptor from '../../Hooks/UseIncaptor';
import useAuthState from '../../Hooks/useAuthState';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Authentication/Loading';
import { format } from 'date-fns';
import usePayment from '../../Hooks/usePayment';


const Paymentfrom = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errortext,seterrortext]=useState('')
    const {cart,isPending,refetch}=useCarts()
    const axiosincaptor=UseIncaptor()
    const [clientSecret, setClientSecret] = useState("");
    const {user}=useAuthState()
    const navigate=useNavigate()
    const {refetch:paymentrefetch}=usePayment()

      if(isPending){
        return <Loading></Loading>
      }
    // payment mathod
    const totalprice=cart?.reduce((pv,cv)=>pv+cv.price,0)


    useEffect(()=>{
     (()=>{
      axiosincaptor.post('/create-payment-intent',{price:parseFloat(totalprice)})
    .then(res=>{
        setClientSecret(res.data.clientSecret)
    })
     })()
    },[])

 

    const handleSubmit=async(event)=>{
        event.preventDefault()
        if (!stripe || !elements) return;
        const card = elements.getElement(CardElement);
        if (card == null) return

          // createPaymentMethod -----------
     const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.log('[error]', error);
        seterrortext(error?.message)
      } else {
        seterrortext('')
        console.log('PaymentMethod', paymentMethod);
      }
      
      // confirmCardPayment-------------
      const {paymentIntent,error:confirmerror} = await stripe.confirmCardPayment(
        `${clientSecret}`,
        {
          payment_method: {
            card: card,
            billing_details: {
              name:user?.displayName || 'not call name',
              email:user?.email || 'not call email',
            },
          },
        },
      );
      if(confirmerror){
        console.log('confirm error')
      }else{
        console.log('Intent',paymentIntent)
        if(paymentIntent?.status === "succeeded"){
            //  console.log('trasitionid'+ )
             const paymentinfo={
                name:user?.displayName,
                email:user?.email,
                trasitionid:paymentIntent?.id,
                price:totalprice,
                cartids:cart?.map(d=>d._id),
                menuids:cart?.map(d=>d.menuid),
                date:format(new Date(), 'PP'),
                stadus:'success'
             }
           const {data}=await  axiosincaptor.post(`/payment`, paymentinfo)
           if(data.paymentresult.insertedId){
            paymentrefetch()
            refetch()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Payment Successfull",
                showConfirmButton: false,
                timer: 1500
              }).then(()=>{
                 navigate(`/dashboard/paymenthistory`)
              })
           }
          
        }
      }

    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <CardElement
        options={{
          style: {
            base: {
              fontSize: '18px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className='flex justify-center my-2'>
      <button type="submit"  className='btn btn-primary w-[200px] capitalize my-3' disabled={!stripe || !clientSecret}>
        Pay
      </button>
      
      </div>
       </form>
       {errortext && <h1 className='bg-[red] text-center py-5 rounded-md text-3xl my-5 text-white'>
         {errortext}
      </h1>}
        </div>
    );
};

export default Paymentfrom;