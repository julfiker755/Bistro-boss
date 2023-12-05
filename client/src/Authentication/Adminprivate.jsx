import React from 'react';
import useAuthState from '../Hooks/useAuthState';
import useAdmin from '../Hooks/useAdmin';
import Loading from './Loading';
import { Navigate, useLocation } from 'react-router-dom';

const Adminprivate = ({children}) => {
    const { user, loading } = useAuthState()
    const [admin,isPending]=useAdmin()
    let location = useLocation();
    
    if (loading || isPending) {
        return  <Loading></Loading>
     }
    
     if (user && admin?.isAdmin === "admin") {
         return children
     }
     return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default Adminprivate;