import React from "react";

const Success = ({ msg }) => {
  return (
    <div role="alert">
      <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2 mt-10">
        Proceso Exitoso
      </div>
      <div className="border border-t-0 border-green-400 rounded-b bg-red-100 px-4 py-3 text-green-700">
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default Success;