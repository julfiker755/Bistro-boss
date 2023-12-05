import { useQuery } from '@tanstack/react-query';
import UseIncaptor from './UseIncaptor';
import useAuthState from './useAuthState';

const usePayment = () => {
    const axiosincaptor=UseIncaptor()
    const {user}=useAuthState()
   const {data:moneny,isPending,refetch}=useQuery({
    queryKey:['paymentcart',user?.email],
    queryFn:async()=>{
        const {data}=await axiosincaptor.get(`payment?email=${user?.email}`)
        return data
    }
   })
   return {moneny,isPending,refetch}
};

export default usePayment;