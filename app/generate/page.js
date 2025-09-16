'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useFirebase } from '../context/firebase';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Generate = () => {

  const search  = useSearchParams();
  const name = (search.get("handle"))
  const route = useRouter();
  
 
  const [links, setLinks] = useState([
    { shortname: "", url: "" }
  ])


  const handleAdd = () => {
    setLinks([...links, { shortname: "", url: "" }])
  }

  const [nickname, setnickname] = useState(name)
  const [description, setdescription] = useState("")
  const [profile, setprofile] = useState("")

 const handleRemove = (index)=>{
  if(links.length===1){
    return;
  }
  const update = [...links];
  update.splice(index,1);
  setLinks(update);
 }
  const handleChange = (index, e) => {
    const { name, value } = e.target
    const updated = [...links]
    updated[index][name] = value
    setLinks(updated)
  }
  
  const firebase = useFirebase();
  const handlecreate = async () => {
  try {
    await firebase.create(nickname, description, profile, links);
    toast.success("BitTree is created ✅");
    setTimeout(() => {
      route.push("/");
    }, 1500);
  } catch (err) {
    console.error(err);
    toast.error("Failed to create BitTree ❌");
  }
};
  

  return (
    <div className="bg-pink-200 min-h-screen grid grid-cols-2">
      <div className="flex mt-[30vh] flex-col gap-5 justify-center items-center">
        
      
        <input 
          type="text"
          placeholder="Enter Nickname"
          value={nickname}
          onChange={(e)=>{setnickname(e.target.value)}}
          className="px-3 py-2 rounded-xl bg-white font-semibold"
        />
        <input 
          type="text"
          placeholder="Enter Description"
          value={description}
           onChange={(e)=>{setdescription(e.target.value)}}
          className="px-3 py-2 rounded-xl bg-white font-semibold"
        />
      
        <input 
          type="text"
          placeholder="Enter your  picture url"
          value={profile}
           onChange={(e)=>{setprofile(e.target.value)}}
          className="px-3 py-2 rounded-xl bg-white font-semibold"
        />

       <ToastContainer />
        {links.map((item, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Short URL Name"
              className="px-3 py-2 rounded-xl bg-white font-semibold"
              value={item.shortname}
              name="shortname"
              onChange={(e) => handleChange(index, e)}
            />
            <input
              type="text"
              placeholder="Enter URL"
              className="px-3 py-2 rounded-xl bg-white font-semibold"
              value={item.url}
              name="url"
              onChange={(e) => handleChange(index, e)}
            />
             <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold"
              onClick={() => handleRemove(index)}
            >
              ✕
            </button>
          </div>
        ))}


        <button
          className="font-semibold my-3 text-white bg-slate-800 p-3 rounded-full"
          onClick={handleAdd}
          >
          + add field
        </button>
        <button
          className="font-semibold mb-16 text-white bg-slate-800 p-3 rounded-full"
          onClick={handlecreate}
          >
         Create BitTree
        </button>
      
         
      </div>

     
      <div className="flex flex-col gap-4 justify-center p-8">
  <h2 className="text-2xl font-bold">Steps to Create Your BitTree</h2>
  <ol className="list-decimal list-inside space-y-3 text-lg font-medium">
    <li>Enter a <span className="font-semibold">Nickname</span> (your BitTree title).</li>
    <li>Add a short <span className="font-semibold">Description</span> to tell others what it’s about.</li>
    <li>Paste your <span className="font-semibold">Profile Picture URL</span> to personalize your BitTree.</li>
    <li>Fill in the <span className="font-semibold">Short URL Name</span> and actual <span className="font-semibold">Link</span>.</li>
    <li>Click <span className="font-semibold">+ add field</span> to include more links (you can add multiple).</li>
    <li>If a link is not needed, click the red <span className="font-semibold">✕ button</span> to remove it.</li>
    <li>When finished, press <span className="font-semibold">Create BitTree</span> to save it.</li>
    <li>You’ll see a success message once it’s created ✅</li>
  </ol>
</div>

    </div>
  )
}

export default Generate
