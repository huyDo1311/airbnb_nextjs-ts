import HaNoi from "@/app/(public)/rooms/ha-noi/HaNoi";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="bg-[url('/assets/banner/ha-noi.jpg')] h-full w-full inset-0 fixed -z-20 bg-center bg-cover "></div>
      <HaNoi />
    </div>
  );
}
