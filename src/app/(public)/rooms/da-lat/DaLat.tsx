"use client";
import FormDialog from "@/app/(public)/FormDialog";
import FormatTime from "@/app/(public)/rooms/FormatTime";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { toast } from "@/hooks/use-toast";
import { handleMoney, vietnameseDate, vietnamLocations } from "@/lib/utils2";
import { useStore } from "@/store/store";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});
export default function DaLat() {
  let {
    resultSearch,
    dataStoreDestination2,
    getUserData,
    dataApiListRoom,
    setRemoveFavorite,
    setDataApiListRoom,
    setFavorite,
  } = useStore();

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
        dataApiListRoom[findIndex].loving = false;
        setRemoveFavorite(id);
        setDataApiListRoom(dataApiListRoom);
        toast({
          title: "Đã xóa khỏi mục ưa thích",
        });
      } else {
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
    return resultSearch?.map((item: any, index: any) => {
      return (
        <div key={item.id}>
          {item.hinhAnh && (
            <BackgroundGradient className="rounded-[22px] p-5 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="relative cursor-pointer">
                <div>
                  <div
                    className="xl:h-[350px] h-[200px]  "
                    onClick={() => {
                      handleDetail(item.id);
                    }}
                  >
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
                        <p className="text-sm">
                          {vietnamLocations[index]?.star ?? 4.5}
                        </p>
                        <i className="fa fa-star text-sm"></i>
                      </div>
                    </div>
                    <p className="text-sm font-normal ">{vietnameseDate}</p>
                    <p className="text-sm font-medium">
                      {handleMoney(item.giaTien)} / Đêm{" "}
                    </p>
                  </div>
                </div>
                <div className="absolute top-1 right-1 z-50">
                  <button
                    onClick={() => {
                      handleFavorite(item.id);
                    }}
                    className="active:scale-150 "
                  >
                    <i
                      className={`fa fa-heart scale-125 ${
                        item.loving ? "text-red-500" : "text-gray-500"
                      }  group-hover:animate-beat duration-300 z-40 bg-clip-text [-webkit-text-stroke:1px_white]  hover:[-webkit-text-stroke:0px] transition-all`}
                    ></i>
                  </button>
                </div>
                {(vietnamLocations[index]?.star ?? 4.5) <= 4.5 &&
                (vietnamLocations[index]?.star ?? 4.5) > 4 ? (
                  <div className="bg-white rounded-xl absolute top-1 left-1 ">
                    <p className="text-sm text-black font-semibold p-1 px-2">
                      Được khách yêu thích
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-400 rounded-xl absolute top-1 left-1">
                    <p className="text-sm text-black font-semibold p-1 px-2">
                      Chủ nhà siêu cấp
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
    <div className="">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-10 relative">
        <div className=" ">
          <div className="flex justify-center">
            <FormatTime />
          </div>
          <div className="flex justify-center mt-10">
            {resultSearch.length >= 1 ? (
              <div className="md:w-2/3 w-[95%] grid grid-cols-1 gap-5">
                {renderRooms()}
              </div>
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
          <div className="sticky xl:top-28 top-52">
            <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.4184472557!2d106.36556595347503!3d10.755292861627074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1732295370863!5m2!1svi!2s"
                className="xl:h-[700px] md:h-[500px] h-[360px] w-full z-50"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </BackgroundGradient>
          </div>
        </div>
      </div>
      <FormDialog Open={Open} handleClose={handleClose} />
    </div>
  );
}
