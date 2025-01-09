"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { vi } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import classNames from "classnames";

export function BirthdayPicker({ field }: any) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [active, setActive] = React.useState(false);
  const [activeMonth, setActiveMonth] = React.useState(false);
  const [activeYear, setActiveYear] = React.useState(false);
  const [disableMonth, setdisableMonth] = React.useState<boolean>(false);
  const startYear = getYear(new Date()) - 100;
  const endYear = getYear(new Date());
  const [selectMonthNe, setselectMonthNe] = React.useState<any>();
  const endMonth = new Date().getMonth() + 1;
  const months: any = [
    { id: 1, month: "Tháng 1" },
    { id: 2, month: "Tháng 2" },
    { id: 3, month: "Tháng 3" },
    { id: 4, month: "Tháng 4" },
    { id: 5, month: "Tháng 5" },
    { id: 6, month: "Tháng 6" },
    { id: 7, month: "Tháng 7" },
    { id: 8, month: "Tháng 8" },
    { id: 9, month: "Tháng 9" },
    { id: 10, month: "Tháng 10" },
    { id: 11, month: "Tháng 11" },
    { id: 12, month: "Tháng 12" },
  ];

  // Handle the date selection

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      setDate(selectedData);
      setActive(true);
      field.onChange(selectedData); // Pass selected date back to react-hook-form
    }
  };

  const handleMonthChange = (month: string) => {
    setselectMonthNe(month);
  };

  React.useEffect(() => {
    if (selectMonthNe) {
      let findMonth = months.findIndex(
        (item: any) => item.month == selectMonthNe
      );
      const newDate = setMonth(date!, findMonth);
      setDate(newDate);
      setActiveMonth(true);
      field.onChange(newDate); // Update react-hook-form with new month value
    }
  }, [selectMonthNe]);

  const handleYearChange = (year: string) => {
    if (parseInt(year) === endYear) {
      setdisableMonth(true);
      // setActiveMonth(true);
      //  let newDate = setMonth(date!, 0);
      // setDate(newDate);
    } else {
      setdisableMonth(false);
    }
    const newDate = setYear(date!, parseInt(year));
    setDate(newDate);
    setActiveYear(true);

    field.onChange(newDate); // Update react-hook-form with new year value
  };

  const NewYears = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    return startYear + i;
  });
  const years = NewYears.toReversed();

  const currentMonth = getMonth(new Date());
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " w-full justify-star bg-transparent text-left font-normal flex justify-start"
          )}
        >
          <CalendarIcon />
          {active || activeMonth || activeYear ? (
            format(date!, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span>Chọn sinh nhật</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white rounded-xl shadow-lg dark:bg-black"
        align="center"
      >
        <div className="flex justify-between px-4 pt-4">
          <Select
            onValueChange={handleMonthChange}
            value={active || activeMonth ? months[getMonth(date!)].month : ""} // Ensure month is a string value (month name)
          >
            <SelectTrigger className="w-[140px] p-2">
              <SelectValue placeholder="tháng" />
            </SelectTrigger>
            <SelectContent>
              {months.map((item: any) => {
                return (
                  <SelectItem
                    className={classNames({
                      "pointer-events-none opacity-30":
                        item.id - 1 > currentMonth && disableMonth,
                    })}
                    key={item.id}
                    value={item.month}
                  >
                    {item.month}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select
            onValueChange={handleYearChange}
            value={active || activeYear ? getYear(date!).toString() : ""} // Ensure year is a string value
          >
            <SelectTrigger className="w-[140px] p-2">
              <SelectValue placeholder="Năm" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year: number) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          required
          locale={vi}
          mode="single"
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          selected={date}
          toMonth={new Date(2025, currentMonth)}
          month={date}
          onMonthChange={setDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
