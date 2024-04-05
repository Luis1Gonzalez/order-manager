import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import error from '@/assets/Error.png'

const Layout404 = () => {
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

<div className='flex justify-center'>
    <Image
    src={error}
    width={470}
    height={470}
    alt='imagen de error 404'
    />
</div>

        </div>
    </>
  )
}

export default Layout404