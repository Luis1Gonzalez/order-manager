import React from "react";
import Image from "next/image";
import instagram from "@/assets/instagram-black.svg";
import facebook from "@/assets/facebook-black.svg";
import whatsapp from "@/assets/whatsapp-black.svg";
import mail from "@/assets/mail-black.svg";
import maps from "@/assets/maps-black.svg";
import Link from "next/link";
import dev from "@/assets/dev.svg";
import admin from "@/assets/admin.svg";
import useControl from "@/hooks/useControlProvider";

const Footer = () => {

const { accessAdminAllowed, setAccessAdminAllowed } = useControl()

  return (
    <div className=" bg-gray-200 p-3 w-100 py-5 flex flex-col gap-5">
      <div className="mt-2 text-center">
        <h1 className="tittle text-gray-600 text-2xl font-bold tracking-widest text-center">
          La Despensa de las Delicias
        </h1>

        <p>Todos los derechos reservados &copy; 2024</p>
      </div>

      <div className="flex justify-evenly items-center lg:text-xl">
        <div className="flex gap-3 items-center">
          <Image
            src={admin}
            alt="logo admin"
            className="w-[30px] sm:w-[40px]"
          />
          <button
          onClick={() => setAccessAdminAllowed(true)}
          className="text-blue-500 font-bold italic">
            Administración
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <Image src={dev} alt="logo dev" className="w-[30px] sm:w-[40px]" />
          <div>
            <p className="">Desarrollado por:</p>

            <Link
              href="http://luis1gonzalez.com"
              target="_blank"
              className="text-blue-500 font-bold italic"
            >
              luis1gonzalez.com
            </Link>
          </div>
        </div>
      </div>

      <div className="px-3 my-3 flex items-center justify-center gap-3">
        <div className="w-0 lg:w-1/3 border border-b-gray-600"></div>
        <div className="w-full lg:w-1/3 py-2 flex justify-evenly">
          <Image src={instagram} alt="logo instagram" className="w-[35px]" />
          <Image src={facebook} alt="logo facebook" className="w-[35px]" />
          <Image src={whatsapp} alt="logo whatsapp" className="w-[35px]" />
          <Image src={mail} alt="logo email" className="w-[35px]" />
          <Image src={maps} alt="logo google maps" className="w-[35px]" />
        </div>
        <div className="w-0 lg:w-1/3 border border-b-gray-600"></div>
      </div>
    </div>
  );
};

export default Footer;
