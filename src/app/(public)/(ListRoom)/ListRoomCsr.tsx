"use client";
import roomApiRequest from "@/apiRequests/room";
import { ListRoomProps } from "@/app/(public)/(ListRoom)/ListRoom";
import { useStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

interface ListRoomCsr {
  data: ListRoomProps;
}
interface Location {
  name: string;
  star: number;
}

export default function ListRoomCsr({ data }: ListRoomCsr) {
  // useEffect(() => {
  //   setDataApiListRoom(data);
  //   console.log("thu data", data);
  // }, []);
  const vietnamLocations: Location[] = [
    { name: "Hanoi, VietNam", star: 4.2 },
    { name: "Ho Chi Minh City, VietNam", star: 5.0 },
    { name: "Da Nang, VietNam", star: 3.5 },
    { name: "Hai Phong, VietNam", star: 4.3 },
    { name: "Can Tho, VietNam", star: 4.8 },
    { name: "Hue, VietNam", star: 5.0 },
    { name: "Nha Trang, VietNam", star: 4.2 },
    { name: "Ha Long, VietNam", star: 3.6 },
    { name: "Vung Tau, VietNam", star: 3.5 },
    { name: "Qui Nhon, VietNam", star: 4.5 },
    { name: "Bien Hoa, VietNam", star: 3.5 },
    { name: "Da Lat, VietNam", star: 4.5 },
    { name: "Hoi An, VietNam", star: 2.5 },
    { name: "Ha Giang, VietNam", star: 4.5 },
    { name: "Sa Pa, VietNam", star: 4.5 },
    { name: "Phan Thiet, VietNam", star: 4.5 },
  ];
  let { dataApiListRoom, setDataApiListRoom } = useStore();
  let renderRooms = () => {
    return data?.content?.slice(0, 16).map((item, index) => {
      return (
        <>
          {item.hinhAnh && (
            <div key={item.id} className="relative">
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
                <p className="text-sm font-bold">
                  {vietnamLocations[index]?.name}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm">{vietnamLocations[index]?.star}</p>
                  <i className="fa fa-star text-sm"></i>
                </div>
              </div>
              <p className="text-sm font-medium">${item.giaTien} / Đêm </p>
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
              {vietnamLocations[index]?.star >= 4 && (
                <div className="bg-white rounded-xl absolute top-2 left-2">
                  <p className="text-sm font-semibold p-1">
                    {" "}
                    Được khách yêu thích
                  </p>
                </div>
              )}
            </div>
          )}
        </>
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
