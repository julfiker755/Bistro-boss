import {useQuery} from '@tanstack/react-query'
import UseIncaptor from './UseIncaptor'
import useAuthState from './useAuthState'

const useCarts=()=>{
    const  axiosincaptor=UseIncaptor()
    const {user}=useAuthState()
    const {data:cart=[],isPending,refetch} = useQuery({
  queryKey: ['cartid',user?.email],
  queryFn: async () => {
  const {data}=await axiosincaptor.get(`/carts?email=${user?.email}`)
  return data
  }
})
 
return {cart,isPending,refetch}
}

export default useCarts;