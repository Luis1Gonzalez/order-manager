import React from "react";
import instagram from "@/assets/instagram.svg";
import facebook from "@/assets/facebook.svg";
import whatsapp from "@/assets/whatsapp.svg";
import call from "@/assets/call.svg";
import Image from "next/image";
import direccion from "@/assets/direccion.jpg";
import useControl from "@/hooks/useControlProvider";
import qr from '@/assets/qr.jpeg'

const SideBar = () => {

const { setIsOpenSignIn } = useControl()

  return (
    <div className="bg-gray-200 h-[100%] rounded-2xl pt-5">
    <div className="flex flex-col gap-12 justify-center items-center">
      <button
      onClick={() => setIsOpenSignIn(true)}
      className="flex items-center justify-center bg-sky-400 h-14 hover:bg-sky-200 hover:text-black rounded-xl shadow-2xl font-semibold text-xl text-white drop-shadow-md w-[95%]"
      >
        Haz tu Pedido
      </button>

      <div className="flex flex-col gap-6">
        <p className="text-center text-2xl xl:text-xl font-semibold">
          Nuestras Redes Sociales
        </p>
        <div>
          <div className="flex justify-evenly">
            <Image
              className="social_shadow w-[3rem] h-[3rem] xl:w-[2rem] xl:h-[2rem]"
              src={instagram}
              alt="instagram"
            />

            <Image
              className="social_shadow w-[3rem] h-[3rem] xl:w-[2rem] xl:h-[2rem]"
              src={facebook}
              alt="facebook"
            />

            <Image
              className="social_shadow w-[3rem] h-[3rem] xl:w-[2rem] xl:h-[2rem]"
              src={whatsapp}
              alt="whatsapp"
            />

              <Image
                className="social_shadow w-[3rem] h-[3rem] xl:w-[2rem] xl:h-[2rem]"
                src={call}
                alt="call"
              />

          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-center text-2xl xl:text-xl font-semibold">
          Ubicación
        </p>
        <Image className="cursor-pointer" src={direccion} alt="dirección" />
      </div>

<Image 
src={qr}
alt="codigo qr para acceder a la pagina como suario."
width={230}
height={230}
className="mb-6 shadow-xl"
/>

    </div>
    </div>
  );
};

export default SideBar;
