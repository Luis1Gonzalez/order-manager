import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useControl from "../hooks/useControlProvider";

const Confirm = ({ msg }) => {
  const {
    isOpenConfirm,
    setIsOpenConfirm,
    setArrayRow,
    obtaingClientToDelete,
    setDefiningPhoneDelete,
    deletingClient,
    closeDelete,
  } = useControl();

  useEffect(() => {
    const definingPhoneDeleteFunct = () => {
      setDefiningPhoneDelete(obtaingClientToDelete[0]?.id)
    } 
    definingPhoneDeleteFunct()
  },[obtaingClientToDelete, setDefiningPhoneDelete])

  return (
    <Transition.Root show={isOpenConfirm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpenConfirm(false)}
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
            <div className=" border border-red-500 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setIsOpenConfirm(false);
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
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center leading-6 font-bold text-red-500"
                  >
                    Advertencia
                  </Dialog.Title>

                  <h1 className="text-xl text-center my-5 text-red-500 font-extrabold">{msg}</h1>

                  <div className=" mb-5 flex flex-col sm:flex-row w-full sm:w-[100%] items-center justify-center gap-3">
                    <button
                    onClick={() => setIsOpenConfirm(false)}
                    className="w-[80%] border border-green-500 hover:bg-green-100 text-center text-md text-gray-600 font-bold p-2 rounded-md">
                      Continuar
                    </button>

                    <button
                    onClick={() => {setIsOpenConfirm(false), deletingClient(), closeDelete()}}
                    className="w-[80%] border border-red-500 hover:bg-red-100 text-center text-md text-gray-600 font-bold p-2 rounded-md">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Confirm;
