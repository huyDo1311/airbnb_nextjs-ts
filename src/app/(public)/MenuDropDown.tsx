import Signin from "@/app/(public)/auth/AuthBox";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Menu, UserRound } from "lucide-react";
import React from "react";

export default function MenuDropDown() {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-3xl  px-12 py-6 w-20">
            <div className=" w-8 h-8 flex justify-center items-center space-x-4">
              <Menu size={50} />
              <svg
                className="opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  fill: "currentcolor",
                }}
              >
                <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z" />
              </svg>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 h-80 shadow-2xl rounded-2xl z-20 bg-white p-5 space-y-3">
          <Signin />
          <p className="text-md font-normal">Đăng ký</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
