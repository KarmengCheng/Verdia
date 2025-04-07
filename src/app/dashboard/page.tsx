"use client";
import React from "react";
import { Thermometer, Cloudy, Droplet, MapPin } from "lucide-react";
import Sidebar from "@/app/components/sidebar";
import dashboardImg from "@/app/assets/dashboard-img.jpg";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ChatWidget from "../components/chat";
const Page = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <Sidebar />
      <ChatWidget />
      <div className="flex-1 flex-col ml-20 flex justify-center px-5">
        <div className="flex items-center justify-between text-2xl font-bold gap-2 text-white">
          <div>
            Welcome Back
            <span className="text-sm text-gray-400 ml-2">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="mt-4 text-sm gap-2 flex flex-row bg-gray-700 w-fit p-2.5 rounded-3xl justify-center items-center">
          <MapPin color="#14C984" size={16} />
          <span className="text-white text-s">Sungai Buloh</span>
        </div>

        <div className="grid gap-5 mt-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div className="bg-[#1E1E1E] rounded-lg p-5 shadow-md shadow-black/50">
            <div className="flex justify-between items-center">
              <div className="flex-1 text-center">
                <h4 className="font-bold text-sm mb-2">Humidity</h4>
                <div className="flex items-center justify-center gap-1">
                  <Droplet size={20} color="#14C984" />
                  <p className="font-bold text-base text-white">63%</p>
                </div>
              </div>

              <div className="flex-1 text-center">
                <h4 className="font-bold text-sm mb-2">Temperature</h4>
                <div className="flex items-center justify-center gap-1">
                  <Thermometer size={20} color="#14C984" />
                  <p className="font-bold text-base text-white">23°C</p>
                </div>
              </div>

              <div className="flex-1 text-center">
                <h4 className="font-bold text-sm mb-2">Weather</h4>
                <div className="flex items-center justify-center gap-1">
                  <Cloudy size={23} color="#14C984" />
                  <p className="font-bold text-base text-white">Cloudy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="relative mt-4 w-full h-[300px] rounded-3xl shadow-lg overflow-hidden">
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
              <div className="mt-2 p-2 bg-white/30 text-white backdrop-blur-lg w-[160px] flex items-center justify-center font-bold text-sm rounded-xl cursor-pointer">
                GET STARTED
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-5 gap-5">
          <Card className="bg-[#1E1E1E] text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">130</div>
              <p className="text-xs text-gray-400 mt-1">
                <span className="text-emerald-500">↑ 12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#1E1E1E] text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Today&apos;s Pending Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">5</div>
              <p className="text-xs text-gray-400 mt-1">
                Check <span className="font-bold text-emerald-500">Here</span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#1E1E1E] text-white border-none col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Tomato Leaf",
                    disease: "Blight",
                    date: "Apr 5, 2025",
                  },
                  {
                    name: "Rose Leaf",
                    disease: "Black Spot",
                    date: "Apr 4, 2025",
                  },
                  {
                    name: "Wheat Stem",
                    disease: "Rust",
                    date: "Apr 3, 2025",
                  },
                ].map((scan, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 w-full bg-[#2A2A2A] rounded-lg p-3"
                  >
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between items-start w-full">
                        <p className="font-medium text-white">{scan.name}</p>
                        <p className="text-xs text-gray-500">{scan.date}</p>
                      </div>
                      <p className="text-sm text-[#14c984] mt-1">
                        Detected: {scan.disease}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-4">
                View all scans in the{" "}
                <span className="font-bold text-emerald-500">History</span>{" "}
                section.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
