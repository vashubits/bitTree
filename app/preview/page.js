'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFirebase } from '../context/firebase'

const Preview = () => {
  const firebase = useFirebase()
  const params = useSearchParams()
  const nickname = params.get('nickname')

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!nickname) return
      try {
        const res = await firebase.details(nickname)
        setData(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [nickname, firebase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-200">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-200">
        <p className="text-xl font-semibold text-red-600">
          No BitTree found for "{nickname}"
        </p>
      </div>
    )
  }

  return (
    <div className="bg-emerald-200 min-h-screen flex flex-col items-center py-10">
      {/* Profile Picture */}
      <img
        src={data.ProfilePic}
        alt={data.Name}
        className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
      />

      {/* Nickname */}
      <h1 className="text-3xl font-bold mt-4">{data.Name}</h1>

      {/* Description */}
      <p className="text-gray-700 mt-2 text-center px-4 max-w-lg">
        {data.Desc}
      </p>

      {/* Links */}
      <div className="mt-6 w-full max-w-md flex flex-col gap-3">
        {data.Links && data.Links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white text-center font-semibold py-3 rounded-xl shadow-md hover:bg-emerald-300 transition"
          >
            {link.shortname || link.url}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Preview
