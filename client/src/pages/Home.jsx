import React from 'react';
import Banner from '../components/Banner';
import Online from '../components/Online';
import Bistro from '../components/Bistro';
import Menu from '../components/Menu';
import Contact from '../components/Contact';
import Chef from '../components/Chef';
import Distomorial from '../components/Distomorial';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Online></Online>
            <Bistro></Bistro>
            <Menu></Menu>
            <Contact></Contact>
            <Chef></Chef>
            <Distomorial></Distomorial>
        </div>
    );
};

export default Home;