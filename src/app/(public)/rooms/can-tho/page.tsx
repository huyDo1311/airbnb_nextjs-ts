import CanTho from "@/app/(public)/rooms/can-tho/CanTho";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="bg-[url('/assets/banner/can-tho.jpg')] h-96 bg-bottom bg-cover flex justify-center items-center">
        <p
          className="text-3xl font-semibold  text-accent"
          style={{ textShadow: "2px 2px #FF0000" }}
        >
          Thành phố Cần Thơ
        </p>
      </div>
      <CanTho />
    </div>
  );
}
