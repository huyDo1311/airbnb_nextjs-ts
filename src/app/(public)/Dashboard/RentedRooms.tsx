"use client";
import { typeContent } from "@/lib/helper.type";
import { Skeleton } from "@/components/ui/skeleton";
import http from "@/lib/http";
import { vietnameseDate, vietnamLocations } from "@/lib/utils2";
import { useStore } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RentedRooms() {
  let { dataRented } = useStore();
  const [data2, setData2] = useState<any>();
  let handleMoney = (money: number): string => {
    let currency = money * 25;
    let formattedCurrency =
      new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(currency) + " đ"; // Adding the "đ" symbol at the end
    return formattedCurrency.replace(",", ".");
  };
  const formatDateToVietnamese = (date: any) => {
    return date;
  };
  const formatStar = (star: number) => {
    return star.toFixed(1).replace(".", ",");
  };

  useEffect(() => {
    http
      .get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then((res) => {
        setData2(res.content.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let renderRentedRooms = (): any => {
    return dataRented?.map((item: typeContent, index: number): any => {
      return (
        <div
          key={index}
          className="w-full my-6 border rounded-2xl md:h-full sm:h-[320px] bg-white dark:bg-black  hover:scale-105 duration-300 "
        >
          {item?.hinhAnh &&
            data2?.map((item2?: any) => {
              return (
                <div
                  key={item2?.id}
                  className="m-5 group  h-auto cursor-pointer z-20"
                >
                  {item2?.id == item.maViTri && (
                    <div className="relative h-full">
                      <div className="w-full lg:h-[300px] sm:h-[200px] h-[190px] ">
                        <Image
                          className="w-full h-full bg-center rounded-xl object-cover"
                          src={item.hinhAnh ?? ""}
                          width={1000}
                          height={1000}
                          alt="ks"
                        />
                      </div>
                      <div className="flex justify-between py-3">
                        <div className="space-y-1">
                          {item2?.id == item?.maViTri && (
                            <p className="text-sm font-bold  ">
                              {item2?.tinhThanh} / Việt Nam
                            </p>
                          )}
                          <p className="text-sm font-light ">
                            {formatDateToVietnamese(vietnameseDate)}
                          </p>
                          <p className="text-sm font-medium ">
                            {handleMoney(item?.giaTien ?? 0)} / Đêm{" "}
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">
                              {formatStar(vietnamLocations[index]?.star)}{" "}
                              {/* Display star with comma */}
                            </p>
                            <i className="fa fa-star text-sm transition duration-300 group-hover:text-yellow-300"></i>
                          </div>
                        </div>
                      </div>

                      {vietnamLocations[index]?.star <= 4.5 &&
                        vietnamLocations[index]?.star > 4 && (
                          <div className="dark:bg-white bg-white rounded-xl absolute top-1 left-1">
                            <p className="text-sm font-semibold p-1 px-2 text-black">
                              {" "}
                              Được khách yêu thích
                            </p>
                          </div>
                        )}
                      {vietnamLocations[index]?.star == 5 && (
                        <div className="bg-red-400 rounded-xl absolute top-1 left-1">
                          <p className="text-sm font-semibold p-1 px-2">
                            {" "}
                            Chủ nhà siêu cấp
                          </p>
                        </div>
                      )}
                      <button className=" active:text-red-400 absolute top-1 right-1 ">
                        <i
                          className="fa fa-heart  scale-125    group-hover:animate-beat duration-300 z-40    text-gray-500
                      bg-clip-text 
                      [-webkit-text-stroke:1px_white]
                      group-hover:text-red-500 
                      hover:[-webkit-text-stroke:0px]
                      transition-all"
                        ></i>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      );
    });
  };

  return (
    <div>
      {dataRented ? (
        renderRentedRooms()
      ) : (
        <div className="space-y-3">
          <div className="w-full space-y-2">
            <Skeleton className="h-80 w-full rounded-2xl" />
            <div className="flex w-full justify-between items-center">
              <Skeleton className="h-4 w-[150px]" />
              <div className="flex items-center space-x-1">
                <Skeleton className="h-[20px] w-[40px] " />
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
              </div>
            </div>
            <Skeleton className="h-4 w-[170px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <div className="w-full space-y-1">
            <Skeleton className="h-80 w-full" />
            <div className="flex w-full justify-between">
              <Skeleton className="h-4 w-[150px]" />
              <div className="flex items-center space-x-1">
                <Skeleton className="h-[20px] w-[40px] " />
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
              </div>
            </div>
            <Skeleton className="h-4 w-[170px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      )}
    </div>
  );
}
