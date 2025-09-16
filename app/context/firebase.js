"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const create = async (nickname, description, profilePic, links) => {
    const ref = collection(firestore, "users");

    const res = await addDoc(ref, {
      Name: nickname,
      Desc: description,
      ProfilePic: profilePic,
      Links: links,
    });

    return res;
  };
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

  const signinUserWithEmailAndPass = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  };

  const signupUserWithEmailAndPass = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  };

  const signinwithgoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.error("Google Login Error:", error.message);
      alert(error.message);
    }
  };

 

  const isLogin = user != null;

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isLogin,
        create,
        details,
        signinUserWithEmailAndPass,
        signupUserWithEmailAndPass,
        signinwithgoogle,
       
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
