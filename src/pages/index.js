import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Banner from '@/components/ Banner'
import ProductFeed from '@/components/ProductFeed'
import { getSession } from 'next-auth/react'
export default function Home({products }) {
  
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2023</title>
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner />
        
        <ProductFeed products={products}/>
      </main>
    </div>
  )
}


export async function getServerSideProps(context){
  
  const products = await fetch('https://fakestoreapi.com/products').then((res)=> res.json());
  
  
  return {
    props: {
      products,
      
    },
  };
}

