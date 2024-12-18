"use client";
import QuickSearch from "@/app/(public)/(QuickSearch)/QuickSearch";

import Logo from "@/app/(public)/Logo";
import MenuDropDown from "@/app/(public)/MenuDropDown";
import DarkModeToggle from "@/components/dark-mode-toggle";
import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
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
