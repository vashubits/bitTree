'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirebase } from '../context/firebase';
import Image from 'next/image';

const Preview = () => {
  const firebase = useFirebase();
  const params = useSearchParams();
  const nickname = params.get('nickname');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!nickname) return;
      try {
        const res = await firebase.details(nickname);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nickname, firebase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-200 px-4">
        <p className="text-xl sm:text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-200 px-4">
        <p className="text-xl sm:text-2xl font-semibold text-red-600 text-center">
          No BitTree found for '{nickname}'
        </p>
      </div>
    );
  }

  return (
    <div className="bg-emerald-200 min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-20">
      <Image
        src={data.ProfilePic}
        alt={data.Name}
        width={128}
        height={128}
        className="rounded-full shadow-lg border-4 border-white"
      />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 text-center">
        {data.Name}
      </h1>

      <p className="text-gray-700 mt-2 text-center px-2 sm:px-4 md:px-8 max-w-full sm:max-w-lg md:max-w-xl">
        {data.Desc}
      </p>

      <div className="mt-6 w-full max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-3">
        {data.Links &&
          data.Links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white text-center font-semibold py-3 sm:py-4 rounded-xl shadow-md hover:bg-emerald-300 transition text-sm sm:text-base md:text-lg"
            >
              {link.shortname || link.url}
            </a>
          ))}
      </div>
    </div>
  );
};

export default Preview;
