import HoChiMinh from "@/app/(public)/rooms/ho-chi-minh/HoChiMinh";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="bg-[url('/assets/banner/hcm.jpg')] h-96 bg-bottom bg-cover flex justify-center items-center">
        <p
          className="text-3xl font-semibold  text-accent"
          style={{ textShadow: "2px 2px #FF0000" }}
        >
          Thành phố Hồ Chí Minh
        </p>
      </div>
      <HoChiMinh />
    </div>
  );
}
