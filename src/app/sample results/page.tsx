"use client";
import React from "react";
import Sidebar from "@/app/components/sidebar";
import Image from "next/image";
import Plant from "@/app/assets/hero-img.jpeg";

import Guide1 from "@/app/assets/guide-1.webp";
import Guide2 from "@/app/assets/guide-2.jpg";
import Guide3 from "@/app/assets/guide-3.jpg";
import ChatWidget from "../components/chat";

const Page = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <ChatWidget />
      <div
        style={{
          flex: 1,
          marginLeft: "80px",
          overflowY: "auto",
          paddingBottom: "20px",
        }}
      >
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
                Our AI analyzes the image to identify diseases and conditions
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

        <div className="w-full flex flex-col h-full px-4 justify-center">
          <div className="text-2xl font-extrabold mb-4">Diagnosis Report</div>
          <div className="flex items-center justify-center">
            <Image
              src={Plant}
              alt="Plant Image"
              className="w-[80%] h-200px rounded-xl"
            />
          </div>
          <div className="mt-2 text-lg font-bold">
            Identified Disease: Leaf Spot
          </div>
          <div className="w-full flex flex-row gap-4">
            <div className="flex items-center text-sm ">
              <div>Severity:</div>
              <div className="bg-[#437A00] p-1 w-[80px] font-bold text-white rounded-lg flex justify-center ml-2">
                Low
              </div>
            </div>
            <div className="flex items-center text-sm ">
              <div>Confidence Level:</div>
              <div className="bg-[#437A00] p-1 w-[80px] font-bold text-white rounded-lg flex justify-center ml-2">
                90%
              </div>
            </div>
          </div>
          <div className="mt-4 font-bold text-lg">Disease Overview</div>

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-700">
              Septoria is a fungal disease that primarily affects plants,
              particularly crops like tomatoes, beans, and other members of the
              Solanaceae family. It is caused by various species of the Septoria
              genus, with Septoria lycopersici and Septoria tritici being two
              common culprits in tomato and wheat, respectively.
            </div>
          </div>
          <div className="mt-4 font-bold text-lg">
            Treatment Recommendations
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex w-full justify-between items-center">
              <div className="font-bold">Remove Infected Leaves</div>
              <div className="text-xs px-2 py-1 rounded-full bg-red-700 font-bold text-white flex justify-center">
                High Priority
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-2">
              Carefully remove and dispose of infected leaves to prevent spread.
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200 mt-2">
            <div className="flex w-full justify-between items-center">
              <div className="font-bold">Apply Fungicide</div>
              <div className="text-xs px-2 py-1 rounded-full bg-orange-600 font-bold text-white flex justify-center">
                Moderate Priority
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-2">
              Carefully remove and dispose of infected leaves to prevent spread.
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200 mt-2">
            <div className="flex w-full justify-between items-center">
              <div className="font-bold">Water At Base</div>
              <div className="text-xs px-2 py-1 rounded-full bg-green-700 font-bold text-white flex justify-center">
                Low Priority
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-2">
              Water at the base of plants to keep foliage dry.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
