"use client";

import React from "react";
import Logo from "@/app/assets/leaflens.svg";
import Hero from "@/app/assets/hero-img.webp";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white w-full">
        <Image
          src={Hero}
          alt="Hero Image"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        <div className="w-[80%] items-center justify-center flex flex-col relative z-20">
          <div className="text-base font-bold">The Smarter Way To Grow</div>
          <div className="flex items-center mt-4">
            <Image src={Logo} alt="LeafLens Logo" className="w-10 h-10 mr-2" />
            <div className="text-4xl font-black">LeafLens AI</div>
          </div>
          <div className="text-sm text-center mt-4">
            Healthy plants start with early detection. Frow smarter with
            LeafLens AI for happy harvests.
          </div>

          <form className="mt-6 bg-white p-8 rounded-lg shadow-md w-full">
            <div className="text-lg text-[#303030] font-bold mb-4">
              Create an Account
            </div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm  font-medium mt-4 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border  text-sm text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 cursor-pointer transition duration-200 ease-in-out"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Sign Up
            </button>
            <div className="text-sm text-[#303030] mt-4 text-center">
              Already have an account?
              <span className="text-green-500"> Log In Here</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
