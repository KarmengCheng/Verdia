import React from "react";
import "@/app/globals.css";
import Image from "next/image";
import bgImage from "@/assets/bg-image.png";

export default function Home() {
  return (
    <section className="relative min-h-screen">
      <Image
        src={bgImage}
        alt="Background"
        fill
        className="object-cover z-0"
        quality={100}
      />
      <div className="relative z-10 w-full justify-center items-center align-center flex"></div>
    </section>
  );
}
