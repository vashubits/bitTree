'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useFirebase } from '../context/firebase';
import { useSearchParams, useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const Generate = () => {
  const search = useSearchParams();
  const name = search.get("handle");
  const router = useRouter();
  
  const [links, setLinks] = useState([{ shortname: "", url: "" }])
  const [nickname, setNickname] = useState(name)
  const [description, setDescription] = useState("")
  const [profile, setProfile] = useState("")

  const firebase = useFirebase();

  const handleAdd = () => setLinks([...links, { shortname: "", url: "" }])
  const handleRemove = (index) => {
    if (links.length === 1) return;
    const updated = [...links];
    updated.splice(index, 1);
    setLinks(updated);
  }
  const handleChange = (index, e) => {
    const { name, value } = e.target
    const updated = [...links]
    updated[index][name] = value
    setLinks(updated)
  }

  const handleCreate = async () => {
    try {
      await firebase.create(nickname, description, profile, links);
      toast.success("BitTree is created ✅");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create BitTree ❌");
    }
  }

  return (
    <div className="bg-pink-200 pt-[12vh] min-h-screen flex flex-col lg:flex-row px-4 lg:px-20 py-10 gap-10">

      
      <div className="flex flex-col gap-4 w-full lg:w-1/2 items-center lg:items-start">
        <input 
          type="text"
          placeholder="Enter Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white font-semibold"
        />
        <input 
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white font-semibold"
        />
        <input 
          type="text"
          placeholder="Enter your picture URL"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white font-semibold"
        />

        <ToastContainer />

    
        {links.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="text"
              placeholder="Enter Short URL Name"
              className="flex-1 px-3 py-2 rounded-xl bg-white font-semibold"
              value={item.shortname}
              name="shortname"
              onChange={(e) => handleChange(index, e)}
            />
            <input
              type="text"
              placeholder="Enter URL"
              className="flex-1 px-3 py-2 rounded-xl bg-white font-semibold"
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
          className="w-full sm:w-auto font-semibold my-3 text-white bg-slate-800 p-3 rounded-full hover:bg-slate-900 transition"
          onClick={handleAdd}
        >
          + Add Field
        </button>
        <button
          className="w-full sm:w-auto font-semibold mb-6 text-white bg-slate-800 p-3 rounded-full hover:bg-slate-900 transition"
          onClick={handleCreate}
        >
          Create BitTree
        </button>
      </div>


      <div className="w-full lg:w-1/2 bg-white rounded-xl p-6 shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center lg:text-left">Steps to Create Your BitTree</h2>
        <ol className="list-decimal list-inside space-y-2 text-base sm:text-lg font-medium">
          <li>Enter a <span className="font-semibold">Nickname</span> (your BitTree title).</li>
          <li>Add a short <span className="font-semibold">Description</span> to tell others what it’s about.</li>
          <li>Paste your <span className="font-semibold">Profile Picture URL</span> to personalize your BitTree.</li>
          <li>Fill in the <span className="font-semibold">Short URL Name</span> and actual <span className="font-semibold">Link</span>.</li>
          <li>Click <span className="font-semibold">+ Add Field</span> to include more links.</li>
          <li>If a link is not needed, click the red <span className="font-semibold">✕ button</span> to remove it.</li>
          <li>When finished, press <span className="font-semibold">Create BitTree</span> to save it.</li>
          <li>You’ll see a success message once it’s created ✅</li>
        </ol>
      </div>

    </div>
  )
}

export default Generate
