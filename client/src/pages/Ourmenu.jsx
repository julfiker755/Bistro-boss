import React, { useEffect, useState } from 'react';
import Containerr from '../shared/Containerr';
import banner3 from '../assets/menu/banner3.jpg'
import banner4 from '../assets/menu/dessert-bg.jpeg'
import banner5 from '../assets/menu/pizza-bg.jpg'
import banner6 from '../assets/menu/salad-bg.jpg'
import banner7 from '../assets/menu/soup-bg.jpg'
import Menubanner from '../components/Menubanner';
import UseIncaptor from '../Hooks/UseIncaptor';
import Menucatagory from '../components/Menucatagory';
import useMenu from '../Hooks/useMenu';
import Loading from '../Authentication/Loading';


const Ourmenu = () => {
    const {food,isPending}=useMenu()

      if(isPending){
        return <Loading></Loading>
      }

    const offer=food.filter(menu=>menu.category === "offered")
    const dessert=food.filter(menu=>menu.category === "dessert")
    const pizza=food.filter(menu=>menu.category === "pizza")
    const salad=food.filter(menu=>menu.category === "salad")
    const soup=food.filter(menu=>menu.category === "soup")


    return (
        <Containerr>
        <div>
            {/*  offered */}
            <Menubanner title="OUR MENU" discripation="Would you like to try a dish?" img={banner3}></Menubanner>
            <Menucatagory menu={offer} title="offered" offer={offer}></Menucatagory>
            {/* dessert*/}
            <Menubanner title="DESSERTS" discripation="Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={banner4}></Menubanner>
            <Menucatagory menu={dessert} title="dessert" ></Menucatagory>
            {/* pizza*/}
            <Menubanner title="PIZZA" discripation="Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={banner5}></Menubanner>
            <Menucatagory menu={pizza} title="pizza"></Menucatagory>
            {/* salad*/}
            <Menubanner title="SALAD" discripation="Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={banner6}></Menubanner>
            <Menucatagory menu={salad} title="salad"></Menucatagory>
            {/* soup*/}
            <Menubanner title="SOUPS" discripation="Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={banner7}></Menubanner>
            <Menucatagory menu={soup} title="soup"></Menucatagory>
        </div>
        </Containerr>
    );
};

export default Ourmenu;