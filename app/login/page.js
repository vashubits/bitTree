'use client';
import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (firebase.isLogin) {
      router.push('/');
    }
  }, [firebase, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("⚠️ Please fill in both fields.");
      return;
    }

    try {
      const user = await firebase.signinUserWithEmailAndPass(email, password);
      if (user) {
        toast.success("🎉 Login successful!");
        setTimeout(() => router.push('/'), 1500);
      }
    } catch (error) {
      toast.error("❌ " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-200 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-700">
          Login to BitTree
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            LOGIN
          </button>
        </form>

        <div className="my-4 flex items-center justify-center">
          <span className="text-gray-500">OR</span>
        </div>

        <button
          onClick={firebase.signinwithgoogle}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
        >
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="Google"
            className="bg-white rounded-full p-0.5"
          />
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Need an account?{" "}
          <button
            onClick={() => router.push('/signup')}
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
};

export default LoginPage;
