import useControl from "@/hooks/useControlProvider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import waiting from "@/assets/waiting.svg";
import ok from "@/assets/ok-ok.svg";

const CompOrderDetails = () => {
  const {
    allDetailsOrders,
    changeStatusRow,
    disabledButtons,
    handleStatusOrder,
    setStatus,
  } = useControl();

  const newAllDetailsOrders = allDetailsOrders.createdOrder;

  useEffect(() => {
    const changingOrderStatus = async () => {
      setStatus(true);
    };
    changingOrderStatus();
  }, []);

  return (
    <div className=" flex flex-col gap-5 my-5 px-5 items-center">
      <h1 className="bg-blue-300 p-3 text-2xl w-[100%] font-bold text-white text-center">
        {`Pedido #${allDetailsOrders.id}`}
      </h1>

      <div className="flex flex-col gap-3 md:flex-row justify-center items-center w-full">
        <div className="flex flex-col my -3 bg-gray-200 p-2 w-full md:w-[50%]">
          <p className="capitalize text-xl">
            <span className="font-bold">Sesion de: </span>
            {allDetailsOrders.nameRegistered}
          </p>
          <p className="capitalize text-xl text-blue-600 font-semibold italic">
            <span className="font-bold">Pedido por: </span>
            {allDetailsOrders.nameUsing}
          </p>
          <p className="capitalize text-xl">
            <span className="font-bold">Telefono: </span>
            {allDetailsOrders.clientPhone}
          </p>
        </div>

        <div
          className={`flex flex-col my -3 bg-gray-200 p-2 w-full md:w-[50%] ${
            allDetailsOrders.status === false ? "bg-red-300" : "bg-green-300"
          }`}
        >
          <p className="capitalize text-xl">
            <span className="font-bold">Fecha del Pedido: </span>
            {allDetailsOrders.creationDay}
          </p>
          <p className="capitalize text-xl">
            <span className="font-bold">Hora del Pedido: </span>
            {allDetailsOrders.creationHour}
          </p>
          <p className="capitalize text-xl">
            <span className="font-bold">Estado del Pedido: </span>
            {allDetailsOrders.status === false ? "Pendiente" : "Preparado"}
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-2 w-full">
        {newAllDetailsOrders.map((order) => (
          <li
            className="flex gap-3 odd:bg-gray-300 p-4 text-xl"
            key={order.id}
            disabled={disabledButtons.includes(order.id)}
          >
            <p className="w-[55%]">{order.kind}</p>
            <p className="w-[30%] capitalize">
              {order.quantity}
              {order.unity}
            </p>

            {allDetailsOrders.status === false ? (
              <button onClick={() => changeStatusRow(order.id)}>
                <div
                  className={
                    disabledButtons.includes(order.id)
                      ? "disabled-button"
                      : "enabled-button"
                  }
                ></div>
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      {allDetailsOrders.status === false ? (
        <button
          onClick={() => handleStatusOrder(allDetailsOrders.id)}
          className=" bg-orange-700 p-3 text-white font-bold text-xl hover:text-black hover:bg-green-700 shadow-xl mt-5 rounded-lg w-[50%]"
        >
          Pedido Completado
        </button>
      ) : null}
    </div>
  );
};

export default CompOrderDetails;
