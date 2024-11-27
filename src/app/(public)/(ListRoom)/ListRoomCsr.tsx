"use client";
import roomApiRequest from "@/apiRequests/room";
import { ListRoomProps } from "@/app/(public)/(ListRoom)/ListRoom";
import { destination } from "@/app/(public)/(QuickSearch)/QuickSearch";
import { useStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface Location {
  star: number;
}
export const vietnamLocations: Location[] = [
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
  { star: 2.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.3 },
  { star: 4.8 },
];

export default function ListRoomCsr({ data, data2 }: any) {
  const router = useRouter();
  let { setStar, setDataLocation } = useStore();
  useEffect(() => {}, []);
  let handleDetail = (id: number, star: number, tinhThanh: string) => {
    setStar(star);
    setDataLocation(tinhThanh);
    console.log(tinhThanh, "tinh thanh dc");
    router.push(`/room-detail/id?name=${id}`);
  };

  let renderRooms = () => {
    return data?.content?.map((item: any, index: any) => {
      return (
        <div key={item.id}>
          {item.hinhAnh &&
            data2.content.data.map((item2: any) => {
              return (
                <div key={item2.id}>
                  {item2.id == item.maViTri && (
                    <div
                      className="relative"
                      onClick={() => {
                        handleDetail(
                          item.id,
                          vietnamLocations[index]?.star,
                          item2.tinhThanh
                        );
                      }}
                    >
                      <div className="h-[300px]">
                        <Image
                          className="h-full object-left object-cover rounded-xl"
                          src={item.hinhAnh}
                          width={1000}
                          height={1000}
                          alt="ks"
                        />
                      </div>
                      <div className="flex justify-between py-3">
                        <div>
                          {item2.id == item.maViTri && (
                            <p className="text-sm font-bold ">
                              {item2.tinhThanh} / Việt Nam
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm">
                            {vietnamLocations[index]?.star}
                          </p>
                          <i className="fa fa-star text-sm"></i>
                        </div>
                      </div>
                      <p className="text-sm font-medium">
                        ${item.giaTien} / Đêm{" "}
                      </p>
                      <button className="absolute top-2 right-2">
                        <i
                          className="fa fa-heart   hover:scale-150 text-lg duration-300       text-gray-500
                      bg-clip-text 
                      [-webkit-text-stroke:1px_white]
                      hover:text-red-500 
                      hover:[-webkit-text-stroke:0px]
                      transition-all"
                        ></i>
                      </button>
                      {vietnamLocations[index]?.star <= 4.5 &&
                        vietnamLocations[index]?.star > 4 && (
                          <div className="bg-blue-400 rounded-xl absolute top-2 left-2">
                            <p className="text-sm font-semibold p-1 px-2">
                              {" "}
                              Được khách yêu thích
                            </p>
                          </div>
                        )}
                      {vietnamLocations[index]?.star == 5 && (
                        <div className="bg-red-400 rounded-xl absolute top-2 left-2">
                          <p className="text-sm font-semibold p-1 px-2">
                            {" "}
                            Chủ nhà siêu cấp
                          </p>
                        </div>
                      )}
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
      <h1>List of Rooms</h1>
      <div className="grid grid-cols-4 gap-5">{renderRooms()}</div>
    </div>
  );
}
