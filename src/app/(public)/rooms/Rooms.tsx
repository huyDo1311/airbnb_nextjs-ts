"use client";
import FormDialog from "@/app/(public)/FormDialog";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { toast } from "@/hooks/use-toast";
import {
  formatDateToVietnamese,
  formatStar,
  handleMoney,
  vietnamLocations,
} from "@/lib/utils2";
import { useStore } from "@/store/store";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});
export default function Rooms({ data2 }: any) {
  let {
    resultSearch,
    setStar,
    setDataLocation,
    getUserData,
    setRemoveFavorite,
    dataApiListRoom,
    setDataApiListRoom,
    setFavorite,
  } = useStore();
  const router = useRouter();

  let handleDetail = (star: number, tinhThanh: string) => {
    setStar(star);
    setDataLocation(tinhThanh);
  };

  const [Open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  let handleFavorite = (id: number) => {
    console.log(resultSearch);

    if (getUserData.id === 0) {
      setOpen(true);
      toast({
        title: "Bạn cần phải đăng nhập để thực hiện tính năng này",
      });
    } else {
      let findIndex = dataApiListRoom.findIndex((item: any) => item.id == id);
      let findResultSearch = resultSearch.find((item: any) => item.id == id);

      let find = dataApiListRoom.find((item2: any) => item2.loving == true);
      if (find?.loving == dataApiListRoom[findIndex].loving) {
        findResultSearch.loving = false;
        dataApiListRoom[findIndex].loving = false;
        setRemoveFavorite(id);
        setDataApiListRoom(dataApiListRoom);
        toast({
          title: "Đã xóa khỏi mục ưa thích",
        });
      } else {
        findResultSearch.loving = true;
        dataApiListRoom[findIndex].loving = true;
        setDataApiListRoom(dataApiListRoom);

        setFavorite(id);
        toast({
          title: "Đã được thêm vào mục ưa thích",
        });
      }
    }
  };
  const vietnameseDate = formatDateToVietnamese(new Date());
  let renderRooms = () => {
    return resultSearch.map((item: any, index: any) => {
      return (
        <div key={item.id} className="">
          {item.hinhAnh &&
            data2.content.data.map((item2: any) => {
              return (
                <div
                  key={item2.id}
                  className="  group  cursor-pointer z-20 m-2"
                >
                  {item2.id == item.maViTri && (
                    <CardContainer className="inter-var   ">
                      <CardBody className="group shadow-lg p-4 border  relative group/card  px-6 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl    ">
                        <Link
                          href={`/room-detail/id?name=${item.id}`}
                          className="block"
                          onClick={() => {
                            handleDetail(
                              vietnamLocations[index]?.star
                                ? vietnamLocations[index]?.star
                                : 4.5,
                              item2.tinhThanh
                            );
                          }}
                        >
                          <CardItem translateZ="50">
                            <div className=" lgCustom:h-[200px] overflow-hidden w-full   mdCustom:w-full h-[200px] ">
                              <Image
                                className="h-full w-[520px] object-left object-cover rounded-xl"
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

                          {(vietnamLocations[index]?.star ?? 4.5) < 4.5 &&
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
                          {(vietnamLocations[index]?.star ?? 4.5) >= 4.5 && (
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
                        </Link>

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
    <div>
      <FormDialog Open={Open} handleClose={handleClose} />
      <p className="text-lg font-semibold ms-6">
        {" "}
        Có {resultSearch.length} chỗ ở
      </p>
      <div className="w-full flex justify-center ">
        {resultSearch.length > 0 ? (
          <div className="w-fit grid lgCustom:grid-cols-4 mdCustom:grid-cols-3  smCustom:grid-cols-2 lg:gap-3   gap-5 py-3">
            {renderRooms()}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center ">
            {" "}
            <div className="w-1/3">
              <LottieAnimation />
            </div>
            <p className="text-2xl text-center mt-20 font-semibold">
              Hiện tại đang không có nơi ở mà bạn cần...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
