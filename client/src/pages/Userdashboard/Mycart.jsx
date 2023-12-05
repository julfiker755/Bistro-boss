import React, { useEffect, useState } from 'react';
import Subtitle from '../../shared/Subtitle';
import { MdDeleteForever } from "react-icons/md";
import useCarts from '../../Hooks/useCarts';
import Loading from '../../Authentication/Loading';
import Swal from 'sweetalert2'
import UseIncaptor from '../../Hooks/UseIncaptor';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useNavigate } from 'react-router-dom';

const Mycart = () => {
    const {cart,isPending,refetch}=useCarts()
    const axiosincaptor=UseIncaptor()
    const [currentPage, setCurrentPage] = useState(1);
    const navigate=useNavigate()

    // client side pagination
    const ItemsPerPage=4
    const indexOfLastItem = currentPage * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    const currentItems = cart?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cart.length / ItemsPerPage);


    

    if(isPending){
        return <Loading></Loading>
    }
    const totalprice=cart?.reduce((pv,cv)=>pv+cv.price,0)
    // handledelete
   const handledelete=(id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "Your Items Delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete"
      }).then(async(result) => {
        if (result.isConfirmed) {
         const {data}=await axiosincaptor.delete(`/carts/${id}`)
         if(data?.deletedCount > 0){
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            //   refetch your api
              refetch()
         }
        }
      });
   }

    return (
        <div>
            <div>
                <Subtitle heading={"---My Cart---"} subheading={"WANNA ADD MORE?"}></Subtitle>
            </div>
       <div className='flex justify-between py-2'>
         <h1 className='text-xl font-semibold'>Total orders:{cart?.length}</h1>
         <h1 className='text-xl font-semibold'>Total price: {totalprice}</h1>
         <button disabled={!cart.length}  onClick={()=>navigate(`/dashboard/payment`)} className='bg-[#D1A054] text-white px-3 py-1 rounded-md disabled:bg-[#d19f545d]'>Pay</button>
        </div> 
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-[#D1A054] text-white'>
      <tr>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {currentItems.length ? currentItems.map((item,index)=>{
        const {_id,image,name,price}=item || {}
        return <tr key={index}>
         <td>
           <div className="flex items-center">
             <div className="avatar">
               <div className="mask w-12 rounded-md h-12">
                 <img src={image} alt="Avatar Tailwind CSS Component" />
               </div>
             </div>
           </div>
         </td>
         <td>{name}</td>
         <td>{price}</td>
         <th onClick={()=>handledelete(_id)}>
           <MdDeleteForever className='bg-[#e93939] rounded-sm py-[2px] cursor-pointer'  size={25} color='white'/>
         </th>
       </tr>
      }):<tr className='text-base text-[red] font-semibold'><td>❌ Not Your Food item</td></tr>}

    </tbody>

  </table>
  {/* -----------ResponsivePagination-----------*/}
  
</div>
<div className='w-full lg:w-[400px] m-auto py-5'>
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
    </div>
    
        </div>
    );
};

export default Mycart;