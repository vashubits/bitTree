'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const path = usePathname()
  const router = useRouter()

  if (path !== '/' && path !== '/generate') {
    return null
  }

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl bg-white px-5 py-3 sm:py-4 flex justify-between mb-10 items-center rounded-full shadow-md z-50">
      
      <div className="flex items-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800">BitTree</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => router.push('/login')}
          className="bg-gray-200 py-2 sm:py-3 px-4 sm:px-6 font-semibold rounded-md hover:bg-gray-300 transition"
        >
          Log in
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="bg-gray-900 text-white py-2 sm:py-3 px-4 sm:px-6 font-semibold rounded-full hover:bg-gray-800 transition"
        >
          Sign up free
        </button>
      </div>
    </nav>
  )
}

export default Navbar
