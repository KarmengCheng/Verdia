"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/lib/auth";
import Image from "next/image";
import Logo from "@/app/assets/leaflens.svg";
import Hero from "@/app/assets/hero-img.jpeg";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white w-full">
      {/* Background Image */}
      <Image
        src={Hero}
        alt="Hero Image"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 z-0"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* Login Content */}
      <div className="relative z-20 w-[70%] items-center justify-center flex flex-col">
        <div className="text-sm text-white/80 font-bold">
          Welcome Back to Verdia
        </div>
        <div className="flex items-center mt-4">
          <Image src={Logo} alt="Verdia AI Logo" className="w-12 h-10 mr-2" />
          <div className="text-4xl font-black">Verdia</div>
        </div>
        <div className="text-sm text-center mt-4 font-bold text-white/80">
          Healthy plants start with early detection. Grow smarter with Verdia
          AI for happy harvests.
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="mt-6 bg-black/40 backdrop-blur-3xl p-8 rounded-lg shadow-md w-full max-w-md mx-auto"
        >
          <div className="text-lg text-white font-bold mb-4">Login</div>

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm font-bold mt-3">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-[#14c984] text-white py-2 rounded-md hover:bg-green-700 cursor-pointer transition duration-200 ease-in-out"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
