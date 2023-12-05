
import UseIncaptor from './UseIncaptor';
import { useQuery } from '@tanstack/react-query';

const useAlluserget = () => {
    const  axiosincaptor=UseIncaptor()
    const {data:user=[],isPending,refetch} = useQuery({
  queryKey: ['userid'],
  queryFn: async () => {
  const {data}=await axiosincaptor.get(`/user`)
  return data
  }
})
 
return {user,isPending,refetch}
};

export default useAlluserget;