'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const path = usePathname();
  if(path!='/' && path!='/generate'){
    return null;
  }
  return (
    <div className='fixed w-[80vw] my-15 bg-white pl-10 py-5 flex justify-between rounded-full mx-[10vw] '>
      <div className='flex flex items-center'> 
        <h1 className='font-semiboldbold text-4xl'>BitTree</h1>
       
      </div>

      <div className='flex  '>
        <button className='bg-gray-200 py-4 px-6 font-semibold rounded-sm'>Log in </button>
        <button className='text-white font-semibold py-4 px-5 rounded-full bg-slate-900 mx-3'> Sign up free</button>
      </div>
    </div>
  )


}

export default Navbar
