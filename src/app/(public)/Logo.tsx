"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  let handleDeleteStorage = () => {
    window.location.reload;
  };
  return (
    <div>
      <Link href="/">
        <Image
          onClick={handleDeleteStorage}
          alt="logo"
          src="/assets/airbnb-desktop.png"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
}
