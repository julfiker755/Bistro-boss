import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuthState from '../Hooks/useAuthState';
import Swal from 'sweetalert2'
import UseIncaptor from '../Hooks/UseIncaptor';


const Register= () => {
    const {createUser,user,Updateprfile}=useAuthState()
    const axiosincaptor=UseIncaptor()
    const navigate=useNavigate()
    const { register, handleSubmit,formState: { errors } } = useForm();
  const onSubmit = data =>{
    createUser(data.email,data.password)
    .then(result=>{
        const user=result.user
        Updateprfile(data.name,data.image)
        .then(async()=>{
          const userinfo={
            name:data.name,
            email:data.email,
            role:'user',
          }
          // all user collaction for database for my site
            const {data:datainfo}=await axiosincaptor.put(`/user/${data.email}`,userinfo)
            console.log(datainfo)
           
            
            if(datainfo?.upsertedId  || datainfo?.matchedCount > 0 ){
              Swal.fire({
                position: "center",
                icon: "success",
                title: 'Register Successfull',
                showConfirmButton: false,
                timer: 1500
              });
              navigate("/")
            }
           
        })
        
    }).catch(error=>{
        Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500
          });
    })
  }



  


    
    return (
        <div>
           <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card flex-shrink-0 w-full max-w-sm py-4 md:w-[500px] shadow-2xl bg-base-100">
        <h1 className='text-3xl text-center font-bold'>Please Register</h1>
      <form className="card-body py-[12px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" {...register("name",{ required: true })} className="input input-bordered" />
          {errors.name && <span className='text-[red] py-[2px]'>Enter Your Name</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="text" placeholder="Image" {...register("image",{ required: true })} className="input input-bordered"/>
          {errors.image && <span className='text-[red] py-[2px]'>Enter Your image</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" {...register("email",{ required: true })} className="input input-bordered" />
          {errors.email && <span className='text-[red] py-[2px]'>Enter Your Email</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" {...register("password",{ 
            required: true, minLength: 6 , 
            maxLength: 20, 
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
            })} placeholder="password" className="input input-bordered" />
          {errors.password?.type === 'required' && <p className='text-[red]'>Password is required</p>}
          {errors.password?.type === 'minLength' && <p className='text-[red]' >Password Must be 6 charactar</p>}
          {errors.password?.type === 'maxLength' && <p className="text-[red]">Password must be less than 20 characters</p>}
           {errors.password?.type === 'pattern' && <p className="text-[red]">Password must have one Uppercase one lower case, one number and one special character.</p>}
        </div>

        <div className="form-control mt-6">
          <button  className="btn btn-primary capitalize">Register</button>
        </div>
      </form>
      <h1 className='text-center'>Already have an account?<Link className='text-[#001eff]' to="/login">Login</Link></h1>
    </div>
  </div>
</div>
        </div>
    );
};



export default Register;