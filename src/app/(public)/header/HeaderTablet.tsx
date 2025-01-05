"use client";
import QuickSearch from "@/app/(public)/(QuickSearch)/QuickSearch";

import Logo from "@/app/(public)/Logo";
import MenuDropDown from "@/app/(public)/MenuDropDown";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";

export default function HeaderTablet() {
  let { hideHeader } = useStore();
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`bg-white dark:bg-black fixed w-full top-0 shadow-lg  ${
        hideHeader ? "-z-10" : "z-20"
      } `}
    >
      <div className={` flex justify-between items-center p-5 px-10`}>
        <Logo />

        <div className="flex items-center space-x-3">
          <MenuDropDown />
          <DarkModeToggle />
        </div>
      </div>
      <div className="focus:bg-black py-4 mx-14">
        <QuickSearch
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
        />
      </div>
    </header>
  );
}
