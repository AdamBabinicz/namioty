import React, { useState } from "react";
import logo from "../assets/1.png";
import { Link } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { GiBarracksTent } from "react-icons/gi";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userData.email);

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Wylogowanie zakończyło się sokcesem! 🙂");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div>
            <GiBarracksTent className="h-full text-5xl text-white bg-slate-400 p-1 rounded-full" />
          </div>
        </Link>
        <div className="flex item-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Start</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>O&nbsp;firmie</Link>
            <Link to={"contact"}>Kontakt</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <AiOutlineShoppingCart />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-xs text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt="..."
                  className="h-full w-full object-cover"
                />
              ) : (
                <LiaUserCircleSolid />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Nowy produkt
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-blue-500"
                    onClick={handleLogout}
                  >
                    Wyloguj się ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Zaloguj się
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Start
                  </Link>
                  <Link to={"menu"} className="px-2 py-1">
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    O&nbsp;firmie
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Kontakt
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
