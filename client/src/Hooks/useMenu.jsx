import UseIncaptor from './UseIncaptor';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    const axiosincaptor=UseIncaptor()
    const {data:food=[],isPending,refetch}=useQuery({
        queryKey:['menu'],
        queryFn:async()=>{
            const {data}=await axiosincaptor.get('/menu')
            return data
        }
    })
    return {food,isPending,refetch}
};

export default useMenu;