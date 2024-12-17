"use client";
import HeaderDesktop from "@/app/(public)/header/headerDesktop";
import HeaderMobile from "@/app/(public)/header/HeaderMobile";
import HeaderTablet from "@/app/(public)/header/HeaderTablet";
import React from "react";
import MediaQuery from "react-responsive";

export default function MainHeader() {
  return (
    <div>
      <MediaQuery maxWidth={767}>
        <HeaderMobile />
      </MediaQuery>
      <MediaQuery minWidth={768} maxWidth={1023}>
        <HeaderTablet />
      </MediaQuery>

      <MediaQuery minWidth={1024}>
        <HeaderDesktop />
      </MediaQuery>
    </div>
  );
}
