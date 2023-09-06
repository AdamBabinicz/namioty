import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();

      console.log(fetchRes);
      toast(fetchRes.message);
      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Wypełnij wszystkie pola! 😠");
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Nazwa produktu</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
        />
        <label htmlFor="category">Kategoria</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Wybierz kategorię:</option>
          <option value={"namioty"}>Namioty</option>
          <option value={"stoły"}>Stoły</option>
          <option value={"krzesła"}>Krzesła</option>
          <option value={"inne"}>Inne</option>
          {/* <option value={"inne"}>Urządzenie do waty cukrowej</option>
          <option value={"inne"}>Urządzenie do popcornu</option> */}
        </select>
        <label htmlFor="image">
          Zdjęcie
          <div className="h-40 w-full bg-slate-200 my-3 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} alt="..." className="h-full" />
            ) : (
              <span className="text-5xl">
                <AiOutlineCloudUpload />
              </span>
            )}
            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        <label htmlFor="price" className="my-1">
          Cena wynajmu
        </label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />
        <label htmlFor="description">Opis</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>
        <button className="bg-slate-400 transition-all hover:bg-slate-300 text-white text-lg font-medium my-2 drop-shadow">
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
