"use Client";
import useControl from "@/hooks/useControlProvider";
import { useEffect, useState } from "react";
import waiting from "@/assets/waiting.svg";
import ok from "@/assets/ok-ok.svg";
import Image from "next/image";
import sync from "@/assets/sync.svg";
import Loading from "./Loading";

const CompListOrdersOpen = () => {
  const {
    orders,
    statusOrder,
    sendIdOrderDetails,
    obtaingOrders,
    isLoading,
    setIsLoading,
  } = useControl();
  const [selectShowOrderx, setSelectShowOrderx] = useState([]);

  useEffect(() => {
    obtaingOrders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      obtaingOrders();
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const catchOpenOrders = () => {
      const ordersOpen = orders.filter((filtered) => filtered.status === false);
      setSelectShowOrderx(ordersOpen);
    };
    catchOpenOrders();

    setTimeout(() => {
      setIsLoading(false)
  }, 2000);

  }, [orders, setIsLoading]);

  const updateNow = () => {
    obtaingOrders();
  };


  return (
    <div className="flex flex-col items-center mt-5 bg-white">
      <div className="flex justify-between w-[100%] px-12">
        <p className="  text-center text-2xl text-black p-8 font-bold w-[90%]">
          {selectShowOrderx.length === 0
            ? "No hay Pedidos Pendiente"
            : `Pedidos Pendiente (${selectShowOrderx.length})`}
        </p>

        <div className="rounded-full p-3 border border-gray-300 w-[70px] h-[60px] sm:h-[70px] flex justify-center items-center shadow-button shadow-lg shadow-sky-400/80 bg-gray-100">
          <Image
            src={sync}
            width={50}
            height={50}
            className="social_shadow cursor-pointer"
            alt="imagen de altualizar"
            onClick={updateNow}
          />
        </div>
      </div>

      {isLoading && <Loading />}

      <div className="w-[100%] p-3 mb-8">
        <div className="flex flex-wrap gap-5 justify-evenly">
          {selectShowOrderx.map((order) => (
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

export default CompListOrdersOpen;
