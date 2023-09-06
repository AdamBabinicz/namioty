import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
      console.log(dataRes);

      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      console.log(userData);
    } else {
      alert("Proszę wypełnić wymagane pola 😐");
    }
  };

  return (
    <div className="p-3 md:4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h2 className="text-center text-2xl font-bold">Zarejestruj się</h2> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} alt="..." className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />
          <label htmlFor="password">Hasło</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 mb-2 w-full bg-slate-200 rounded outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex items-center text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            // type="submit"
            className="w-full max-w-[170px] m-auto  bg-blue-500 transition-all hover:bg-blue-600 cursor-pointer text-white text-xl font-medium py-1  rounded-full mt-4"
          >
            Zaloguj się
          </button>
        </form>
        <p className="left-site text-sm mt-2">
          Nie masz konta?&nbsp;
          <Link
            to={"/signup"}
            className="text-blue-500 underline font-semibold"
          >
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
