import useControl from "@/hooks/useControlProvider";
import React, { useEffect } from "react";
import Loading from "./Loading";
import Image from "next/image";
import deletex from "@/assets/delete.svg";
import Confirm from "./ModalConfirm";

const CompClients = () => {
  const { ourClients, setOurClients, setIsOpenNewClient, obtaingClients, obtaingClientToDelete, setObtaingClientToDelete, msg, setMsg, setIsOpenConfirm } =
    useControl();

  useEffect(() => {
    const showClientsFunc = () => {
      obtaingClients();
    };
    showClientsFunc();
  }, []);

  const getClientDelete = (phone) => {
    const selectingClient = ourClients.filter((filtered) => filtered.phone === phone)
    setObtaingClientToDelete(selectingClient)
    setIsOpenConfirm(true)
    setMsg('¿Desea Eliminar este Cliente?')
  }
  getClientDelete


  return (
    <div className="my-5 px-5">
      {!ourClients ? (
        <Loading />
      ) : (
        <>
          <button
            onClick={() => setIsOpenNewClient(true)}
            className="bg-blue-300 p-3 text-xl w-[100%] my-4 font-bold text-white hover:text-gray-600 hover:bg-blue-400"
          >
            Nuevo Cliente
          </button>

          <div className="bg-gray-200">
            <ol className="">
              {ourClients.map((clientx) => (
                <li
                  key={clientx.id}
                  className="flex justify-evenly items-center text-black even:bg-gray-300 px-1"
                >
                  <p className="w-[40%] h-14 flex items-center">
                    {clientx.name}
                  </p>
                  <p className="w-[40%] h-14 flex items-center">
                    {clientx.phone}
                  </p>
                  <button
                    onClick={() => getClientDelete(clientx.phone)}
                    className="w-[15%] flex justify-center items-center"
                  >
                    <Image
                      src={deletex}
                      alt="icono de borrar"
                      className="w-[1.5rem]"
                    />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

<Confirm
      msg={msg}
      />

    </div>
  );
};

export default CompClients;
