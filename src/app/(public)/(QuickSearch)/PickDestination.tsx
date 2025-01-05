"use client";
import { destination } from "@/app/(public)/(QuickSearch)/QuickSearch";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import http from "@/lib/http";
import {
  formatHistoryDateToVietnamese,
  formattedDestination,
} from "@/lib/utils2";
import { useStore } from "@/store/store";
import { Clock9 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface destinationProps {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export function PickDestination() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsMinimized(false);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [pickDataDestination, setPickDataDestination] = useState<
    destinationProps[]
  >([]);
  useEffect(() => {
    http
      .get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then((res) => {
        // setPickDataDestination(res.content.data);
        let vietNam = {
          id: 0,
          tenViTri: "vn",
          tinhThanh: "Khắp Việt Nam",
          quocGia: "Viet nam",
          hinhAnh:
            "https://i.pinimg.com/originals/c0/a7/0f/c0a70f0ab2d1559c9c0faf6eeae938f8.jpg",
        };
        let cloneDataDestination: destinationProps[] = [
          vietNam,
          ...res.content.data,
        ];
        setPickDataDestination(cloneDataDestination);
      })
      .catch((err) => console.log(err));
  }, []);
  let { dataStoreDestination2, headerTotal } = useStore();

  const {
    setNextStep,
    setDataStoreDestination,
    setDataStoreDestination2,
    searchingHistory,
    setCustomers,
    setDataCalendar,
    setResetHistory,
    setTotal,
  } = useStore();
  let handleDestination = (id: number, tinhThanh: string): void => {
    // setLocation(tinhThanh);
    setDataStoreDestination(id);
    setDataStoreDestination2(tinhThanh);
    setNextStep(1);
  };
  const router = useRouter();

  let renderHistory = () => {
    let cloneHistory = [...searchingHistory];
    cloneHistory.reverse();
    return cloneHistory.map((itemHistory, index) => {
      return (
        <Button
          key={index}
          variant={"ghost"}
          className="w-full py-5 "
          onClick={() => (
            setCustomers(itemHistory?.customers),
            setTotal(itemHistory?.totalOfCustomers),
            setDataStoreDestination2(itemHistory?.destination2),
            setDataCalendar(itemHistory?.calendar),
            setIsMinimized(false),
            router.push(
              `/room-destination/location?name=${formattedDestination(
                itemHistory.destination2
              )}&id=${itemHistory.destination}`
            )
          )}
        >
          <div className="flex w-full items-center justify-start space-x-1  text-md  ">
            <p className="me-2">
              {" "}
              <Clock9 />
            </p>
            <p>{itemHistory?.destination2}</p>,
            <p className="">
              {" "}
              {formatHistoryDateToVietnamese(
                itemHistory?.calendar?.from
              )} - {formatHistoryDateToVietnamese(itemHistory?.calendar?.to)},
            </p>
            <p className="t">
              {itemHistory.totalOfCustomers > 0
                ? itemHistory.totalOfCustomers + " khách"
                : ""}{" "}
            </p>
          </div>
        </Button>
      );
    });
  };
  let renderDestination = () => {
    return pickDataDestination?.map((item) => {
      return (
        <div
          key={item.id}
          className="flex justify-center cursor-pointer hover:scale-110 transition duration-300"
        >
          <div className="space-y-1">
            <div
              className="w-28 h-28 rounded-md overflow-hidden border-2 dark:border-white border-black"
              onClick={() => {
                handleDestination(item.id, item.tinhThanh);
              }}
            >
              <Image
                src={item.hinhAnh}
                width={100}
                height={100}
                className="w-full h-full"
                alt="destination"
              />
            </div>
            <p className="text-sm font-semibold text-center">
              {" "}
              {item.tinhThanh}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      <Popover open={isMinimized} onOpenChange={setIsMinimized}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => {
              setNextStep(-1);
            }}
            variant="ghost"
            className=" w-full h-20 text-left flex justify-start "
          >
            <div className="ps-3  dark:text-white">
              <p className="font-semibold text-xs text-black dark:text-white">
                Địa điểm
              </p>
              <p
                className={` font-medium  ${
                  dataStoreDestination2 ? "  text-red-500" : "  text-gray-500"
                }`}
              >
                {dataStoreDestination2
                  ? dataStoreDestination2
                  : "Tìm kiếm điểm đến"}
              </p>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`${
            searchingHistory.length > 0 ? "w-[800px]" : "w-auto"
          }  rounded-3xl flex`}
          align="start"
        >
          {searchingHistory.length > 0 && (
            <div className="w-1/2">
              <p className="text-md font-medium">Tìm kiếm gần đây</p>
              <div className="mt-3 transition duration-300 overflow-y-auto h-96">
                {renderHistory()}
              </div>
              <div className="flex justify-center">
                <button
                  className="text-md font-medium text-red-500 text-center mt-4 cursor-pointer"
                  onClick={() => setResetHistory()}
                >
                  Xóa lịch sử
                </button>
              </div>
            </div>
          )}
          <div
            className={`${searchingHistory.length > 0 ? "w-1/2" : "w-full"}`}
          >
            <p className="text-md font-medium">Tìm kiếm địa điểm</p>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {renderDestination()}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
