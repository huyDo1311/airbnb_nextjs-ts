import HoChiMinh from "@/app/(public)/rooms/ho-chi-minh/HoChiMinh";
import CustomCursor from "@/components/CustomCursor";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export default function page() {
  return (
    <div className="relative">
      <div className="bg-[url('/assets/banner/hcm.jpg')] fixed inset-0 w-full h-full -z-20 bg-bottom bg-cover  "></div>
      <HoChiMinh />
    </div>
  );
}
