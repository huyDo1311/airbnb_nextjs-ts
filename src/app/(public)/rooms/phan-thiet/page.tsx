import PhanThiet from "@/app/(public)/rooms/phan-thiet/PhanThiet";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="bg-[url('/assets/banner/phan-thiet.jpg')] fixed inset-0 w-full h-full -z-20 bg-bottom bg-cover">
        <p
          className="text-3xl font-semibold  text-accent text-white"
          style={{ textShadow: "2px 2px #FF0000" }}
        >
          Thành phố Phan Thiết
        </p>
      </div>
      <PhanThiet />
    </div>
  );
}
