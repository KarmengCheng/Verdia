"use client";
import React from "react";
import Sidebar from "@/app/components/sidebar";
import { ImageUploader } from "@/app/components/image-uploader";
import ChatWidget from "../components/chat";

const Page = () => {
  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Sidebar />
      <ChatWidget />
      <div className="ml-20 overflow-y-auto px-5 py-8  items-center justify-center">
        <div className="max-w-3xl w-full">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Upload Your Image
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Get an analysis of your plant and its disease by uploading a clear
            picture of it.
          </p>
          <ImageUploader />
        </div>
      </div>
    </div>
  );
};

export default Page;
