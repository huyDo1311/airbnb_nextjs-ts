"use client";

import Logo from "@/app/(public)/Logo";
import MenuDropDown from "@/app/(public)/MenuDropDown";
import DarkModeToggle from "@/components/dark-mode-toggle";

export default function HeaderMobile() {
  return (
    <header className=" bg-white dark:bg-black z-20 fixed w-full top-0 shadow-lg ">
      <div className={` flex justify-between items-center p-5 px-10`}>
        <Logo />

        <div className="flex items-center space-x-3">
          <MenuDropDown />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
