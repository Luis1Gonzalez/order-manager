import React, { useEffect } from "react";
import useControl from "@/hooks/useControlProvider";
import Image from "next/image";
import deletex from "@/assets/delete.svg";
import editx from "@/assets/edit.svg";
import ConfirmEntry from "./ModalConfirmEntry";

const CompPublications = () => {
  const {
    obtainEntries,
    entries,
    setEntries,
    msg,
    setMsg,
    setObtaingEntryToDelete,
    setIsOpenConfirm,
  } = useControl();

  useEffect(() => {
    obtainEntries();
  }, []);

  const getDeleteEntry = (id) => {
    const selectingEntry = entries.filter((filtered) => filtered.id === id);
    setObtaingEntryToDelete(selectingEntry);
    setIsOpenConfirm(true);
    setMsg("¿Desea Eliminar este Articulo?");
  };
  getDeleteEntry;

  //   console.log(entries);
  return (
    <div className="my-5">
      <div className="flex flex-col gap-2">
        {entries.map((article) => (
          <div key={article.id} className="p-3 flex flex-col gap-3 bg-gray-200">
            <div className="flex justify-end py-3 pr-6">
              <div className="flex rounded-lg p-2 w-32 h-[100%] gap-6 border-2 border-gray-100 shadow-inner">
                <button
                  onClick={() => getDeleteEntry(article.id)}
                  className="w-[120px] flex justify-center items-center"
                >
                  <Image
                    src={deletex}
                    alt="icono de borrar"
                    className="w-[1.5rem]"
                  />
                </button>

                <button
                  // onClick={() => getDeleteEntry(clientx.phone)}
                  className="w-[120px] flex justify-center items-center"
                >
                  <Image
                    src={editx}
                    alt="icono de editar"
                    className="w-[1.5rem]"
                  />
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold text-xl">Titulo</p>
              <p className="text-lg italic">{article.tittle}</p>
            </div>

            <div className="">
              <p className="font-bold text-xl">Descripción</p>
              <p className="text-lg italic">{article.description}</p>
            </div>
            {article.price ? (
              <div>
                <p className="font-bold text-xl">Precio</p>
                <p className="text-lg italic">{article.price}</p>
              </div>
            ) : (
              ""
            )}

<div>
    <img
    src={article.photoUrl}
    alt="foto subida de articulo."
    className="w-[100%] md:w-[300px]"
    
    />
</div>

          </div>
        ))}
      </div>

      <ConfirmEntry msg={msg} />
    </div>
  );
};

export default CompPublications;
