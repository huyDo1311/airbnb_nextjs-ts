"use client";
import { vietnamLocations } from "@/app/(public)/(ListRoom)/ListRoomCsr";
import { useStore } from "@/store/store";
import Image from "next/image";
import React from "react";
import FormatTime from "@/app/(public)/rooms/FormatTime";
import { useRouter } from "next/navigation";
export default function DaLat() {
  let { resultSearch, dataStoreDestination2 } = useStore();
  let router = useRouter();

  let handleDetail = (id: number) => {
    router.push(`/room-detail/id?name=${id}`);
  };
  let renderRooms = () => {
    return resultSearch?.map((item: any, index: any) => {
      return (
        <div key={item.id}>
          {item.hinhAnh && (
            <div
              className="relative p-2 cursor-pointer"
              onClick={() => {
                handleDetail(item.id);
              }}
            >
              <div className="h-[400px] ">
                <Image
                  className="h-full object-left object-cover rounded-xl w-full"
                  src={item.hinhAnh}
                  width={1000}
                  height={1000}
                  alt="ks"
                />
              </div>
              <div className="flex justify-between py-3">
                <p className="text-sm font-bold">
                  {dataStoreDestination2} / Việt Nam
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm">{vietnamLocations[index]?.star}</p>
                  <i className="fa fa-star text-sm"></i>
                </div>
              </div>
              <p className="text-sm font-medium">${item.giaTien} / Đêm </p>
              <button className="absolute top-4 right-4">
                <i
                  className="fa fa-heart  hover:scale-150 text-lg duration-300     text-gray-500
                bg-clip-text 
                [-webkit-text-stroke:1px_white]
                hover:text-red-500 
                hover:[-webkit-text-stroke:0px]
                transition-all"
                ></i>
              </button>
              {vietnamLocations[index]?.star >= 4 && (
                <div className="bg-white rounded-xl absolute top-4 left-4">
                  <p className="text-sm font-semibold p-1">
                    Được khách yêu thích
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    });
  };
  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className=" ">
        <div className="flex justify-center">
          <FormatTime />
        </div>
        <div className="flex justify-center">
          <div className="w-2/3">{renderRooms()}</div>
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249856.81735689036!2d108.28591007792723!3d11.90419898118633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef20988b1%3A0xad5f228b672bf930!2zVHAuIMSQw6AgTOG6oXQsIEzDom0gxJDhu5NuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1732354564068!5m2!1svi!2s"
          width={700}
          height={700}
          className="sticky top-0 "
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}