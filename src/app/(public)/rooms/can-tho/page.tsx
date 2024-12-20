import CanTho from "@/app/(public)/rooms/can-tho/CanTho";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="bg-[url('/assets/banner/can-tho.jpg')] -z-20 h-full w-full inset-0 bg-bottom fixed "></div>
      <CanTho />
    </div>
  );
}
