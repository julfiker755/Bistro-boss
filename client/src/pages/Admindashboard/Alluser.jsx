import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import Subtitle from '../../shared/Subtitle';
import useAlluserget from '../../Hooks/useAlluserget';
import Loading from '../../Authentication/Loading';
import UseIncaptor from '../../Hooks/UseIncaptor';
import Swal from 'sweetalert2'


const Alluser = () => {
    const {user,isPending,refetch}=useAlluserget()
    const axiosincaptor=UseIncaptor()
    if(isPending){
        return <Loading></Loading>
    }

    // handle delete
    const handledelete=async(deleteid)=>{
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
                const {data}=await  axiosincaptor.delete(`/delete/${deleteid}`)
                if(data.deletedCount > 0){
                 // how to call refetch your data
                 refetch()
                 Swal.fire({
                     position: "center",
                     icon: "success",
                     title: 'Delete Successfull',
                     showConfirmButton: false,
                     timer: 1500
                   });
                }
            }
          });
    }
    // hanldeadmin use
    const handleadmin=(role,uid)=>{
        Swal.fire({
            title: "Are you sure?",
            text: `My website power ${role}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes,${role}`
          }).then(async(result) => {
            if (result.isConfirmed) {

                const {data}=await axiosincaptor.patch(`/user/${uid}`,{role})
            
                if(data?.modifiedCount > 0){
                    // refetch your data for example
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${role} Power`,
                        showConfirmButton: false,
                        timer: 1200
                      });
                }
            }
          });
    }

    return (
        <div>
            <div>
                <Subtitle heading={"---How many??---"} subheading={"MANAGE ALL USERS"}></Subtitle>
            </div>
       <div>
         <h1 className='text-2xl py-2 font-semibold'>Total users: 9</h1>
        </div> 
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-[#D1A054] text-white'>
      <tr>
        <th>Scrial</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {user?.length  ? user?.map((d,index)=> {
            const {_id,name,email,role}=d
            return <tr key={_id}>
            <th>{index+1}</th>
            <th>{name}</th>
            <th>{email}</th>
            <th className='cursor-pointer' >
             {role === 'user'  ? <span onClick={()=>handleadmin('admin',_id)} className='text-[white] bg-[#2200ff] px-2 rounded-[4px]'>User</span> :<span onClick={()=>handleadmin('user',_id)} className='text-[white] bg-[#3ef37a] px-2 rounded-[4px]'>Admin</span> }    
            </th>
            <th onClick={()=>handledelete(_id)}>
              <MdDeleteForever className='bg-[#e93939]  rounded-sm py-[2px] cursor-pointer'  size={25} color='white'/>
            </th>
          </tr> 
        }):<tr className='text-base text-[red] font-semibold'><td>❌ Not database user</td></tr>}
    

    </tbody>

  </table>

</div>
  </div>
    );
};

export default Alluser;