import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
import useAuthState from '../Hooks/useAuthState';
import { FaFacebook } from "react-icons/fa6";
import UseIncaptor from '../Hooks/UseIncaptor';


const Login = () => {
    const [captcha,setcaptcha]=useState('')
    const axiosincaptor=UseIncaptor()
    const [show,setshow]=useState(true)
    const { register, handleSubmit,formState: { errors } } = useForm();
    const {facebooklogin,signinUser}=useAuthState()
    const location=useLocation()
    const navigate=useNavigate()
    let from = location.state?.from?.pathname || "/";
    
    const onSubmit = data => {
        signinUser(data.email,data.password)
        .then(result=>{
            const user=result.user
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Login user Successfull',
                showConfirmButton: false,
                timer: 1500
              });
            user && navigate(from, { replace: true })
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


    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])

    useEffect(()=>{
        if(captcha.length === 6){
            if (validateCaptcha(captcha)==true) {
                setshow(false)
            }
            else {
                setshow(true)
            }
         }else{
          setshow(true)
         }
    },[captcha])
    
    // facebooklogin-------------------------
    const hanldefacebook=(media)=>{
      media()
      .then(async(result)=>{
        const user=result.user
        const userinfo={
          name:user.displayName,
          email:user.email,
          role:'user',
        }
        const {data:datainfo}=await axiosincaptor.post(`/users`,userinfo)
        if(datainfo?.insertedId || datainfo?.message){
          navigate(from,{ replace: true })
          Swal.fire({
            position: "center",
            icon: "success",
            title: 'Login Successfull',
            showConfirmButton: false,
            timer: 1500
          });
         
        }
      })
     
    }
  

    return (
        <div>
           <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card flex-shrink-0 w-full max-w-sm py-4 md:w-[500px] shadow-2xl bg-base-100">
        <h1 className='text-3xl text-center font-bold'>Please Login</h1>
      <form className="card-body py-[12px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email"  {...register("email",{ required: true })}className="input input-bordered" />
          {errors.email && <span className='text-[red]'>This field is Email required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text"  {...register("password",{ required: true })} placeholder="password" className="input input-bordered" />
          {errors.password && <span className='text-[red]'>This field is Email required</span>}
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input type="text" onChange={(e)=>setcaptcha(e.target.value)} placeholder="captcha" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button disabled={show} className="btn btn-primary capitalize">Login</button>
        </div>
      </form>
      <div className="divider !m-0">OR</div>
       <div className='mt-2 mb-2 w-[300px] m-auto'>
       <button onClick={()=>hanldefacebook(facebooklogin)} type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"><div className="flex items-center justify-center"><FaFacebook/><span className="ml-4">Log in with Facebook</span></div></button>
       </div>
       <h1 className='text-center'>Don't have an account yet?<Link className='text-[#001eff]' to="/register">Register</Link></h1>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;