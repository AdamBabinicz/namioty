import React from "react";
import { GoFilter } from "react-icons/go";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl p-5 rounded-full cursor-pointer ${
          isActive ? "bg-orange-300" : "bg-orange-500 text-white"
        }`}
      >
        <GoFilter />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
