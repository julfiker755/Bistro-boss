import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Mainlayout from '../Layout/Mainlayout';
import Home from '../pages/Home';
import Ourmenu from '../pages/Ourmenu';
import Ourshop from '../pages/Ourshop';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import Dashboard from '../Layout/Dashboard';
import Userhome from '../pages/Userdashboard/Userhome';
import Mycart from '../pages/Userdashboard/Mycart';
import Private from '../Authentication/Private';
import Alluser from '../pages/Admindashboard/Alluser';
import Additems from '../pages/Admindashboard/Additems';
import Adminprivate from '../Authentication/Adminprivate';
import Mangeitems from '../pages/Admindashboard/Mangeitems';
import Itemupdate from '../pages/Admindashboard/Itemupdate';
import Payment from '../pages/Userdashboard/Payment';
import Paymenthistory from '../pages/Userdashboard/Paymenthistory';
import AdminHome from '../pages/Admindashboard/AdminHome';


const routes = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout></Mainlayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },{
                path:'/menu',
                element:<Ourmenu></Ourmenu>
            },{
                path:'/ourshop/:category',
                element:<Ourshop></Ourshop>
            }
        ]

    },{
        path:'/login',
        element:<Login></Login>
    },{
        path:'/register',
        element:<Register></Register>
    },{
        path:'/dashboard',
        element:<Private><Dashboard></Dashboard></Private>,
        children:[
            // normal user route
            {
                 path:'userhome',
                 element:<Userhome></Userhome>
            },{
                path:'mycart',
                element:<Mycart></Mycart>
            },{
                path:'payment',
                element:<Payment></Payment>

            },{
                path:'paymenthistory',
                element:<Paymenthistory></Paymenthistory>

            },
            // admin route
            {
              path:'adminhome',
              element:<Adminprivate><AdminHome></AdminHome></Adminprivate>
            },
            {
                path:'alluser', //alluser backend private use [varifyadmin file a ]
                element:<Alluser></Alluser>
            },
            // frontend varify admin route
            {
                path:'additems',
                element:<Adminprivate><Additems></Additems></Adminprivate>
            },{
                path:'mangeitems',
                element:<Adminprivate><Mangeitems></Mangeitems></Adminprivate>
            },{
                path:'itemupdate/:updateid',
                element:<Adminprivate><Itemupdate></Itemupdate></Adminprivate>
            }
        ]
    }
])

export default routes;