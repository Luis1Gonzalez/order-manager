import useControl from "@/hooks/useControlProvider";
import { useEffect, useState } from "react";
import waiting from "@/assets/waiting.svg";
import ok from "@/assets/ok-ok.svg";
import Image from "next/image";

const CompListOrdersClosed = () => {
  const {
    orders,
    setOrders,
    statusOrder,
    sendIdOrderDetails,
    obtaingOrders,
    closedTime,
    closedShowOrderx,
    setCloseShowOrderx,
    idDeletingOrders,
    setIdDeletingOrders,
    deletingOrders,
    setStatusOrder
  } = useControl();


  useEffect(() => {
    obtaingOrders();
  }, []);


  useEffect(() => {
    const catchOpenOrders = () => {
      const ordersClosed = orders.filter(
        (filtered) => filtered.status === true
      );
      setCloseShowOrderx(ordersClosed);
    };
    catchOpenOrders();
  }, []);

  useEffect(() => {
    deletingOrders()
  },[])


  return (
    <div className="flex flex-col items-center mt-5 bg-white">
      <p className="w-[100%]  text-center text-2xl text-black p-8 font-bold">
        {closedShowOrderx.length === 0
          ? "No hay Pedidos"
          : `Pedidos Preparados (${closedShowOrderx.length})`}
      </p>
      <div className="w-[100%] p-3 mb-8">
        <div className="flex flex-wrap gap-5 justify-evenly">
          {closedShowOrderx.map((order) => (
            <button
              onClick={() => sendIdOrderDetails(order.id)}
              className={`flex justify-evenly border border-gray-300 items-center w-[100%] md:w-[45%] lg:w-[30%] p-8 text-xl shadow-lg shadow-sky-400/50  font-bold ${
                statusOrder === false ? "bg-orange-200" : "bg-green-200"
              }  rounded-lg  gap-2`}
              key={order.id}
            >
              <div>
                <p>{order.creationDay}</p>
                <p>{order.creationHour}</p>
                <p>{order.nameUsing}</p>
              </div>
              <Image
                src={order.status === false ? waiting : ok}
                alt="icono de estatus"
                width={50}
                height={50}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompListOrdersClosed;
