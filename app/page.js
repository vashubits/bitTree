"use client";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from './Navbar/page';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleCreate = () => {
    if (!name) {
      toast.error("Please fill the field!");
      return;
    }
    router.push(`/generate?handle=${name}`);
  };

  const handleReview = () => {
    if (!nickname) {
      toast.error("Please fill the field!");
      return;
    }
    router.push(`/preview?nickname=${nickname}`);
  };

  return (
    <div className="min-h-screen pt-[10vh] bg-[#254f1a] flex flex-col">
      
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center justify-center px-4 lg:px-20 py-10 gap-10 flex-1">
        
        <div className="flex flex-col justify-center items-start lg:w-1/2 w-full text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#d2e823]">
            Everything you are. In one, simple link in bio.
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl my-6">
            Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-5 w-full">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="flex-1 bg-white py-3 sm:py-4 rounded-sm font-semibold pl-4 pr-10 text-start"
              type="text"
              placeholder="bittr.ee/"
            />
            <button
              onClick={handleCreate}
              className="bg-[#e9c0e9] font-semibold py-3 sm:py-4 px-6 rounded-full"
            >
              Claim your BitTree
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
              className="flex-1 bg-white py-3 sm:py-4 rounded-sm font-semibold pl-4 pr-10 text-start"
              type="text"
              placeholder="bittr.ee/nickname"
            />
            <button
              onClick={handleReview}
              className="bg-[#e9c0e9] font-semibold py-3 sm:py-4 px-6 rounded-full"
            >
              Review your BitTree
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex justify-center items-center">
          <img className="w-full max-w-md lg:max-w-xl" src="/photo.png" alt="photo" />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
