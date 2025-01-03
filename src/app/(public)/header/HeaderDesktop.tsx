"use client";
import QuickSearch from "@/app/(public)/(QuickSearch)/QuickSearch";
import Logo from "@/app/(public)/Logo";
import MenuDropDown from "@/app/(public)/MenuDropDown";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { useStore } from "@/store/store";
import React from "react";

export default function HeaderDesktop() {
  let { hideHeader } = useStore();
  return (
    <header
      className={`fixed w-full top-0 flex justify-between items-center p-4  bg-white dark:bg-black ${
        hideHeader ? "-z-10" : "z-20"
      }  shadow-lg px-10`}
    >
      <Logo />

      <div className="focus:bg-black ">
        <QuickSearch />
      </div>

      <div className="flex items-center space-x-3">
        <MenuDropDown />
        <DarkModeToggle />
      </div>
    </header>
  );
}
