import Articles from "@/components/Articles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalLogIn from "@/components/ModalLogIn";
import ModalTicket from "@/components/ModalTicket";
import SideBar from "@/components/SideBar";
import Head from "next/head";

export default function Layout() {
  return (
    <>
      <Head>
        <title>Gestor de Pedidos - Inicio</title>
        <meta name="description" content="Order Manager" />
      </Head>

      <div className="xl:h-screen p-3">
        <header className="bg-red-600 w-[100%]">
          <Header />
        </header>

        <div className="flex flex-col md:flex-row gap-3 py-3">
          <aside className="md:w-5/12 xl:w-1/4 2xl:w-1/5">
            <SideBar />
          </aside>

          <main className="md:w-7/12 xl:w-3/4 2xl:w-4/5">
            <Articles />
          </main>
        </div>
        <Footer />
      </div>
      <ModalTicket />
      <ModalLogIn />
      
    </>
  );
}
