"use client";
import React, { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-[#14c948] cursor-pointer hover:bg-green-700 text-white p-3 rounded-full shadow-lg z-50"
      >
        <MessageCircleQuestion size={24} />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-96 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">
          <div className="bg-[#14c948] text-white font-bold px-4 py-4">
            Chat Support
          </div>
          <div className="p-3 space-y-3 h-[500px] overflow-y-auto text-sm">
            <div className="bg-gray-100 p-2 rounded-md self-start max-w-[80%]">
              🌱 Hi! How can I help you with your plant today?
            </div>
            <div className="bg-green-300 p-2 rounded-md self-end max-w-[80%] ml-auto">
              My tomato leaves are turning yellow.
            </div>
            <div className="bg-gray-100 p-2 rounded-md self-start max-w-[80%]">
              That could be a sign of overwatering or lack of nitrogen.
            </div>
          </div>
          <div className="flex items-center border-t border-gray-200 px-4 py-2">
            <input
              type="text"
              className="flex-1 text-sm px-2 py-2 rounded-md border border-gray-200"
              placeholder="Type a message..."
              disabled
            />
            <button className="ml-2 text-sm text-gray-500" disabled>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
