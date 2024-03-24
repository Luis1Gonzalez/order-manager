"use client"; //Esto es para que el navegador sepa que debe procesar esta pagina del lado del cliente y no del servidor.
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useControl from "../hooks/useControlProvider";
import Alert from "./Alert";
import Image from "next/image";
import UploadImage from "@/components/UploadImage";
import Success from "./Success";
import Loading from "./Loading";

const ModalNewEntry = () => {
  const {
    isOpenNewEntry,
    setIsOpenNewEntry,
    addNewEntryTitle,
    setAddNewEntryTitle,
    addNewEntryDescription,
    setAddNewEntryDescription,
    addNewEntryDescription2,
    setAddNewEntryDescription2,
    addNewEntryPrice,
    setAddNewEntryPrice,
    newEntry,
    setAlert,
    alert,
    success,
    setMsg,
    msg,
    setFile,
    file,
    isLoading,
    photoUrl,
    setPhotoUrl,
  } = useControl();

  useEffect(() => {
    setAddNewEntryTitle("");
    setAddNewEntryDescription("");
    setAddNewEntryDescription2("");
    setAddNewEntryPrice("");
    setPhotoUrl("");
  }, []);

  // console.log({
  //   addNewEntryTitle,
  //   addNewEntryDescription,
  //   addNewEntryDescription2,
  //   addNewEntryPrice,
  //   photoUrl,
  // });
  return (
    <Transition.Root show={isOpenNewEntry} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpenNewEntry(false)}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setIsOpenNewEntry(false);
                  }}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full flex flex-col gap-7">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center leading-6 font-bold text-sky-400"
                  >
                    Agregando Nueva Publicación
                  </Dialog.Title>

                  <UploadImage />

                  <form onSubmit={newEntry} className="flex flex-col gap-4">
                    <input
                      type="text"
                      className="border border-gray-400 p-2 w-full"
                      placeholder="Ingresa el titulo de este artículo"
                      value={addNewEntryTitle}
                      onChange={(e) => setAddNewEntryTitle(e.target.value)}
                    />

                    <textarea
                      name="description"
                      className="border border-gray-400 p-2 w-full h-auto"
                      placeholder="Escribe el primer parrafo aqui"
                      value={addNewEntryDescription}
                      maxLength={10000}
                      onChange={(e) =>
                        setAddNewEntryDescription(e.target.value)
                      }
                    />

                    <textarea
                      name="description"
                      className="border border-gray-400 p-2 w-full h-auto"
                      placeholder="Si tienes, escribe el segundo parrafop aqui"
                      value={addNewEntryDescription2}
                      maxLength={10000}
                      onChange={(e) =>
                        setAddNewEntryDescription2(e.target.value)
                      }
                    />

                    <input
                      type="text"
                      className="border border-gray-400 p-2 w-full"
                      placeholder="Ingresa el precio del producto"
                      value={addNewEntryPrice}
                      name="price"
                      onChange={(e) => setAddNewEntryPrice(e.target.value)}
                      title="Ingresa solo números."
                    />

                    {alert && <Alert msg={msg} />}
                    {success && <Success msg={msg} />}

                    <input
                      className=" bg-sky-300 p-3 text-white font-bold text-xl hover:text-black hover:bg-sky-400 shadow-xl"
                      type="submit"
                      value="Crear Articulo"
                    />
                  </form>

                  {isLoading && <Loading />}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNewEntry;
