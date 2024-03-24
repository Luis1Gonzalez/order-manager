import useControl from '@/hooks/useControlProvider';
import Image from 'next/image';
import React from 'react'

const CompListOrdersOpen = () => {
    const { selectShowOrder, orders, statusOrder, sendIdOrderDetails, showOpenOrders, showClosedOrders } = useControl();

const viendoAbiertas = () => {
    const ordersOpen = orders.filter(filtered => filtered.status === false)
    console.log(ordersOpen)
}
viendoAbiertas()

    return (
      <div className="flex flex-col items-center mt-5 bg-white">
        <p className="w-[100%]  text-center text-2xl text-black p-8 font-bold">
          {selectShowOrder.length === 0 ? "No hay Pedidos" : orders.length === 0 ? "No hay Pedidos" : statusOrder === false ? `Pedidos Pendiente (${selectShowOrder.length})` : `Pedidos Preparado (${selectShowOrder.length})`}
  
        </p>
        <p>{ }</p>
  
        <div className="w-[100%] p-3 mb-8">
          <div className="flex flex-wrap gap-5 justify-evenly">
            {selectShowOrder.map((order) => (
              <button
              onClick={() => sendIdOrderDetails(order.id)}
              className={`flex justify-evenly border border-gray-300 items-center w-[100%] md:w-[45%] lg:w-[30%] p-8 text-xl shadow-lg shadow-sky-400/50  font-bold ${statusOrder === false ? 'bg-orange-200' : 'bg-green-200'}  rounded-lg  gap-2`} key={order.id}>
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
}

export default CompListOrdersOpen