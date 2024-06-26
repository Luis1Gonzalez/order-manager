import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useControl from "../hooks/useControlProvider";
import Alert from "@/components/Alert";
import Loading from "./Loading";

const ModalAccessAdmin = () => {
  const {
    accessAdminAllowed,
    setAccessAdminAllowed,
    passUserAdmin,
    setPassUserAdmin,
    tryAccessAdmin,
    alert,
    msg,
    isLoading,
  } = useControl();

  const confirmCancelAdminAccess = () => {
    setAccessAdminAllowed(false);
  };

  return (
    <Transition.Root show={accessAdminAllowed} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setAccessAdminAllowed(false)}
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
                    setAccessAdminAllowed(false);
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
                    className="text-2xl text-center leading-6 font-bold text-red-500"
                  >
                    Acceso Administración
                  </Dialog.Title>

                  <div className="flex flex-col items-center justify-center gap-3">
                    <input
                      type="text"
                      className="border border-gray-400 w-[80%] p-3 rounded-lg"
                      placeholder="Ingresa contraseña"
                      name="nameUser"
                      onChange={(e) => setPassUserAdmin(e.target.value)}
                    />
                  </div>
                  {alert && <Alert msg={msg} />}
                  {isLoading && <Loading />}
                  <div className=" mb-5 flex flex-col sm:flex-row w-full sm:w-[100%] items-center justify-center gap-3">
                    <button
                      onClick={tryAccessAdmin}
                      className="w-[80%] border border-green-500 hover:bg-green-100 text-center text-md text-gray-600 font-bold p-2 rounded-md"
                    >
                      Ingresar
                    </button>

                    <button
                      onClick={confirmCancelAdminAccess}
                      className="w-[80%] border border-red-500 hover:bg-red-100 text-center text-md text-gray-600 font-bold p-2 rounded-md"
                    >
                      Cancelar
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

export default ModalAccessAdmin;
