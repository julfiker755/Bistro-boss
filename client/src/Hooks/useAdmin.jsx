import React from 'react';
import useAuthState from './useAuthState';
import { useQuery } from '@tanstack/react-query';
import UseIncaptor from './UseIncaptor';

const useAdmin = () => {
   const {user,loading}=useAuthState()
   const axiosincaptor=UseIncaptor()
   const {data:admin,isPending}=useQuery({
    queryKey:['isadmin'],
    enabled:!loading,
    queryFn:async()=>{
        const {data}=await axiosincaptor.get(`/user/admin/${user?.email}`)
        return data
    }
   })
   return [admin,isPending]
};

export default useAdmin;