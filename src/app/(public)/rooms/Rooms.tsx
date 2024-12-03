"use client";
import { vietnamLocations } from "@/app/(public)/(ListRoom)/ListRoomCsr";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
export default function Rooms({ data2 }: any) {
  let { resultSearch, setStar, setDataLocation } = useStore();
  console.log(data2, "lmaop");
  const router = useRouter();

  let handleDetail = (id: number, star: number, tinhThanh: string) => {
    setStar(star);
    setDataLocation(tinhThanh);
    router.push(`/room-detail/id?name=${id}`);
  };
  const formatDateToVietnamese = (date: any) => {
    return format(date, "eeee, dd MMMM yyyy", { locale: vi });
  };
  const formatStar = (star: number) => {
    return star.toFixed(1).replace(".", ",");
  };
  const vietnameseDate = formatDateToVietnamese(new Date());
  let renderRooms = () => {
    return resultSearch.map((item: any, index: any) => {
      return (
        <div key={item.id} className="w-[375px] my-6">
          {item.hinhAnh &&
            data2.content.data.map((item2: any) => {
              return (
                <div key={item2.id} className="m-5 group">
                  {item2.id == item.maViTri && (
                    <CardContainer className="inter-var h-40 w-full   ">
                      <CardBody className="shadow-lg p-4 border  relative group/card  px-5 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl    ">
                        <div
                          className=""
                          onClick={() => {
                            handleDetail(
                              item.id,
                              vietnamLocations[index]?.star,
                              item2.tinhThanh
                            );
                          }}
                        >
                          <CardItem translateZ="50">
                            <div className="w-full h-[250px]">
                              <Image
                                className="h-full w-full object-left object-cover rounded-xl"
                                src={item.hinhAnh}
                                width={1000}
                                height={1000}
                                alt="ks"
                              />
                            </div>
                          </CardItem>
                          <CardItem translateZ={100} className="w-full">
                            <div className="flex justify-between py-3">
                              <div className="space-y-1">
                                {item2.id == item.maViTri && (
                                  <p className="text-sm font-bold ">
                                    {item2.tinhThanh} / Việt Nam
                                  </p>
                                )}
                                <CardItem translateZ={100}>
                                  <p className="text-sm font-light">
                                    {vietnameseDate}
                                  </p>
                                </CardItem>
                                <CardItem translateZ={100}>
                                  <p className="text-sm font-medium">
                                    ${item.giaTien} / Đêm{" "}
                                  </p>
                                </CardItem>
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
                          </CardItem>

                          <CardItem
                            className="absolute top-2 right-2 z-50"
                            translateZ={100}
                          >
                            <button>
                              <i
                                className="fa fa-heart   hover:scale-150 text-lg duration-300       text-gray-500
                      bg-clip-text 
                      [-webkit-text-stroke:1px_white]
                      hover:text-red-500 
                      hover:[-webkit-text-stroke:0px]
                      transition-all"
                              ></i>
                            </button>
                          </CardItem>
                          {vietnamLocations[index]?.star <= 4.5 &&
                            vietnamLocations[index]?.star > 4 && (
                              <CardItem
                                className="absolute top-2 left-2"
                                translateZ={100}
                              >
                                <div className="bg-white rounded-xl ">
                                  <p className="text-sm font-semibold p-1 px-2">
                                    {" "}
                                    Được khách yêu thích
                                  </p>
                                </div>
                              </CardItem>
                            )}
                          {vietnamLocations[index]?.star == 5 && (
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
    <div>
      <div className="grid grid-cols-4 ">{renderRooms()}</div>
    </div>
  );
}
