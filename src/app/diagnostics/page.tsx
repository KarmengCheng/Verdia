"use client";
import React from "react";
import Sidebar from "@/app/components/sidebar";
import { ImageUploader } from "@/app/components/image-uploader";

const Page = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          marginLeft: "80px",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <h2 className="text-xl font-semibold text-gray-700">
            Upload Your Image
          </h2>
          <div className="text-sm text-gray-500 mb-4">
            Please upload an image of your plant for diagnostics.
          </div>
          <ImageUploader />
        </div>
      </div>
    </div>
  );
};

export default Page;
