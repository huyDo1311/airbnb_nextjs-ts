import RoomDetails from "@/app/(public)/room-detail/[query]/RoomDetails";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div className="xl:w-[1450px] w-full px-10 lg:px-20 py-5 flex justify-center z-50">
      <div className="w-full">
        <RoomDetails />
      </div>
    </div>
  );
}
