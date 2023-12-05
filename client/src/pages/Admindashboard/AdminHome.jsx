import React from 'react';
import useAuthState from '../../Hooks/useAuthState';

const AdminHome = () => {
    const {user} =useAuthState()
    return (
        <div>
        <h1 className='text-xl font-semibold text-[#ff00a2]'>Hi, Welcome {user.displayName ? user?.displayName : 'Back'},</h1>
            <h1>Admin Home</h1>
        </div>
    );
};

export default AdminHome;