import React from 'react'

const CompTicket = ({theLast, allDetails}) => {

  return (
    <div className="w-full flex flex-col items-center gap-3">
    <div className="flex flex-col justify-center gap-3 w-[90%] p-5">
      <p className="text-lg">
        <span className="text-xl font-bold">Pedido: </span>#
        {theLast.id}
      </p>

      <p className="text-lg">
        <span className="text-xl font-bold">Fecha: </span>
        {theLast.creationDay}
      </p>

      <p className="text-lg">
        <span className="text-xl font-bold">Cliente: </span>
        {theLast.nameUsing}
      </p>
    </div>

    <div className="flex flex-col justify-center gap-1 border border-gray-400 w-[90%] p-5 rounded-lg">
      <div className="flex justify-between">
        <p className="text-xl font-bold">Producto</p>
        <p className="text-xl font-bold">Cantidad</p>
      </div>
      {allDetails.map((det) => (
        <div className="flex justify-between" key={det.id}>
          <p className="text-lg italic">{det.kind}</p>

          <p className="text-lg italic">
            {det.quantity}
            {det.unity}
          </p>
        </div>
      ))}
    </div>
    <div className=" flex flex-col italic">
      <p className="text-sm text-center">
        Haz una captura de pantalla de este ticket
      </p>
      <p className="text-sm text-center">
        Para cancelar o modificar tu pepdido contactanos.
      </p>
    </div>
  </div>
  )
}

export default CompTicket