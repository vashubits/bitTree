"use client"
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [name, setname] = useState("")
  const [nickname, setnickname] = useState("")
  const router = useRouter();
  const handlecreate = ()=>{
    toast.success("fill field!");
    router.push(`/generate?handle=${name}`)
  }
  const handlereview = ()=>{
    toast.success("Review");
    router.push(`/preview?nickname=${nickname}`)
  }
  return (
   <div className="container min-w-screen grid grid-cols-2 min-h-[130vh] bg-[#254f1a]">
    
    <div className="flex flex-col justify-center items-center">
 <div className="pl-15  ">  <h1 className="text-7xl font-extrabold text-[#d2e823]"> Everything you are. In one, simple link in bio.</h1>
<p className="text-white text-xl my-10">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
<input onChange={(e)=>{setname(e.target.value)}} value={name} className="bg-white py-4 rounded-sm font-semibold pl-4 pr-10 text-start" type="text" placeholder="bittr.ee/"/>

<button onClick={handlecreate} className="bg-[#e9c0e9] font-semibold py-4 px-6 rounded-full mx-3 "> Claim your BitTree</button>
<div className='my-5'>

<input onChange={(e)=>{setnickname(e.target.value)}} value={nickname} className="bg-white py-4 rounded-sm font-semibold pl-4 pr-10 text-start" type="text" placeholder="bittr.ee/nickname"/>

<button onClick={handlereview} className="bg-[#e9c0e9] font-semibold py-4 px-6 rounded-full mx-3 "> Review your BitTree</button>
</div>
</div>


 <ToastContainer />
<div>
  
</div>
    </div>
    <div><img className="my-56"  src="/photo.png" alt="photo" /></div>

   </div>
  );
}
