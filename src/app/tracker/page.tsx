"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/sidebar";
import CalendarLogo from "@/app/assets/google-calendar-svgrepo-com.svg";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Sidebar />

      <div className="ml-20 flex flex-col flex-1 overflow-y-auto p-6 md:p-8">
        <div className="flex justify-end items-center mb-6">
          <button className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition">
            <Image src={CalendarLogo} alt="Calendar" width={24} height={24} />
            <span className="text-sm font-bold text-white">
              Google Calendar
            </span>
          </button>
        </div>

        <div className="flex flex-1 gap-6 flex-col">
          <div className="w-full md:w-1/3 bg-[#232323] rounded-lg p-4 overflow-hidden flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2 self-start">Select Date</h2>
            <div className="custom-datepicker">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date as Date)}
                inline
                calendarClassName="bg-[#2a2a2a] text-white rounded-lg p-4"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-[#232323] rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">
                Reminders for {selectedDate.toDateString()}
              </h2>
              <TaskCard />
              <TaskCard />
            </div>

            <div className="bg-[#232323] rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Completed Tasks</h2>
              <TaskCard />
              <TaskCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskCard = () => (
  <div className="w-full bg-[#2a2a2a] rounded-3xl text-lg px-4 py-2 mb-4 flex items-center">
    <div className="flex justify-between w-full items-center">
      <div className="text-base font-bold px-4">
        Check For Leaf Spots
        <div className="text-sm text-gray-400">Scan: Monstera Blight</div>
      </div>
      <div className="bg-amber-500 text-white p-2 rounded-xl text-sm font-bold">
        Moderate Priority
      </div>
    </div>
  </div>
);

export default Page;
