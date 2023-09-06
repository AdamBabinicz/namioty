import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem, increaseQty } from "../redux/productSlice";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="w-full min-w-[200px] max-w-[260px] transition-all bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col m-auto">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="h-36 flex flex-col justify-center items-center">
              <img src={image} alt="..." className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600 text-lg max-2xl:text-xs mt-4 whitespace-nowrap">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              <span className="">{price} </span>
              <span className="text-red-500"> zł</span> /
              <span className="font-normal">
                &nbsp;za sztukę (wynajem na jedną imprezę)
              </span>
            </p>
          </Link>
          <button
            className="bg-orange-500 py-1 mb-3 mt-2 rounded text-white transition-all hover:bg-orange-600 w-full"
            onClick={handleAddCartProduct}
          >
            Wynajmij
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
