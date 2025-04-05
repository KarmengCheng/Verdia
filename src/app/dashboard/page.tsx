"use client";
import React from "react";
import { Thermometer, Cloudy, Droplet, MapPin } from "lucide-react";
import Sidebar from "@/app/components/sidebar";
import dashboardImg from "@/app/assets/dashboard-img.jpg";
import Image from "next/image";

import Guide1 from "@/app/assets/guide-1.webp";
import Guide2 from "@/app/assets/guide-2.jpg";
import Guide3 from "@/app/assets/guide-3.jpg";

const Page = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: "80px",
          overflowY: "auto",
        }}
      >
        <div
          className="flex items-center justify-between text-2xl font-bold text-[#303030]"
          style={{ gap: "10px" }}
        >
          <div>
            Welcome Back
            <span className="text-sm text-gray-600 ml-2">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500 gap-2 flex flex-row bg-orange-500 w-fit p-2 rounded-3xl items-center">
          <MapPin color="#ffffff" size={14} />
          <span className="text-white text-xs">Sungai Buloh</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1, textAlign: "center" }}>
                <h4 className="font-bold text-sm mb-2">Humidity</h4>
                <div className="flex items-center justify-center gap-1">
                  <Droplet size={20} color="#14C984" />
                  <p className="font-bold text-base text-[#14C984]">63%</p>
                </div>
              </div>

              <div style={{ flex: 1, textAlign: "center" }}>
                <h4 className="font-bold text-sm mb-2">Temperature</h4>
                <div className="flex items-center justify-center gap-1">
                  <Thermometer size={20} color="#14C984" />
                  <p className="font-bold text-base text-[#14C984]">23°C</p>
                </div>
              </div>

              <div style={{ flex: 1, textAlign: "center" }}>
                <h4 className="font-bold text-sm mb-2">Weather</h4>
                <div className="flex items-center justify-center gap-1">
                  <Cloudy size={23} color="#14C984" />
                  <p className="font-bold text-base text-[#14C984]">Sunny</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mt-4 w-full h-[200px] rounded-3xl shadow-lg overflow-hidden">
            <Image
              src={dashboardImg}
              alt="Dashboard"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black to-transparent rounded-b-3xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="text-sm font-bold">
                AI-Powered Plant Disease Detection
              </h4>
              <p className="text-xs">
                Identify and treat plant diseases instantly with our advanced AI
                technology. Upload a photo and get accurate results in seconds.
              </p>
              <div className="mt-2 p-2 bg-[#14C984] w-[120px] flex items-center justify-center font-bold text-sm rounded-xl cursor-pointer">
                Get Started
              </div>
            </div>
          </div>
          <div className="relative mt-2 w-full h-[150px] rounded-xl shadow-lg overflow-hidden">
            <Image
              src={Guide1}
              alt="Dashboard"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black to-transparent rounded-b-3xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="text-sm font-bold">Upload</h4>
              <p className="text-xs">
                Take a photo of your plant or upload an existing image
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="relative mt-2 w-full h-[150px] rounded-xl shadow-lg overflow-hidden">
              <Image
                src={Guide2}
                alt="Dashboard"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black to-transparent rounded-b-3xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-sm font-bold">Analyze</h4>
                <p className="text-xs">
                  Our AI analyzes the image to identify diseases and conditions{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-2 w-full h-[150px] rounded-xl shadow-lg overflow-hidden">
            <Image
              src={Guide3}
              alt="Dashboard"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black to-transparent rounded-b-3xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="text-sm font-bold">Treat</h4>
              <p className="text-xs">
                Get personalized treatment recommendations and care instructions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
