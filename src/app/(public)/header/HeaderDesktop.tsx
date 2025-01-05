"use client";
import QuickSearch from "@/app/(public)/(QuickSearch)/QuickSearch";
import Logo from "@/app/(public)/Logo";
import MenuDropDown from "@/app/(public)/MenuDropDown";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { BorderBeam } from "@/components/ui/border-beam";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";

export default function HeaderDesktop() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
  let { hideHeader } = useStore();
  return (
    <header
      className={`fixed w-full top-0 flex justify-between items-center 
        transition-all duration-300 ease-in-out
        
        p-4 ${
          isMinimized ? "h-20" : "h-32"
        }   transition-all ease-in-out duration-500 bg-white dark:bg-black ${
        hideHeader ? "-z-10" : "z-20"
      }  shadow-lg px-10`}
    >
      <Logo />

      <QuickSearch setIsMinimized={setIsMinimized} isMinimized={isMinimized} />

      <div className="flex  space-x-3">
        <MenuDropDown />
        <DarkModeToggle />
      </div>
      <BorderBeam />
    </header>
  );
}
