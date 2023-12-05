import React, { useEffect, useState } from 'react';
import Subtitle from '../../shared/Subtitle';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import useMenu from '../../Hooks/useMenu';
import Loading from '../../Authentication/Loading';
import Swal from 'sweetalert2'
import UseIncaptor from '../../Hooks/UseIncaptor';
import { useNavigate } from 'react-router-dom';

const Mangeitems = () => {
    const {food,isPending,refetch}=useMenu()
    const [search,setsearch]=useState('')
    const axiosincaptor=UseIncaptor()
    const navigate=useNavigate()
    // console.log(search)

    if(isPending){
        return <Loading></Loading>
    }
// handle delete
const handledeletefood=(foodid)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success capitalize",
          cancelButton: "btn btn-danger capitalize mr-2"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Your food item Delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        axiosincaptor.delete(`/menu/${foodid}`)
        .then(res=>{
            if(res.data.deletedCount > 0){
            refetch()
            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your Food items has been deleted.",
            icon: "success"
          });
            }
           
        })
        
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Food is Safe",
            icon: "error"
          });
        }
      });
}
// handle edit


    return (
        <div>
              <div>
            <div>
                <Subtitle heading={"---Hurry Up!---"} subheading={"MANAGE ALL ITEMS"}></Subtitle>
            </div>
       <div className='flex justify-between items-center py-[4px]'>
         <h1 className='text-xl font-semibold'>Total items:{food.length}</h1>
         <input onChange={(e)=>setsearch(e.target.value)} type="text" placeholder="Your Food search here...." className="input h-[30px] input-bordered input-secondary w-full max-w-[200px]" />
        </div> 
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-[#D1A054] text-white'>
      <tr>
        <th>Scrial</th>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {
        food.filter(d=>d.name?.toLowerCase().includes(search?.toLowerCase())).map((f,index)=>{
            const {_id,name,price,image}=f
            return <tr key={index}>
            <td>{index+1}</td>
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
                 <th>
                   <h1 onClick={()=>navigate(`/dashboard/itemupdate/${_id}`)} className='bg-[#39e9c6]  p-[7px] rounded-md w-fit cursor-pointer'><FaRegEdit size={20} color='white'/></h1>
                 </th>
                 <th>
                 <h1 onClick={()=>handledeletefood(_id,)} className='bg-[#e53b9e]  p-[7px] rounded-md w-fit cursor-pointer'><MdDeleteForever size={20} color='white'/></h1>
                 </th>
               </tr>
        }) 
    }
      
   

    </tbody>

  </table>

</div>

        </div>
        </div>
    );
};

export default Mangeitems;