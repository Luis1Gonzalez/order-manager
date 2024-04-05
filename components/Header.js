import React from "react";
import logo from "../assets/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-[100%] py-3 gap-3 sm:flex-row sm:justify-evenly text-lg sm:text-2xl flex-wrap lg:text-3xl xl:text-4xl">
        <Image
          className="w-[10rem] h-[10rem]"
          src={logo}
          alt="logo de despensa de las delicias"
        />

        <h1 className="tittle text-yellow-300 font-bold tracking-widest">
          Carneceria de Torrero
        </h1>
      </div>

    </>
  );
};

export default Header;
