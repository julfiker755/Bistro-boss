import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseIncaptor from '../../Hooks/UseIncaptor';
import Subtitle from '../../shared/Subtitle';
import { useForm } from "react-hook-form";
import useMenu from '../../Hooks/useMenu';
import Loading from '../../Authentication/Loading';
import Swal from 'sweetalert2'

const Itemupdate = () => {
    const [fooditemloding,setfooditemloading]=useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {updateid}=useParams()
    const axiosincaptor=UseIncaptor()
    const {food,isPending}=useMenu()
    const navigate=useNavigate()
   

     if(isPending){
        return <Loading></Loading>
     }

   

    // handle update
    const onSubmit = async(data) =>{
        setfooditemloading(true)
         const  {data:updatedata}=await axiosincaptor.put(`/updatemenu/${updateid}`,data)
         if(updatedata?.modifiedCount > 0){
            setfooditemloading(false)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your food item update successfull",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                navigate('/dashboard/mangeitems');
              })
             
         }
        }
    
  

    return (
        <div>
            <div><Subtitle heading={"-----update checkout-----"} subheading={"UPDATE ITEM"}></Subtitle></div>
            <div>
                <section className="max-w-4xl p-6 mx-auto text-black rounded-md bg-[#f3f3f3b9]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         {/* map edit item for side */}
                        {food.map(item=> item._id === updateid && <div key={item._id} className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div className='col-span-1 sm:col-span-2'>
                                <label className="text-gray-700" htmlFor="username">Recipe name
                                </label>
                                <input defaultValue={item.name}
                                     {...register("name",{ required: true })}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                                 
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="emailAddress">Category</label>
                                <select defaultValue={item.category} {...register("category",{ required: true })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                    <option value="drinks">drinks</option>
                                    <option value="dessert">dessert</option>
                                    <option value="pizza">pizza</option>
                                    <option value="salad">salad</option>
                                    <option value="soup">soup</option>
                                </select>
                                

                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="password">Price</label>
                                <input
                                     defaultValue={item.price}
                                     {...register("price",{ required: true,})}
                                    type="number"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                                
                            </div>

                            <div className='col-span-1 sm:col-span-2'>
                                <label className="text-gray-700" htmlFor="passwordConfirmation">Recipe Details</label>
                                <textarea
                                 defaultValue={item.recipe}
                                {...register("recipe",{ required: true })}
                                 className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'></textarea>
                                
                            </div>
                          
                            

                            
                        </div>)}

                       
                

                        <div className="flex justify-center md:justify-start mt-6">
                        
                        
                        {fooditemloding ?  <button disabled className="px-8 py-2.5 flex items-center gap-1 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"><span className="loading w-[15px] loading-spinner text-error"></span>Updating. . . .</button>: <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update item</button>}   
                           
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Itemupdate;