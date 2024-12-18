import QuickSearch from "@/app/(public)/(QuickSearch)/QuickSearch";
import Logo from "@/app/(public)/Logo";
import MenuDropDown from "@/app/(public)/MenuDropDown";
import DarkModeToggle from "@/components/dark-mode-toggle";
import React from "react";

export default function HeaderTablet() {
  return (
    <header className=" bg-white dark:bg-black z-20 fixed w-full top-0 shadow-lg ">
      <div className={` flex justify-between items-center p-5 px-10`}>
        <Logo />

        <div className="flex items-center space-x-3">
          <MenuDropDown />
          <DarkModeToggle />
        </div>
      </div>
      <div className="focus:bg-black py-4 mx-14">
        <QuickSearch />
      </div>
    </header>
  );
}
