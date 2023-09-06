import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl bg-white m-auto md:flex">
        <div className="max-w-sm shadow overflow-hidden mr-8 p-5">
          <img
            src={productDisplay?.image}
            alt="..."
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {productDisplay?.name}
          </h3>
          <p className="text-slate-500 font-medium text-2xl">
            {productDisplay?.category}
          </p>
          <p className="font-bold md:text-2xl">
            <span>{productDisplay?.price} </span>
            <span className="text-red-500"> zł</span> /
            <span className="font-normal">
              &nbsp;za sztukę (wynajem na jedną imprezę)
            </span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleBuy}
              className="bg-orange-500 py-1 mb-3 mt-2 rounded text-white transition-all hover:bg-orange-600 min-w-[100px]"
            >
              Wynajmij
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-orange-500 py-1 mb-3 mt-2 rounded text-white transition-all hover:bg-orange-600 min-w-[100px]"
            >
              Dodaj
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Opis : </p>
            <p>{productDisplay?.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Powiązany produkt do wynajęcia"} />
    </div>
  );
};

export default Menu;
