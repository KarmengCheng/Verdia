"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

export function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white border-[#f2f2f2] border p-6 rounded-2xl shadow-lg">
      <div className="text-center mb-6"></div>
      <form>
        <div className="space-y-6">
          <div
            className="h-[300px] relative flex flex-col items-center justify-center rounded-lg p-6 cursor-pointer border-2 border-gray-200 bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">
              Click to upload your image
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>

          {selectedImage && (
            <div className="relative mt-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <div className="absolute top-2 right-2 z-10">
                <button
                  type="button"
                  className="h-8 w-8 rounded-full bg-red-700 text-white flex items-center justify-center"
                  onClick={handleClearImage}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative aspect-video w-full">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Preview"
                  layout="fill"
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {!selectedImage && (
            <div className="mt-4  rounded-lg p-8 flex flex-col items-center justify-center text-gray-400  border-2 border-gray-200 bg-gray-50 ">
              <ImageIcon className="h-12 w-12 mb-2" />
              <p className="text-sm">Image preview will appear here</p>
            </div>
          )}
        </div>
      </form>
      <div className="mt-6 w-full flex justify-end">
        <button className="py-2 px-6 bg-[#14c984] text-white font-bold rounded-lg">
          Analyze Image
        </button>
      </div>
    </div>
  );
}
