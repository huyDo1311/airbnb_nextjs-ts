"use client";
import roomApiRequest from "@/apiRequests/room";
import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/ui/cool-mode";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { CustomerType, useStore } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface dataTypeCustomers {
  id: string;
  Object: string;
  Age: string;
  Quantity: any;
  QuantityStore: any;
  HandleQuantityPlus: any;
  HandleQuantityMinus: any;
}

export function CustomerPicker() {
  let {
    dataCalendar,
    setCustomers,
    setSearch,
    dataStoreDestination,
    dataStoreDestination2,
    total,
    removeDataHeader,
    setRemoveDataHeader,
    decrement,
    increment,
    customers,
  } = useStore();
  let router = useRouter();
  const [quantityOfAdult, setQuantityOfAdult] = useState<number>(1);
  const [quantityOfChildren, setQuantityOfChildren] = useState<number>(0);
  const [quantityOfBabies, setQuantityOfBaby] = useState<number>(0);
  const [quantityOfPets, setQuantityOfPets] = useState<number>(0);
  // const [total, setTotal] = useState<number>(0);
  // useEffect(() => {

  // }, [quantityOfAdult, quantityOfChildren, setCustomers]);
  const formattedDestination = dataStoreDestination2.replace(/\s+/g, "-");

  let dataCustomers: dataTypeCustomers[] = [
    {
      id: "adults",
      Object: "Người lớn",
      Age: "Từ 13 tuổi trở lên",
      Quantity: quantityOfAdult,
      QuantityStore: customers?.adults,
      HandleQuantityPlus: (id: any) => increment(id),
      HandleQuantityMinus: (id: any) => decrement(id),
    },
    {
      id: "children",
      Object: "Trẻ em",
      Age: "Độ tuổi 2-12 ",
      Quantity: quantityOfChildren,
      QuantityStore: customers?.children,
      HandleQuantityPlus: (id: any) => increment(id),
      HandleQuantityMinus: (id: any) => decrement(id),
    },
    {
      id: "babies",
      Object: "Em bé",
      Age: "Dưới 2 tuổi",
      Quantity: quantityOfBabies,
      QuantityStore: customers?.babies,
      HandleQuantityPlus: (id: any) => increment(id),
      HandleQuantityMinus: (id: any) => decrement(id),
    },
    {
      id: "pets",
      Object: "Thú cưng",
      Age: "Bạn sẽ mang theo động vật để phục vụ?",
      Quantity: quantityOfPets,
      QuantityStore: customers?.pets,
      HandleQuantityPlus: (id: any) => increment(id),
      HandleQuantityMinus: (id: any) => decrement(id),
    },
  ];
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setQuantityOfAdult(0);
    setQuantityOfChildren(0);
    setQuantityOfBaby(0);
    setQuantityOfPets(0);
  }, [setRemoveDataHeader, removeDataHeader]);
  let handleSearching = () => {
    if (!dataStoreDestination2) {
      toast({
        description: "Không được bỏ trống địa điểm",
      });
    } else if (!dataCalendar?.from || !dataCalendar?.to) {
      toast({
        description: "Không được bỏ trống ngày nhận và trả phòng",
      });
    } else {
      if (dataStoreDestination == 0) router.push("/rooms");
      else {
        router.push(
          `/room-destination/location?name=${formattedDestination}&id=${dataStoreDestination}`
        );
      }
      setSearch();
    }
  };

  let renderCustomer = () => {
    return dataCustomers.map((item, index) => {
      return (
        <div
          key={index}
          className={`${
            index == 3 ? "" : "flex justify-between"
          }  space-y-2 border-b py-5`}
        >
          <div>
            <p className="text-md font-semibold">{item.Object}</p>
            <p
              className={`text-sm ${
                index == 3 ? "font-semibold underline" : "font-normal"
              }  text-gray-500`}
            >
              {item.Age}
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            <div
              className={`${
                item.QuantityStore == 0 ? "cursor-not-allowed" : ""
              }`}
            >
              <CoolMode>
                <div
                  onClick={() => {
                    item.HandleQuantityMinus(item.id);
                  }}
                  className={` flex justify-center items-center rounded-full border-2 h-10 w-10 ${
                    item.QuantityStore == 0
                      ? "pointer-events-none opacity-30"
                      : "cursor-pointer"
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </div>
              </CoolMode>
            </div>
            <div className="w-10">
              <p className="text-center text-md">
                {item.QuantityStore == 5 ? "5+" : item.QuantityStore}
              </p>
            </div>
            <div
              className={`${
                item.QuantityStore >= 5
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <CoolMode>
                <div
                  onClick={() => {
                    item.HandleQuantityPlus(item.id);
                  }}
                  className={`flex justify-center items-center rounded-full border-2 h-10 w-10 ${
                    item.QuantityStore >= 5
                      ? " pointer-events-none  opacity-30"
                      : ""
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </div>
              </CoolMode>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="relative w-full">
      <Popover open={active} onOpenChange={setActive}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setActive(true)}
            variant="ghost"
            className="w-full h-20 flex justify-start text-left"
          >
            <div>
              <p className="font-semibold  text-black dark:text-white text-xs">
                Khách
              </p>
              {total > 0 ? (
                <p className="text-md font-semibold text-red-500 ">
                  {total} khách
                </p>
              ) : (
                <p className="text-gray-500 font-medium text-md">Thêm khách</p>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <div className="absolute top-0 xl:right-8 right-1 h-full cursor-pointer w-1/2">
          <div className="h-full  flex items-center justify-center   ">
            <div
              className="items-center  bg-red-500 rounded-full h-11 lg:rounded-3xl lg:w-full md:px-5 flex cursor-pointer justify-center"
              onClick={handleSearching}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2px"
                strokeLinejoin="round"
                className="lucide lucide-search hover:scale-110 transition cursor-pointer text-white  "
              >
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="text-md ps-2 font-medium text-white lg:block hidden">
                Tìm kiếm
              </p>
            </div>
          </div>
        </div>
        <PopoverContent className="w-[480px] rounded-3xl" align="end">
          <div className="space-y-8 p-8">{renderCustomer()}</div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
