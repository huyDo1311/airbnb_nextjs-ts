import { toast } from "@/hooks/use-toast";
import { typeContent } from "@/lib/helper.type";
import http from "@/lib/http";
import {
  formatStar,
  handleMoney,
  vietnameseDate,
  vietnamLocations,
} from "@/lib/utils2";
import { useStore } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoriteRooms() {
  let { favorite, dataApiListRoom } = useStore();
  const [dataFavorite, setDataFavorite] = useState<typeContent[]>();
  const [data2, setData2] = useState<any>();
  const [fetch, setfetch] = useState<boolean>(false);
  useEffect(() => {
    if (dataApiListRoom && favorite) {
      let filterFavorite = dataApiListRoom.filter((listRooms: typeContent) =>
        favorite.some((favoriteRoom: number) => favoriteRoom === listRooms.id)
      );
      setDataFavorite(filterFavorite.reverse().slice(0, 10));
    }
  }, [dataApiListRoom, favorite, fetch]);

  useEffect(() => {
    http
      .get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then((res) => {
        setData2(res.content.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  const handleDelete = (lovingId: any) => {
    let cloneDataFavorite = dataFavorite ? [...dataFavorite] : [];
    let result = cloneDataFavorite.find((item) => item.id === lovingId);
    if (result) {
      result.loving = false;
    }
    setfetch((a) => !a);
    setIsVisible(true);
  };

  let renderFavorite = () => {
    return dataFavorite?.map((item: typeContent, index: number): any => {
      return (
        <div key={index} className=" ">
          {item?.hinhAnh &&
            data2?.map((item2?: any) => {
              return (
                <div
                  key={item2?.id}
                  className="m-5 group  h-auto cursor-pointer z-20"
                >
                  {item2?.id == item.maViTri && (
                    <AnimatePresence initial={false}>
                      {item.loving && (
                        <div className="relative hover:scale-105  duration-300">
                          <Link
                            href={`/room-detail/id?name=${item.id}`}
                            className="w-full relative my-6 block rounded-2xl md:h-full sm:h-[320px] bg-white dark:bg-black  "
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              key="box"
                            >
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
                                    {vietnameseDate}
                                  </p>
                                  <p className="text-sm font-medium ">
                                    {handleMoney(item?.giaTien ?? 0)} / Đêm{" "}
                                  </p>
                                </div>
                                <div className="flex items-start">
                                  <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium">
                                      {formatStar(
                                        vietnamLocations[index]?.star
                                      )}{" "}
                                      {/* Display star with comma */}
                                    </p>
                                    <i className="fa fa-star text-sm transition duration-300 group-hover:text-yellow-300"></i>
                                  </div>
                                </div>
                              </div>

                              {vietnamLocations[index]?.star <= 4.5 &&
                                vietnamLocations[index]?.star > 4 && (
                                  <div className="dark:bg-white bg-white rounded-xl absolute top-2 left-2">
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
                            </motion.div>
                          </Link>
                          <button
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            className=" absolute top-3 right-3 active:scale-150 active:text-black/30   text-red-500 focus:text-black/30 "
                          >
                            <i
                              className="fa fa-heart    animate-beat duration-300 z-40 
                      bg-clip-text 
                      [-webkit-text-stroke:1px_white]
                      transition-all"
                            ></i>
                          </button>
                        </div>
                      )}
                    </AnimatePresence>
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
      {dataFavorite?.length ?? 0 > 0 ? (
        renderFavorite()
      ) : (
        <p className="text-2xl  text-center mt-10">
          Hiện tại bạn vẫn chưa ưa thích chỗ ở nào
        </p>
      )}
    </div>
  );
}
