"use client";
import { useStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  let { resetQuickSearch, setRemoveDataHeader } = useStore();
  let handleDeleteStorage = () => {
    resetQuickSearch();
    setRemoveDataHeader();
  };
  return (
    <div onClick={handleDeleteStorage}>
      <Link href="/">
        <Image
          alt="logo"
          src="/assets/airbnb-desktop.png"
          width={100}
          height={100}
          className="w-24 md:block hidden"
        />
        <Image
          alt="logo"
          src="/assets/airbnbmobile.png"
          width={100}
          height={100}
          className="w-16 md:hidden block"
        />
      </Link>
    </div>
  );
}
