"use client";

import React, { useState } from "react";
import Logo from "@/app/assets/leaflens.svg";
import Hero from "@/app/assets/hero-img.jpeg";
import Image from "next/image";
import { signUp } from "@/app/lib/auth"; // ✅ Firebase auth function
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(email, password);
      router.push("/dashboard"); // ✅ Redirect on success
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white w-full">
      <Image
        src={Hero}
        alt="Hero Image"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 z-0"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      <div className="w-[70%] items-center justify-center flex flex-col relative z-20">
        <div className="text-sm text-white/80 font-bold">
          The Smarter Way To Grow
        </div>
        <div className="flex items-center mt-4">
          <Image src={Logo} alt="Verdia AI Logo" className="w-12 h-10 mr-2" />
          <div className="text-4xl font-black">Verdia AI</div>
        </div>
        <div className="text-sm text-center mt-4 font-bold text-white/80">
          Healthy plants start with early detection. Grow smarter with Verdia
          AI for happy harvests.
        </div>

        <form
          className="mt-6 bg-black/40 backdrop-blur-3xl p-8 rounded-lg shadow-md w-full"
          onSubmit={handleSignUp}
        >
          <div className="text-lg text-white font-bold mb-4">
            Create an Account
          </div>

          <label
            htmlFor="email"
            className="block text-gray-400 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 text-sm text-gray-300 bg-[#2a2a2a] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            htmlFor="password"
            className="block text-gray-400 text-sm font-medium mt-4 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 text-sm text-gray-300 bg-[#2a2a2a] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="text-red-500 text-sm font-bold mt-3">{error}</div>
          )}

          <button
            type="submit"
            className="mt-4 w-full bg-[#14c984] text-white py-2 rounded-md hover:bg-green-700 cursor-pointer transition duration-200 ease-in-out"
          >
            Sign Up
          </button>

          <div className="text-sm text-gray-400 font-bold mt-4 text-center">
            Already have an account?
            <span className="text-[#14c984]"> Log In Here</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
