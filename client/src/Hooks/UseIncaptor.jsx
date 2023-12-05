import axios from "axios";
import useAuthState from "./useAuthState";
import {useNavigate} from "react-router-dom";



const axiosinstance = axios.create({
  baseURL:'https://bistro-boss-sable.vercel.app',
  // headers: {
  //   authorization: `Bearer ${localStorage.getItem('access-token')}`,
  // }

});

const UseIncaptor= () => {
  const { logOut,user } =useAuthState()
  const navigate=useNavigate()



  axiosinstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});


axiosinstance.interceptors.response.use(function (response) {
    return response;
}, async (error) => {
    // console.log('error',error)
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
        await logOut();
         navigate("/login")
    }
    return Promise.reject(error);
})


  return axiosinstance
};



export default UseIncaptor;