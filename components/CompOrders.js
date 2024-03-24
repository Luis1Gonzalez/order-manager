import useControl from "@/hooks/useControlProvider";
import React, { useEffect } from "react";
import CompListOrders from "./CompListOrders";
import CompListOrdersOpen from "./CompListOrdersOpen";

const CompOrders = () => {
  const { obtaingOrders, orders, setSelectShowOrder, setStatusOrder, showOpenOrders, showClosedOrders, seeList, setSeeList } =
    useControl();

  useEffect(() => {
    obtaingOrders();
  }, []);

  useEffect(() => {
showOpenOrders
showClosedOrders
  },[])




  return (
    <div className="my-5 px-5">
      <h1 className="bg-blue-300 p-3 text-2xl w-[100%] my-4 font-bold text-white text-center">
        Pedidos
      </h1>
      <div className="flex">
        <button
          onClick={() => {setStatusOrder(false); showOpenOrders()}}
          className="bg-blue-300 p-3 text-xl w-[100%] my-4 font-bold text-white hover:text-gray-800 hover:bg-blue-400"
        >
          Pendientes
        </button>

        <button
          onClick={() => {setStatusOrder(true); showClosedOrders()}}
          className="bg-blue-300 p-3 text-xl w-[100%] my-4 font-bold text-white hover:text-gray-800 hover:bg-blue-400"
        >
          Preparado
        </button>
      </div>

{seeList && <CompListOrders />}
{/* <CompListOrdersOpen /> */}
      
    </div>
  );
};

export default CompOrders;
