import useControl from "@/hooks/useControlProvider";
import { useRouter } from "next/router";
import React from "react";

const CompTicketUp = () => {
  const router = useRouter();
  const { seeTicket, setSeeTicket, setIsOpenTicket } = useControl();

  return (
    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full flex flex-col gap-7 items-center">
      <div
        as="h3"
        className="text-2xl text-center leading-6 font-bold text-green-500 pt-3"
      >
        Pedido Enviado con Exito
      </div>

      <div className=" mb-5 flex flex-col sm:flex-row w-full sm:w-[100%] items-center justify-center gap-3">
        <button
          onClick={() => setSeeTicket(true)}
          className="w-[80%] border border-green-500 hover:bg-green-100 text-center text-md text-gray-600 font-bold p-2 rounded-md"
        >
          Ticket
        </button>

        <button
          onClick={() => {
            setIsOpenTicket(false);
            router.push("/");
          }}
          className="w-[80%] border border-red-500 hover:bg-red-100 text-center text-md text-gray-600 font-bold p-2 rounded-md"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default CompTicketUp;
