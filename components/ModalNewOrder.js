import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useControl from "../hooks/useControlProvider";
import Alert from "@/components/Alert";

const ModalNewOrder = () => {
  const {
    isOpen,
    setIsOpen,
    selectTypeProduct,
    options,
    alert,
    msg,
    setKind,
    setQuantity,
    quantity,
    setUnity,
    handleRowMore,
    handleRowCancelar,
    orderTime
  } = useControl();

  // Función para manejar cambios en el input y permitir solo números
  const handleInputChange = (event) => {
    const value = event.target.value;
    const regex = /^[0-9\b]+$/; // Expresión regular para permitir solo números
    if (value === "" || regex.test(value)) {
      setQuantity(value);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpen(false)}
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setIsOpen(false);
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
                    className="text-2xl text-center leading-6 font-bold text-gray-900"
                  >
                    Creando Nuevo Pedido
                  </Dialog.Title>

                  <form className="flex flex-col gap-4 my-8">
                    <fieldset className="mb-5 border-2 p-3 flex flex-col flex-wrap sm:flex-row justify-evenly gap-2">
                      <legend className="my-5 text-2xl font-semibold capitalize">
                        {selectTypeProduct}
                      </legend>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <select
                          id="kind"
                          className="px-4"
                          onChange={(e) => setKind(e.target.value)}
                        >
                          <option className="" value="">
                            {" "}
                            Selecciona un Producto{" "}
                          </option>
                          {options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          className="border sm:w-[20%]"
                          placeholder="Cant."
                          value={quantity}
                          onChange={handleInputChange}
                          title="Ingresa la cantidad en números."
                        />

                        <select
                          id="unity"
                          className="px-2"
                          onChange={(e) => setUnity(e.target.value)}
                        >
                          <option value="">--</option>
                          <option value="gr">gr</option>
                          <option value="Kg">Kg</option>
                          <option value="€">€</option>
                          <option value="Uni.">Unidades</option>
                        </select>
                      </div>
                    </fieldset>

                    {alert && <Alert msg={msg} />}

                    <div className="flex justify-evenly flex-wrap gap-2">
                      <button
                        className="w-[30%] sm:w-1/4  border border-green-500 hover:bg-green-100 text-black rounded-xl py-1"
                        onClick={handleRowMore}
                      >
                        Más
                      </button>
                      <button
                        className="w-[30%] sm:w-1/4  border border-red-500 hover:bg-red-100 text-black rounded-xl py-1"
                        onClick={handleRowCancelar}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNewOrder;
