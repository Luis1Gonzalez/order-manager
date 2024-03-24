import CompClients from "@/components/CompClients";
import CompPublications from "@/components/CompPublications";
import ModalNewClient from "@/components/ModalNewClient";
import useControl from "@/hooks/useControlProvider";
import back from "@/assets/back.svg";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Success from "@/components/Success";
import CompEntries from "@/components/CompEntries";
import ModalNewEntry from "@/components/ModalNewEntry";
import CompOrders from "@/components/CompOrders";
import OrderDetails from "@/components/CompOrderDetails";
import CompOrderDetails from "@/components/CompOrderDetails";
import ModalConfirmOrder from "@/components/ModalConfirmOrder";

const LayoutAdmin = () => {
  const {
    showClients,
    setShowClients,
    showEntries,
    setShowEntries,
    showOrders,
    setShowOrders,
    success,
    msg,
    showOrdersDetails,
    setSelectShowOrder,
    setShowOrdersDetails
  } = useControl();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Gestor de Pedidos - Panel de Administración</title>
        <meta name="description" content="Order Manager" />
      </Head>

      <div className="xl:h-screen py-5 flex flex-col">
        <div className="flex bg-gray-200 font-bold border border-blue-300 shadow-2xl items-center [w-100%] h-[50px]">
          <div
            onClick={() => {
              router.push("/"), setShowClients(false);
            }}
            className="flex items-center justify-center w-[15%] sm:w-[10%] cursor-pointer"
          >
            <Image className="w-[2rem]" src={back} alt="icono de back" />
          </div>

          <h1
            id="administracion"
            className="flex justify-center text-3xl w-[85%] sm:w-[90%]"
          >
            Administración
          </h1>
        </div>

        <div className="flex justify-evenly mt-5 flex-wrap gap-4">
          <button
            onClick={() => {
              setShowClients(!showClients);
              setShowEntries(false);
              setShowOrders(false);
            }}
            className="border border-blue-300 p-3 bg-sky-100 w-[40%] rounded-xl text-xl font-bold hover:bg-sky-300 hover:text-white shadow-xl"
          >
            Clientes
          </button>

          <button
            onClick={() => {
              setShowOrders(!showOrders);
              setShowClients(false);
              setShowEntries(false);
              setSelectShowOrder([]);
              setShowOrdersDetails(false)
            }}
            className="border border-blue-300 p-3 bg-sky-100 w-[40%] rounded-xl text-xl font-bold hover:bg-sky-300 hover:text-white shadow-xl"
          >
            Pedidos
          </button>

          <button
            onClick={() => {
              setShowEntries(!showEntries);
              setShowClients(false);
              setShowOrders(false);
            }}
            className="border border-blue-300 p-3 bg-sky-100 w-[40%] rounded-xl text-xl font-bold hover:bg-sky-300 hover:text-white shadow-xl"
          >
            Publicaciones
          </button>
        </div>
        {success && <Success msg={msg} />}
        {showClients && <CompClients />}
        {showEntries && <CompEntries />}
        {showOrders && <CompOrders />}
        {showOrdersDetails && <CompOrderDetails />}
        <ModalNewClient />
        <ModalNewEntry />
      </div>
    </>
  );
};

export default LayoutAdmin;
