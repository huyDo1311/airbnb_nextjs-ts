import DaLat from "@/app/(public)/rooms/da-lat/DaLat";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="bg-[url('/assets/banner/da-lat.jpg')] fixed inset-0 -z-20 h-full w-full bg-center bg-cover"></div>
      <DaLat />
    </div>
  );
}
