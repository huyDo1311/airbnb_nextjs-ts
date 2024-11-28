"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateBefore, DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { vi } from "date-fns/locale";
import { useStore } from "@/store/store";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  console.log(date);
  React.useEffect(() => {
    setDataCalendar(date);
  }, [date]);
  const [active, setActive] = React.useState(false);
  const [click, setClick] = React.useState<string | null>(null);
  const matcher: DateBefore = { before: new Date() };
  let { NextStep, setDataCalendar } = useStore();
  function useOutsideAlerter(ref: any, ref2: any) {
    React.useEffect(() => {
      function handleClickOutside(event: any) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          ref2.current &&
          !ref2.current.contains(event.target)
        ) {
          console.log("1");
          setActive(false);
          setClick(null);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  React.useEffect(() => {
    if (NextStep === 1) setActive(true);
    else setActive(false);
  }, [NextStep]);
  let handleClick = (id: string) => {
    if (id === click) {
      setActive(false);
      setClick(null);
    } else {
      setActive(true);
      setClick(id);
    }
  };
  const wrapperRef = React.useRef(null);
  const wrapperRef2 = React.useRef(null);
  useOutsideAlerter(wrapperRef, wrapperRef2);
  return (
    <div
      className={cn(
        `cursor-pointer 
s        flex  after:border-r items-center`,
        className
      )}
    >
      <Popover open={active}>
        <PopoverTrigger asChild>
          <div className="w-[300px] h-full flex group" ref={wrapperRef}>
            <div className={`w-1/2     h-full`}>
              <Button
                onClick={() => {
                  handleClick("button1");
                }}
                id="date1"
                variant={"ghost"}
                className={cn(
                  `    cursor-pointer 
                items-center
                group-hover:after:h-0
after:h-10  after:border-r before:h-10 before:border-l

               
             text-left w-full h-full focus:bg-red-400 rounded-full  `
                )}
              >
                {date?.from ? (
                  <div className="w-full flex-col items-center flex">
                    <div className="w-full">
                      <p className="font-semibold text-xs">Nhận phòng</p>

                      <p className="text-md">
                        {format(date.from, "dd MMM", { locale: vi })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex-col items-center flex">
                    <div className="w-full">
                      <p className="font-semibold text-xs">Nhận phòng</p>
                      <p className="text-gray-400 font-light text-md">
                        Thêm ngày
                      </p>
                    </div>
                  </div>
                )}
              </Button>
            </div>
            <div className="w-1/2     h-full">
              {" "}
              <Button
                onClick={() => {
                  handleClick("button2");
                }}
                variant={"ghost"}
                id="date2"
                className={cn(
                  `group w-full h-full text-left rounded-full focus:bg-red-400 
                 after:h-10  after:border-r
                hover:after:h-0`
                )}
              >
                {date?.to ? (
                  <div className="w-full  flex-col items-center flex">
                    <div className="w-full">
                      {" "}
                      <p className="font-semibold text-xs">Trả phòng</p>
                      <p className="text-md">
                        {format(date.to, "dd MMM", { locale: vi })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex-col items-center flex">
                    <div className="w-full">
                      <p className="font-semibold text-xs">Trả phòng</p>
                      <p className="text-gray-400 font-light text-md">
                        Thêm ngày
                      </p>
                    </div>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className=" rounded-2xl w-auto"
          align="center"
          ref={wrapperRef2}
        >
          <div className="flex justify-center">
            <Calendar
              locale={vi}
              disabled={matcher}
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              captionLayout="dropdown"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}


