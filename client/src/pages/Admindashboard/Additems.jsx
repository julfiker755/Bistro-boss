import React, { useState } from 'react';
import Subtitle from '../../shared/Subtitle';
import { useForm } from "react-hook-form";
import useIncaptorPublic from '../../Hooks/useIncaptorPublic';
import UseIncaptor from '../../Hooks/UseIncaptor';
import Swal from 'sweetalert2'

const Additems = () => {
    const [fooditemloding,setfooditemloading]=useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const incaptorpublic=useIncaptorPublic()
    const IMAGE_HOSTING_KEY="f1018e861f3a8e441b01d6ab494eed0d"
    const IMAGE_HOTING_API=`https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`
    const axiosincaptor=UseIncaptor()
   
    // menu items all set data for my webistes
  const onSubmit = async(data) =>{
    setfooditemloading(true)
    const imageifle={image:data.image[0]}
    const res=await incaptorpublic.post(IMAGE_HOTING_API,imageifle,{
        headers: {
            "content-type": "multipart/form-data",
          }
    })
    if(res?.data?.data?.display_url){
        setfooditemloading(false)
        const fooditems={
            name:data.name,
            recipe:data.recipe,
            image:res?.data?.data?.display_url,
            image_delete_url:res?.data.data?.delete_url,
            category:data.category,
            price:parseFloat(data?.price)
        }
        // insertdata for website
        axiosincaptor.post('/menu',fooditems)
        .then(res=>{
            if(res.data.insertedId){
                // rest form 
                reset()

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Food items add Successfull",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    
  };

    return (
        <div>
            <Subtitle heading={"---What's new?---"} subheading={"ADD AN ITEM"}></Subtitle>
            <div>
                <section className="max-w-4xl p-6 mx-auto text-black rounded-md bg-[#f3f3f3b9]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div className='col-span-1 sm:col-span-2'>
                                <label className="text-gray-700" htmlFor="username">Recipe name
                                </label>
                                <input
                                     {...register("name",{ required: true })}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                                 {errors.name && <span className='text-[red] text-xs'>This field name required</span>}
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="emailAddress">Category</label>
                                <select {...register("category",{ required: true })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                <option value="" disabled selected>Select Your Category</option>
                                    <option value="drinks">drinks</option>
                                    <option value="dessert">dessert</option>
                                    <option value="pizza">pizza</option>
                                    <option value="salad">salad</option>
                                    <option value="soup">soup</option>
                                </select>
                                {errors.category && <span className='text-[red] text-xs'>This field category required</span>}

                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="password">Price</label>
                                <input
                                     {...register("price",{ required: true,
                                        pattern: {
                                        value: /^\d+(\.\d{1,2})?$/,
                                        message: ',Number type'
                                      } })}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                                {errors.price && <span className='text-[red] text-xs'>This field price required</span>}
                                {errors.price && <span className='text-[#5dab2f] text-xs'>{errors.price?.message}</span>}
                            </div>

                            <div className='col-span-1 sm:col-span-2'>
                                <label className="text-gray-700" htmlFor="passwordConfirmation">Recipe Details</label>
                                <textarea
                                {...register("recipe",{ required: true })}
                                 className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'></textarea>
                                 {errors.recipe && <span className='text-[red] text-xs'>This field recipe required</span>}
                            </div>
                        </div>
                        <div className='my-4'>
                            <input  {...register("image",{ required: true })}  type="file" className="block w-full max-w-xs px-3 py-1 mt-0 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200  file:text-sm file:px-4 file:py-2 file:border-none file:rounded-md   dark:text-gray-300 placeholder-gray-400/70  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 " />
                            {errors.image && <span className='text-[red] text-xs my-1'>This field image required</span>}
                        </div>


                        <div className="flex justify-center md:justify-start mt-6">
                        
                        
                        {fooditemloding ?  <button disabled className="px-8 py-2.5 flex items-center gap-1 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"><span className="loading w-[15px] loading-spinner text-error"></span>Waiting. . . .</button>: <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add item</button>}   
                           
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Additems;