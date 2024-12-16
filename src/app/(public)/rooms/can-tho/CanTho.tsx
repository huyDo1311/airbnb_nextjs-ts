"use client";
import { vietnamLocations } from "@/app/(public)/(ListRoom)/ListRoomCsr";
import { useStore } from "@/store/store";
import Image from "next/image";
import React from "react";
import FormatTime from "@/app/(public)/rooms/FormatTime";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BackgroundGradient } from "@/components/ui/background-gradient";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

export default function CanTho() {
  let { resultSearch, dataStoreDestination2 } = useStore();
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
    return format(date, "eeee, dd MMMM yyyy", { locale: vi });
  };
  const vietnameseDate = formatDateToVietnamese(new Date());
  let renderRooms = () => {
    return resultSearch?.map((item: any, index: any) => {
      return (
        <div key={item.id}>
          {item.hinhAnh && (
            <BackgroundGradient className="rounded-[22px] p-5 bg-white dark:bg-zinc-900 overflow-hidden">
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  handleDetail(item.id);
                }}
              >
                <div className="h-[350px] ">
                  <Image
                    className="h-full object-left object-cover rounded-xl w-full"
                    src={item.hinhAnh}
                    width={1000}
                    height={1000}
                    alt="ks"
                  />
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between ">
                    <p className="text-sm font-bold">
                      {dataStoreDestination2} / Việt Nam
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm">{vietnamLocations[index]?.star}</p>
                      <i className="fa fa-star text-sm"></i>
                    </div>
                  </div>
                  <p className="text-sm font-light ">{vietnameseDate}</p>
                  <p className="text-sm font-medium">
                    {handleMoney(item.giaTien)} / Đêm{" "}
                  </p>
                </div>
                <button className="absolute top-1 right-1">
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
                  <div className="bg-white rounded-xl absolute top-1 left-1">
                    <p className="text-sm text-black font-semibold p-1">
                      Được khách yêu thích
                    </p>
                  </div>
                )}
              </div>
            </BackgroundGradient>
          )}
        </div>
      );
    });
  };
  let router = useRouter();
  let handleDetail = (id: number) => {
    router.push(`/room-detail/id?name=${id}`);
  };
  return (
    <div className="grid grid-cols-2 gap-4 mt-10 relative">
      <div className=" ">
        <div className="flex justify-center">
          <FormatTime />
        </div>
        <div className="flex justify-center mt-10">
          {resultSearch.length >= 1 ? (
            <div className="w-2/3 grid grid-cols-1 gap-5">{renderRooms()}</div>
          ) : (
            <div className="w-2/3 ">
              {" "}
              <div>
                <LottieAnimation />
              </div>
              <p className="text-2xl text-center mt-20 font-semibold">
                Hiện tại đang không có nơi ở mà bạn cần...
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div className="sticky top-36">
          <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502746.6398270655!2d105.20595098340893!3d10.122960264489622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f927382cd%3A0x72a463d91109ec67!2zQ-G6p24gVGjGoSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1732357073988!5m2!1svi!2s"
              width={700}
              height={700}
              className="w-full "
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
}
