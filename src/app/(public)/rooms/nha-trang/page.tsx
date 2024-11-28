import NhaTrang from "@/app/(public)/rooms/nha-trang/NhaTrang";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="bg-[url('/assets/banner/nha-trang.jpg')] h-96 bg-bottom bg-cover flex justify-center items-center">
        <p
          className="text-3xl font-semibold  text-accent"
          style={{ textShadow: "2px 2px #FF0000" }}
        >
          Thành phố Nha Trang
        </p>
      </div>
      <NhaTrang />
    </div>
  );
}
