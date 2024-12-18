"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useStore } from "@/store/store";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { toast } from "@/hooks/use-toast";
import FormDialog from "@/app/(public)/FormDialog";
import { typeContent } from "@/app/(public)/(ListRoom)/ListRoom";
import bookingApiRequest from "@/apiRequests/booking";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import { Button } from "react-day-picker";
export interface Location {
  star: number;
}

export const vietnamLocations: Location[] = [
  { star: 4.3 },
  { star: 4.8 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.3 },
  { star: 4.8 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
];

export default function ListRoomCsr({ data, data2 }: any) {
  const router = useRouter();
  let handleMoney = (money: number): string => {
    let currency = money * 25;
    let formattedCurrency =
      new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(currency) + " đ"; // Adding the "đ" symbol at the end
    return formattedCurrency.replace(",", ".");
  };

  let sliceNumber = 12;
  const [lastRoom, setLastRoom] = useState<number | null>(null);
  let {
    setStar,
    setDataLocation,
    resetDataCalendar,
    resetCustomers,
    setFavorite,
    getUserData,
    setRemoveFavorite,
    setDataApiListRoom,
    dataApiListRoom,
    setDataRented,
    fetchDataStore,
  } = useStore();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(sliceNumber);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let parseListRoomData = localStorage.getItem("app-state")
        ? JSON.parse(localStorage.getItem("app-state")!)
        : null;
      console.log("here", parseListRoomData.state.dataApiListRoom);
      setLastRoom(data?.content.length - 1);
      let cloneData = [...data.content];
      let addLoving = cloneData.map((item: any, index: number) => {
        return {
          ...item,
          loving:
            parseListRoomData.state.dataApiListRoom[index]?.loving ?? false,
        };
      });
      setDataApiListRoom(addLoving);
    }
  }, []);

  useEffect(() => {
    if (dataApiListRoom.length > 0) {
      bookingApiRequest
        .NextClientToServerGetBookingByUser(getUserData?.id)
        .then((res: any) => {
          let sliceData = res.content.reverse().slice(0, 10);
          let filterSliceData = sliceData.filter(
            (data: any, index: number, self: any) => {
              return (
                index ===
                self.findIndex((value: any) => value.maPhong === data.maPhong)
              );
            }
          );

          let filterDetail = filterSliceData.map((item: any) => {
            return dataApiListRoom.find((item2: typeContent) => {
              return item.maPhong == item2.id ? item.maPhong == item2.id : null;
            });
          });
          setDataRented(filterDetail);
        })
        .catch((err) => console.log(err, "err"));
    }
  }, [fetchDataStore]);

  let handleDetail = (id: number, star: number, tinhThanh: string) => {
    setStar(star);
    setDataLocation(tinhThanh);
    resetCustomers();
    resetDataCalendar();
    router.push(`/room-detail/id?name=${id}`);
  };

  const formatStar = (star: number) => {
    return star ? star.toFixed(1).replace(".", ",") : star;
  };
  const formatDateToVietnamese = (date: any) => {
    return format(date, "eeee, dd MMMM yyyy", { locale: vi });
  };
  const vietnameseDate = formatDateToVietnamese(data.dateTime);

  const [Open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  let handleFavorite = (id: number) => {
    if (getUserData.id === 0) {
      setOpen(true);
      toast({
        title: "Bạn cần phải đăng nhập để thực hiện tính năng này",
      });
    } else {
      let findIndex = dataApiListRoom.findIndex((item: any) => item.id == id);
      let find = dataApiListRoom.find((item2: any) => item2.loving == true);
      if (find?.loving == dataApiListRoom[findIndex].loving) {
        setEnable(false);
        dataApiListRoom[findIndex].loving = false;
        setRemoveFavorite(id);
        setDataApiListRoom(dataApiListRoom);
        toast({
          title: "Đã xóa khỏi mục ưa thích",
        });
      } else {
        setEnable(true);
        dataApiListRoom[findIndex].loving = true;
        setDataApiListRoom(dataApiListRoom);

        setFavorite(id);
        toast({
          title: "Đã được thêm vào mục ưa thích",
        });
      }
    }
  };

  let renderRooms = () => {
    return dataApiListRoom?.slice(start, end).map((item: any, index: any) => {
      return (
        <div key={item.id} className="">
          {item.hinhAnh &&
            data2.content.data.map((item2: any) => {
              return (
                <div key={item2.id} className="  group  cursor-pointer z-20">
                  {item2.id == item.maViTri && (
                    <CardContainer className="inter-var   ">
                      <CardBody className="group shadow-lg p-4 border  relative group/card  px-5 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl    ">
                        <div
                          className=""
                          onClick={() => {
                            handleDetail(
                              item.id,
                              vietnamLocations[index]?.star
                                ? vietnamLocations[index]?.star
                                : 4.5,
                              item2.tinhThanh
                            );
                          }}
                        >
                          <CardItem translateZ="50">
                            <div className=" xl:h-[250px] w-full  lg:w-full mdCustom:w-[350px] h-[200px] ">
                              <Image
                                className="h-full lg:w-full w-[500px] mdCustom:w-full object-left object-cover rounded-xl"
                                src={item.hinhAnh}
                                width={2000}
                                height={2000}
                                alt="ks"
                              />
                            </div>
                          </CardItem>
                          <CardItem translateZ={100} className="w-full">
                            <div className="flex justify-between py-3">
                              <div className="space-y-1">
                                {item2.id == item.maViTri && (
                                  <p className="lg:text-sm  font-bold ">
                                    {item2.tinhThanh} / Việt Nam
                                  </p>
                                )}
                                <CardItem>
                                  <p className="lg:text-sm text-md font-light">
                                    {vietnameseDate}
                                  </p>
                                </CardItem>
                                <CardItem translateZ={100}>
                                  <p className="lg:text-sm text-md font-medium">
                                    {handleMoney(item.giaTien)} / Đêm{" "}
                                  </p>
                                </CardItem>
                              </div>
                              <div className="flex items-start">
                                <div className="flex items-center space-x-2">
                                  <p className="lg:text-sm text-md font-medium">
                                    {formatStar(
                                      vietnamLocations[index]?.star
                                    ) ?? formatStar(4.5)}{" "}
                                  </p>
                                  <i className="fa fa-star text-sm transition duration-300 group-hover:text-yellow-300"></i>
                                </div>
                              </div>
                            </div>
                          </CardItem>

                          {(vietnamLocations[index]?.star ?? 4.5) <= 4.5 &&
                            (vietnamLocations[index]?.star ?? 5) > 4 && (
                              <CardItem
                                className="absolute top-2 left-2"
                                translateZ={100}
                              >
                                <div className="dark:bg-white bg-white rounded-xl ">
                                  <p className="text-sm font-semibold p-1 px-2 text-black">
                                    {" "}
                                    Được khách yêu thích
                                  </p>
                                </div>
                              </CardItem>
                            )}
                          {(vietnamLocations[index]?.star ?? 4.5) == 5 && (
                            <CardItem
                              className="absolute top-2 left-2"
                              translateZ={100}
                            >
                              <div className="bg-red-400 rounded-xl ">
                                <p className="text-sm font-semibold p-1 px-2">
                                  {" "}
                                  Chủ nhà siêu cấp
                                </p>
                              </div>
                            </CardItem>
                          )}
                        </div>
                        <CardItem
                          className="absolute top-7 right-7 hover:text-2xl"
                          translateZ={100}
                          key={index}
                        >
                          <button
                            key={index}
                            onClick={() => {
                              handleFavorite(item.id);
                            }}
                            className=" active:text-red-400 active:scale-125"
                          >
                            <i
                              className={`fa fa-heart scale-125 ${
                                item.loving ? "text-red-500" : "text-gray-500"
                              }  group-hover:animate-beat duration-300 z-40 bg-clip-text [-webkit-text-stroke:1px_white]  hover:[-webkit-text-stroke:0px] transition-all`}
                            ></i>
                          </button>
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  )}
                </div>
              );
            })}
        </div>
      );
    });
  };
  return (
    <div className="">
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>bk</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <FormDialog Open={Open} handleClose={handleClose} />
      <div className="grid xl:grid-cols-4 mdCustom:grid-cols-2 lg:grid-cols-3 lg:gap-5  gap-8">
        {renderRooms()}
      </div>

      <Pagination className="">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${
                start == 0
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
              onClick={() => {
                setStart(start - sliceNumber), setEnd(end - sliceNumber);
              }}
              href="#"
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={`${
                end >= (lastRoom ?? 0)
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
              onClick={() => {
                setStart(start + sliceNumber), setEnd(end + sliceNumber);
              }}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
