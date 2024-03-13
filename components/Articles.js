import useControl from "@/hooks/useControlProvider";
import Image from "next/image";
import React, { useEffect } from "react";
import chuletas from '@/assets/chuleta-aguja.jpg'

const Articles = () => {

    const { obtainEntries, entries } = useControl()

    useEffect(() => {
        obtainEntries()
    },[])

  return (
    <div className="flex flex-col gap-6 justify-between">
      {entries.map((art) => (
        <div
          className=" bg-gray-200 flex flex-col gap-4 p-3 rounded-2xl border shadow-xl relative"
          key={art.id}
        >
          <p className=" text-xl font-bold pl-10">{art.tittle}</p>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <article className="text-justify lg:w-[50%]">
              {art.description}
            </article>

            <img
              className="w-[100%] lg:w-[50%] shadow-xl"
              src={art.photoUrl}
              alt={`imagen del articulo ${art.title}`}
            />
          </div>
          {art.price ? (
            <div className=" flex justify-end">
              <p className="flex items-center justify-center text-end bg-red-600 text-blue-200 font-bold text-lg md:text-xl sm:text-2xl sm:w-[6rem] w-[4rem] sm:h-[6rem] h-[4rem] md:w-[5rem] md:h-[5rem] rounded-full shadow-md shadow-blue-400">
                {art.price}€
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Articles;
