import useControl from "@/hooks/useControlProvider";
import CompListOrdersOpen from "./CompListOrdersOpen";
import CompListOrdersClosed from "./CompListOrdersClosed";

const CompOrders = () => {
  const { setStatusOrder, statusOrder } = useControl();

  return (
    <div className="my-5 px-5">
      <h1 className="bg-blue-300 p-3 text-2xl w-[100%] my-4 font-bold text-white text-center">
        Pedidos
      </h1>
      <div className="flex">
        <button
          onClick={() => setStatusOrder(false)}
          className={`bg-blue-300 p-3 text-xl w-[100%] my-4 font-bold ${statusOrder ? 'text-white' : 'text-black'}  hover:text-gray-800 hover:bg-blue-400`}
        >
          Pendientes
        </button>

        <button
          onClick={() => setStatusOrder(true)}
          className={`bg-blue-300 p-3 text-xl w-[100%] my-4 font-bold ${statusOrder ? 'text-black' : 'text-white'}  hover:text-gray-800 hover:bg-blue-400`}
        >
          Preparado
        </button>
      </div>

      {!statusOrder && <CompListOrdersOpen />}
      {statusOrder && <CompListOrdersClosed />}
    </div>
  );
};

export default CompOrders;
