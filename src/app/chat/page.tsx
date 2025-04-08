"use client";
import React from "react";
import Sidebar from "@/app/components/sidebar";
import { MessageCircleQuestion } from "lucide-react";

const Page = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <Sidebar />
      <div className="flex flex-1 ml-20 px-8 py-12 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto flex flex-col justify-center space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MessageCircleQuestion className="w-8 h-8 text-green-400" />
              <h1 className="text-3xl font-bold">Chat With A Botanist</h1>
            </div>

            <p className="text-gray-400 mb-6">
              Not sure how to care for your plants? Connect with one of our
              expert botanists to receive personalized guidance for your plant
              care journey.
            </p>
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-semibold">Get Real-Time Help 🌱</h2>
            <p className="text-gray-400">
              Ask questions, share pictures, and get advice from professionals
              who love plants as much as you do.
            </p>{" "}
            <textarea
              className="w-full bg-[#2A2A2A] rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={4}
              placeholder="Type your message here..."
            ></textarea>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-6 py-2 w-fit">
              Send Message
            </button>
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-semibold">Chat History</h2>
            <div className="space-y-3">
              {[
                {
                  name: "Dr Peanut",
                  message: "Don't forget to mist your Monstera",
                  date: "Apr 5, 2025",
                },
                {
                  name: "Mr Potato",
                  message:
                    "Remember to keep indirect light for your snake plant",
                  date: "Apr 3, 2025",
                },
                {
                  name: "Cheng",
                  message: "Try a well-draining soil mix for your succulents.",
                  date: "Mar 30, 2025",
                },
                {
                  name: "Alex",
                  message: "Watch out for overwatering signs on your aloe.",
                  date: "Mar 27, 2025",
                },
              ].map((chat, index) => (
                <div
                  key={index}
                  className="bg-[#2A2A2A] rounded-xl px-4 py-3 flex justify-between items-start hover:bg-[#333333] transition"
                >
                  <div>
                    <h3 className="font-semibold">{chat.name}</h3>
                    <p className="text-gray-400 text-sm">{chat.message}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{chat.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
