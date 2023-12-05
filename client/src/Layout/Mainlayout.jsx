import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../shared/header';
import Footer from '../shared/Footer';

const Mainlayout = () => {
    return (
       <div>
         <Header></Header>
         <Outlet></Outlet>
         <Footer></Footer>
       </div>
    );
};

export default Mainlayout;