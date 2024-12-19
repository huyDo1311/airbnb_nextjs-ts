import PhuQuoc from "@/app/(public)/rooms/phu-quoc/PhuQuoc";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="bg-[url('/assets/banner/phu-quoc.jpg')] fixed inset-0 w-full h-full -z-20 bg-bottom bg-cover"></div>
      <PhuQuoc />
      <BackgroundBeams className="-z-10" />
    </div>
  );
}
