import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Containerr from '../shared/Containerr';
import { useParams } from 'react-router-dom';
import Cover from '../components/Ourshop/Cover';
import Shopca from '../components/Ourshop/Shopca';
import './Ourshop.css'
import useMenu from '../Hooks/useMenu';
import Loading from '../Authentication/Loading';


const Ourshop = () => {
    const {food,isPending}=useMenu()
    const {category}=useParams()
    const catagoris=["salad","pizza","soup","dessert","drinks"]
    const intitalindex=catagoris.indexOf(category)
    const [tabIndex, setTabIndex] = useState(intitalindex);
    

     if(isPending){
        return <Loading></Loading>
     }
   

    const drinks=food.filter(menu=>menu.category === "drinks")
    const dessert=food.filter(menu=>menu.category === "dessert")
    const pizza=food.filter(menu=>menu.category === "pizza")
    const salad=food.filter(menu=>menu.category === "salad")
    const soup=food.filter(menu=>menu.category === "soup")


    return (
        <Containerr>
            <div>
                <Cover></Cover>
            </div>
            <div>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="flex justify-center py-3 flex-wrap gap-2">
                    <Tab>Salad</Tab>
                    <Tab>pizza</Tab>
                    <Tab>soaups</Tab>
                    <Tab>desserts</Tab>
                    <Tab>drinks</Tab>
                    </TabList>

                <TabPanel>
                 <Shopca order={salad}></Shopca>
                </TabPanel>
                <TabPanel>
                <Shopca order={pizza}></Shopca>
                </TabPanel>
                <TabPanel>
                <Shopca order={soup}></Shopca>
                </TabPanel>
                <TabPanel>
                <Shopca order={dessert}></Shopca>
                </TabPanel>
                <TabPanel>
                <Shopca order={drinks}></Shopca>
                </TabPanel>
                </Tabs>
            </div>
        </Containerr>
    );
};

export default Ourshop;