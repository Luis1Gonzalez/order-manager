import useControl from "@/hooks/useControlProvider";
import React, { useEffect } from "react";
import CompPublications from "./CompPublications";

const CompEntries = () => {
  const {  setIsOpenNewEntry } =
    useControl();

  return (
    <div className="my-5 px-5">
      

      <button
        onClick={() => setIsOpenNewEntry(true)}
        className="bg-blue-300 p-3 text-xl w-[100%] my-4 font-bold text-white hover:text-gray-600 hover:bg-blue-400"
      >
        Nuevo Articulo
      </button>

<CompPublications />
    </div>
  );
};

export default CompEntries;
