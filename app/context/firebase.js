"use client";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection,getDocs,query,where, addDoc } from "firebase/firestore";


const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyCMNWXHPtWSQ40PfYY6-55v0pMKJopmj0k",
  authDomain: "bittree-58ecc.firebaseapp.com",
  projectId: "bittree-58ecc",
  storageBucket: "bittree-58ecc.firebasestorage.app",
  messagingSenderId: "871001762766",
  appId: "1:871001762766:web:0102d6d8a0af58a303599f",
};


const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);


export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const create = async (nickname, description, profilePic, links) => {
    
      const ref =  collection(firestore, "users");

      const res = await addDoc(ref, {
        Name: nickname,
        Desc: description,
        ProfilePic: profilePic,
        Links: links,
       
      });
      
    } 
   const details = async (nickname) => {
  const q = query(collection(firestore, "users"), where("Name", "==", nickname));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();
 
  return data;
};



  

  return (
    <FirebaseContext.Provider value={{ create , details}}>
      {children}
    </FirebaseContext.Provider>
  );
};
