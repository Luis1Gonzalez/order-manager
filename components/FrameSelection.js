import useControl from "@/hooks/useControlProvider";
import React, { useEffect } from "react";
import Confirm from "./ModalConfirm";
import deletex from "@/assets/delete.svg";
import Image from "next/image";
import ModalConfirmCancelOrder from "./ModalConfirmCancelOrder";

const FrameSelection = () => {
  const {
    arrayRow,
    setArrayRow,
    setIsOpenConfirmCancelOrder,
    setMsg,
    msg,
    deleteProduct,
    comment,
    setComment,
    newOrder,
    creationHour
  } = useControl();

  const cancelOrder = () => {
    setIsOpenConfirmCancelOrder(true);
    setMsg("¿Quieres eliminar tu pedido?");
  };

console.log({arrayRow, comment})

  return (
    <>
      <div>
        {arrayRow.length > 0 ? (
          <div className="flex flex-col items-center mt-5">
            <p className="w-[80%] bg-gray-200 text-center text-xl text-black p-3 font-bold">
              Tus Productos
            </p>

            <div className="w-[100%] flex justify-center my-2">
              <ol className="w-[80%] bg-gray-200">
                {arrayRow.map((array) => (
                  <li
                    key={array.id}
                    className="flex justify-around capitalize text-black text-md md:text-xl py-2 gap-2 even:bg-gray-300"
                  >
                    <p className="text-center w-1/4">
                      {array.selectTypeProduct}
                    </p>
                    <p className="text-center w-1/4">{array.kind}</p>
                    <p className="text-center w-1/4">{array.quantity}</p>
                    <p className="text-center w-1/4">{array.unity}</p>

                    <button
                      onClick={() => deleteProduct(array.id)}
                      className="w-[15%] flex justify-center items-center"
                    >
                      <Image
                        src={deletex}
                        alt="icono de borrar"
                        className="w-[1.5rem] bg-green-300"
                      />
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <textarea
              className="border border-gray-500 w-[80%] mt-3 px-3 py-1"
              placeholder="Agrega tus comentarios"
              onChange={(e) => setComment(e.target.value)}
            />

            <div className=" mb-10 mt-5 flex flex-col sm:flex-row w-full sm:w-[80%] items-center gap-3">
              <button
              onClick={newOrder}
              className="w-[80%]  border border-green-500 hover:bg-green-100 text-center text-xl text-black font-bold p-3 rounded-md">
                Generar Pedido
              </button>

              <button
                onClick={cancelOrder}
                className="w-[80%]  border border-red-500 hover:bg-red-100 text-center text-xl text-black font-bold p-3 rounded-md"
              >
                Cancelar Pedido
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ModalConfirmCancelOrder msg={msg} />
    </>
  );
};

export default FrameSelection;
