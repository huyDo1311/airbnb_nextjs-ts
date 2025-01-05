"use client";

import { Button } from "@/components/ui/button";
import classNames from "classnames";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { typeContent } from "@/lib/helper.type";
import { CustomerType, useStore } from "@/store/store";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { CoolMode } from "@/components/ui/cool-mode";

interface DataDetail {
  dataDetail: typeContent;
}

export function CustomerPickerDetails({ dataDetail }: DataDetail) {
  const {
    customers,
    setCustomers,
    increment,
    decrement,
    total,
    customerDetails,
  } = useStore();

  // useEffect(() => {
  //   setTotal();
  // }, [increment, decrement]);
  const dataCustomers = [
    { id: "adults", label: "Người lớn", age: "Từ 13 tuổi trở lên" },
    { id: "children", label: "Trẻ em", age: "Độ tuổi 2-12" },
    { id: "babies", label: "Em bé", age: "Dưới 2 tuổi" },
    {
      id: "pets",
      label: "Thú cưng",
      age: "Bạn sẽ mang theo động vật để phục vụ?",
    },
  ];

  // Render customer details
  const renderCustomer = () => {
    return dataCustomers.map((item, index) => (
      <div
        key={item.id}
        className={`space-y-2 py-5 border-b ${
          index === 3 ? "" : "flex justify-between"
        }`}
      >
        <div>
          <p className="text-md font-semibold">{item.label}</p>
          <p
            className={`text-sm ${
              index === 3 ? "font-semibold underline" : "font-normal"
            } text-gray-500`}
          >
            {item.age}
          </p>
        </div>

        <div className="flex space-x-2 items-center">
          <CoolMode>
            <div
              onClick={() => decrement((item.id as keyof CustomerType) ?? 0)}
              className={`rounded-full border-2 h-10 w-10 flex items-center justify-center ${
                customers[item.id as keyof CustomerType] === 0 ||
                (item.id == "adults" &&
                  customers[item.id as keyof CustomerType] === 1)
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer"
              }`}
            >
              <Minus className="w-4 h-4" />
            </div>
          </CoolMode>

          <p className="w-10 text-center text-md">
            {customers[item.id as keyof CustomerType] ?? 0}
          </p>

          <div
            className={`${
              (item.id == "adults" || item.id == "children") &&
              total == customerDetails &&
              "cursor-not-allowed"
            }`}
          >
            <CoolMode>
              <div
                onClick={() => increment((item.id as keyof CustomerType) ?? 0)}
                className={classNames(
                  "rounded-full",
                  "w-10",
                  "h-10",
                  "flex justify-center items-center cursor-pointer",
                  "border-2",
                  {
                    "pointer-events-none opacity-30":
                      (item.id == "adults" || item.id == "children") &&
                      total == customerDetails,
                  },
                  {
                    "cursor-not-allowed":
                      (item.id == "babies" && customers.babies == 5) ||
                      (item.id == "pets" && customers.pets == 5),
                  }
                )}
              >
                <Plus className="w-4 h-4" />
              </div>
            </CoolMode>
          </div>
        </div>
      </div>
    ));
  };

  //   const buttonClass =  classNames({
  //     'cursor-not-allowed':

  // })

  return (
    <div className="relative border rounded-lg dark:border-white border-black w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full h-full flex justify-between text-left group"
          >
            <div>
              <p className="font-semibold text-xs">Khách </p>
              <p className="text-gray-400 font-light">{total}</p>
            </div>
            <ChevronDown className="group-focus:rotate-180 transition duration-500" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="sm:w-[450px] w-[380px] rounded-3xl"
          align="center"
        >
          <div className="space-y-5 p-5">{renderCustomer()}</div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
