"use client";
import { CustomerPicker } from "@/app/(public)/(QuickSearch)/CustomerPicker";
import { DatePickerWithRange } from "@/app/(public)/(QuickSearch)/DatePickerWithRange";
import { PickDestination } from "@/app/(public)/(QuickSearch)/PickDestination";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyButton from "@/components/ui/shiny-button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Data {
  id: number;
  hinhAnh: string;
  quocGia: string;
  tenViTri: string;
  tinhThanh: string;
}
interface dataApi {
  data: Data[];
  keywords: null;
  pageIndex: number;
  pageSize: number;
  totalRow: number;
}
export interface destination {
  content: dataApi;
  dateTime?: string;
}
type QuickSearchProps = {
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  isMinimized: boolean;
};

export default function QuickSearch({
  setIsMinimized,
  isMinimized,
}: QuickSearchProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
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
    }
  }, [isMinimized]);

  return (
    <div className="flex justify-center rounded-full border-2">
      <RainbowButton
        className={`flex justify-center  overflow-hidden  h-full rounded-full px-0  ${
          isMinimized ? "hidden" : "w-[880px] h-[60px]"
        } `}
      >
        <PickDestination />
        <DatePickerWithRange />
        <CustomerPicker />
      </RainbowButton>

      <ShinyButton
        onClick={() => setIsMinimized(!isMinimized)}
        className={`text-md flex   
         p-3  px-5 rounded-full border border-red-500 dark:border-white text-gray-500 ${
           !isMinimized ? "hidden" : ""
         }`}
      >
        <p>Địa điểm bất kì</p>
        <p className="border-x-2 px-2 mx-4">Thời gian bất kì</p>
        <p>Thêm khách</p>
        <div className="flex items-center ml-2 justify-center bg-red-400 rounded-full w-8 h-8">
          <Search className="text-white" size={20} />
        </div>
      </ShinyButton>
    </div>
  );
}
