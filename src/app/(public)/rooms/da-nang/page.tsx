import DaNang from "@/app/(public)/rooms/da-nang/DaNang";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="bg-[url('/assets/banner/da-nang.jpg')] h-full w-full inset-0 fixed -z-20 bg-center bg-cover "></div>
      <DaNang />
    </div>
  );
}
