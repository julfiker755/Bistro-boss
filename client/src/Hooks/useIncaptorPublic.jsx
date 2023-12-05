import axios from "axios";

const axiosinstance = axios.create({
  baseURL:'https://bistro-boss-sable.vercel.app',
});

const useIncaptorPublic= () => {
  return axiosinstance
};





export default useIncaptorPublic;