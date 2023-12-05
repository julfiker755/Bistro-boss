import React from 'react';
import Subtitle from '../../shared/Subtitle';
import usePayment from '../../Hooks/usePayment';
import Loading from '../../Authentication/Loading';


const Paymenthistory = () => {
    const {moneny,isPending}=usePayment()
    if(isPending){
        return <Loading></Loading>
    }



    return (
        <div>
        <div>
           <Subtitle heading={"---At a Glance!---"} subheading={"PAYMENT HISTORY"}></Subtitle>
        </div>
<div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead className='bg-[#D1A054] text-white'>
  <tr>
    <th>Transaction id</th>
    <th>Email</th>
    <th>Total Price</th>
    <th>Paymenet Date</th>
    <th>Stadus</th>
  </tr>
</thead>
<tbody>
    {moneny?.length ? moneny?.map(d=>{
        const {date,price,stadus,email,trasitionid}=d
     return <tr key={d._id}>
        <td>{trasitionid}</td>
        <td>{email}</td>
        <td>{price}</td>
        <td>{date}</td>
        <td><span className='text-[#dc6161] font-semibold bg-[#26ff00] px-2 py-1 rounded-md'>{stadus}</span></td>
      </tr>
    }): <tr className='text-base text-[red] font-semibold'><td>❌ No paymet history</td></tr> }

 



</tbody>

</table>
{/* -----------ResponsivePagination-----------*/}

</div>
    </div>
    );
};

export default Paymenthistory;