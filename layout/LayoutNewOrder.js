import FrameSelection from "@/components/FrameSelection";
import Header from "@/components/Header";
import ModalNewOrder from "@/components/ModalNewOrder";
import useControl from "@/hooks/useControlProvider";
import Head from "next/head";

export default function LayoutNewOrder() {
  const { setSelectTypeProduct, setIsOpen, nameUser, userUsingNow } =
    useControl();

  return (
    <>
      <Head>
        <title>Gestor de Pedidos - Nuevo Pedido</title>
        <meta name="description" content="Order Manager" />
      </Head>

      <div className="xl:h-screen">
        <header className="bg-red-800 w-[100%]">
          <Header />
        </header>
        
        <div className="p-5  font-bold">
          <p>
            Nombre de Registro:{" "}
            <span className="uppercase  text-lg italic  font-semibold">
              {userUsingNow}
            </span>
          </p>
          <p>
            Nombre:{" "}
            <span className="uppercase  text-lg italic  font-semibold">
              {nameUser}
            </span>
          </p>
        </div>

        <p className="mt-10 text-2xl text-center font-bold text-black">
          Creando un Pedido
        </p>

        <div className="flex flex-col sm:flex-row justify-evenly gap-4 my-8 px-8 w-[100%] flex-wrap">
          <button
            onClick={() => {
              setSelectTypeProduct("cerdo"), setIsOpen(true);
            }}
            className="bg-sky-400 h-12 rounded-xl text-black font-bold text-lg tracking-widest sm:text-xl hover:bg-sky-200 shadow_bottom sm:w-1/4 px-2"
          >
            Cerdo
          </button>
          <button
            onClick={() => {
              setSelectTypeProduct("pollo"), setIsOpen(true);
            }}
            className="bg-sky-400 h-12 rounded-xl text-black font-bold text-lg tracking-widest sm:text-xl hover:bg-sky-200 shadow_bottom sm:w-1/4 px-2"
          >
            Pollo
          </button>
          <button
            onClick={() => {
              setSelectTypeProduct("ternera"), setIsOpen(true);
            }}
            className="bg-sky-400 h-12 rounded-xl text-black font-bold text-lg tracking-widest sm:text-xl hover:bg-sky-200 shadow_bottom sm:w-1/4 px-2"
          >
            Ternera
          </button>
          <button
            onClick={() => {
              setSelectTypeProduct("cordero"), setIsOpen(true);
            }}
            className="bg-sky-400 h-12 rounded-xl text-black font-bold text-lg tracking-widest sm:text-xl hover:bg-sky-200 shadow_bottom sm:w-1/4 px-2"
          >
            Cordero
          </button>
          <button
            onClick={() => {
              setSelectTypeProduct("embut"), setIsOpen(true);
            }}
            className="bg-sky-400 h-12 rounded-xl text-black font-bold text-lg tracking-widest sm:text-xl hover:bg-sky-200 shadow_bottom sm:w-1/4 px-2"
          >
            Embutidos
          </button>
        </div>

        <ModalNewOrder />

        <FrameSelection />
      </div>
    </>
  );
}
