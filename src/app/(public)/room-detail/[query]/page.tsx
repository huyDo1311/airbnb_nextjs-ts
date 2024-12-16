import LoadingSkeleton from "@/app/(public)/LoadingSkeleton";
import Loading from "@/app/(public)/room-detail/[query]/loading";
import RoomDetails from "@/app/(public)/room-detail/[query]/RoomDetails";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div className="w-full z-50">
      <RoomDetails />
    </div>
  );
}
