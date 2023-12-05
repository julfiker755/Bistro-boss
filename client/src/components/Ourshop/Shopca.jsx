import React from 'react';
import Shopcard from './Shopcard';
import useAuthState from '../../Hooks/useAuthState';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import UseIncaptor from '../../Hooks/UseIncaptor';
import useCarts from '../../Hooks/useCarts';


const Shopca = ({order}) => {
    const {user}=useAuthState()
    const navigate=useNavigate()
    const location=useLocation()
    const axiosincaptor=UseIncaptor()
    const {cart,isPending,refetch}=useCarts()

    const  handlecart=async(d)=>{
        if(user && user?.email){
           const cartitem={
            menuid:d._id,
            email:user?.email,
            name:d.name,
            image:d.image,
            price:d.price,
           }
           const {data}=await axiosincaptor.post('/carts',cartitem)
           if(data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Product add successfull",
                showConfirmButton: false,
                timer: 1500
              });
            //   refetch your data for website
              refetch()
           }
        }else{
            Swal.fire({
                title: "You are not Login",
                text: "Please login add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/login',{state:{from: location}})
                }
              });
        }
    }
    return (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-8'>
                {order.map(order=><Shopcard handlecart={handlecart} orders={order} key={order._id}></Shopcard>)}
            </div>  
    );
};

export default Shopca;