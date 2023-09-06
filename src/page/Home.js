import React, { useEffect, useRef, useState } from "react";
import umowa from "../assets/contract.png";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import image from "../assets/14.jpg";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext, GrProductHunt } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0, 3);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "inne",
    []
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Umowa</p>
            <img src={umowa} className="h-7" />
          </div>
          <h2 className="text-4xl font-bold md:text-7xl py-3">
            Szybki wynajem
            <span className="text-blue-500"> namiotów imprezowych</span>
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit,
            necessitatibus id labore odit distinctio eum quos quam ipsum
            maiores! Eos rerum sit nobis, illo doloribus qui. Laborum itaque
            quas, dolorum aliquam impedit maiores pariatur? Velit recusandae
            corrupti atque ut repudiandae?
          </p>
          <button className="font-bold bg-blue-500 text-slate-200 px-4 py-2 rounded-md">
            Zamów teraz!
          </button>
        </div>

        <div className="md:w-1/2 grid grid-flow-row md:grid-flow-col gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard
                    key={index + "loading"}
                    loading={"ładuje się ..."}
                  />
                );
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Wynajmujemy także:
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 transition-all hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 transition-all hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "inne"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature
                  loading="ładuje się ..."
                  key={index + "cartLoading"}
                />
              ))}
        </div>
      </div>
      <AllProduct heading={"Nasza oferta"} />
    </div>
  );
};

export default Home;
