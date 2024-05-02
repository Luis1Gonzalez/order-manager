import React from "react";
import logo from "../assets/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-[100%] py-3 gap-3 sm:flex-row sm:justify-evenly text-lg sm:text-2xl flex-wrap lg:text-3xl xl:text-4xl">
        <Image
          width={170}
          height={170}
          src={logo}
          alt="logo de despensa de las delicias"
        />

        <h1 className="tittle text-yellow-300 font-bold tracking-widest">
          El Bodegón de las Carnes
        </h1>
      </div>

    </>
  );
};

export default Header;
