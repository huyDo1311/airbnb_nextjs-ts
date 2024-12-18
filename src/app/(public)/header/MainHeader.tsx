"use client";
import HeaderDesktop from "@/app/(public)/header/HeaderDesktop";
import HeaderMobile from "@/app/(public)/header/HeaderMobile";
import HeaderTablet from "@/app/(public)/header/HeaderTablet";
import React from "react";
import MediaQuery from "react-responsive";

export default function MainHeader() {
  return (
    <div className="">
      <MediaQuery maxWidth={767}>
        <HeaderMobile />
      </MediaQuery>
      <MediaQuery minWidth={768} maxWidth={1279}>
        <HeaderTablet />
      </MediaQuery>

      <MediaQuery minWidth={1280}>
        <HeaderDesktop />
      </MediaQuery>
    </div>
  );
}
