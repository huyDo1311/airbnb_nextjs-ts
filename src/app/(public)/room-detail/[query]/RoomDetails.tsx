"use client";
import bookingApiRequest from "@/apiRequests/booking";
import commentsRequest from "@/apiRequests/comments";
import revalidateApiRequest from "@/apiRequests/revalidate";
import Comments from "@/app/(public)/room-detail/[query]/Comments";
import FormBooking from "@/app/(public)/room-detail/[query]/FormBooking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import GradualSpacing from "@/components/ui/gradual-spacing";
import NumberTicker from "@/components/ui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import SparklesText from "@/components/ui/sparkles-text";
import { Textarea } from "@/components/ui/textarea";
import WordPullUp from "@/components/ui/word-pull-up";
import { toast } from "@/hooks/use-toast";
import { typeContent } from "@/lib/helper.type";
import {
  formatMoney,
  formatStar,
  formatVietNamDate,
  handleMoney,
} from "@/lib/utils2";
import { commentsSchema } from "@/schemaValidations/comments.schema";
import { useStore } from "@/store/store";
import confetti from "canvas-confetti";

import {
  AirVent,
  Award,
  CircleParking,
  CookingPot,
  FlameKindling,
  KeyRound,
  Languages,
  MountainSnow,
  Send,
  Smile,
  Sparkles,
  TvMinimal,
  WashingMachine,
  Wifi,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
const LottieAnimationPurchase = dynamic(
  () => import("@/components/animatePurchase"),
  {
    ssr: false,
  }
);

export default function RoomDetails({
  query,
  dataDetailName,
  commentsOfUsers,
}: {
  query: string;
  dataDetailName: typeContent;
  commentsOfUsers: commentsSchema[];
}) {
  const [differenceDays, setDifferenceDays] = useState<number>(1);

  let {
    dataApiListRoom,
    star,
    dataLocation,
    setCustomerDetails,
    setFetchDataStore,
    getUserData,
    dataRented,
    setDataRented,
    fetchDataStore,
    dataDetail,
    setDataDetail,
  } = useStore();
  const [money, setMoney] = useState<string | null>(null);
  const [moneyNumberOfDays, setMoneyNumberOfDays] = useState<string | null>(
    null
  );
  const [totalMoney, setTotalMoney] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const refComments = useRef<HTMLButtonElement | null>(null);
  const refCommentsMobile = useRef<HTMLButtonElement | null>(null);
  const [displayDes, setdisplayDes] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1); // To handle hover effect
  const [selectedIndex, setSelectedIndex] = useState(-1); // To handle click effect
  const [showRating, setShowRating] = useState<number>(-1);
  const router = useRouter();

  useEffect(() => {
    if (dataDetailName) {
      let giaTien = dataDetailName.giaTien;
      let moneyDetail = handleMoney(giaTien);
      setMoney(moneyDetail);
      let moneyOfDays = handleMoney(giaTien, { numberOfDays: differenceDays });
      setMoneyNumberOfDays(moneyOfDays);

      let totalMoneyNe = handleMoney(
        giaTien,
        { numberOfDays: differenceDays },
        { cleaningFee: 10 }
      );
      setTotalMoney(totalMoneyNe);
    }
  }, [differenceDays]);

  useEffect(() => {
    if (isSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSuccess]);

  useEffect(() => {
    if (query) {
      const selectedRoom = dataDetailName;
      setCustomerDetails(selectedRoom.khach);
      setDataDetail(selectedRoom);
      setFetchDataStore();
    }
  }, [query]);

  useEffect(() => {
    if (getUserData?.id) {
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
          let cloneFilterDetail = [...filterDetail];
          let newFilterDetail = cloneFilterDetail.map((data, index) => {
            let ngayDen = filterSliceData[index]?.ngayDen;
            let ngayDi = filterSliceData[index]?.ngayDi;
            let newData = { ...data, ngayDen, ngayDi };
            return newData;
          });

          setDataRented(newFilterDetail);
        })
        .catch((err) => console.log(err, "err"));
    }
  }, [dataApiListRoom, fetchDataStore, setDataRented]);

  useEffect(() => {
    let findIndex = dataRented.findIndex(
      (item: typeContent) => item?.id == Number(query)
    );

    setShowRating(findIndex);
  }, [dataRented, query, showRating]);

  let handleSuccess = async () => {
    setIsSuccess(true);
    setFetchDataStore();
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    setTimeout(() => {
      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    }, 2000);
  };
  let handleDisplayComment = () => {
    if (window.innerWidth >= 1024) {
      refComments?.current?.click();
    } else {
      refCommentsMobile?.current?.click();
    }
  };
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index); // Update the hover index
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1); // Reset hover when mouse leaves
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index); // Set the clicked star as selected
  };

  let selectStar = (): any => {
    const displayStars = Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className="cursor-pointer"
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(index)}
      >
        <i
          className={`fa fa-star ${
            hoveredIndex >= index || selectedIndex >= index
              ? "text-yellow-300"
              : "text-gray-300"
          }`}
        />
      </div>
    ));
    return displayStars;
  };
  const [userInput, setUserInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    let date = new Date();
    e.preventDefault();

    if (selectedIndex !== -1 && userInput.length > 3) {
      let dataCommentSubmit = {
        maPhong: query,
        maNguoiBinhLuan: getUserData.id,
        ngayBinhLuan: date.toString(),
        noiDung: userInput,
        saoBinhLuan: selectedIndex + 1,
      };
      commentsRequest
        .NextClientToServerPostComments(dataCommentSubmit)
        .then(async (res) => {
          setUserInput("");
          router.refresh();
          await revalidateApiRequest("comments");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userInput.length < 3) {
      toast({
        title: "Bạn cần phải viết đánh giá trên 3 kí tự ",
      });
    } else {
      toast({
        title: "Bạn cần phải lựa chọn sao",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  let renderStars = (stars: number) => {
    let resultStar = Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-3"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",

          fill: index < stars ? "#FFD700" : "#E0E0E0", // Gold for filled, light gray for empty
        }}
      >
        <path
          fillRule="evenodd"
          d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
        />
      </svg>
    ));
    return resultStar;
  };
  const renderComments = () => {
    return commentsOfUsers?.slice(0, 4).map((item: commentsSchema) => (
      <div
        key={item.id}
        className="  flex justify-center flex-col items-center p-5 px-10 lg:p-0 lg:border-none border rounded-2xl"
      >
        <div className="lg:w-3/4 w-full ">
          <div className="flex items-center space-x-4 lg:space-x-2">
            <Avatar className="-z-10 lg:w-11 lg:h-11 w-16 h-16">
              <AvatarImage
                src={item.avatar ? item.avatar : "/assets/anonymous.png"}
                className=" rounded-full"
                alt="user"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div>
              <p className="md:text-md text-lg font-semibold">
                {item.tenNguoiBinhLuan}
              </p>
              <p className="text-sm text-gray-500">3 năm hoạt động</p>
            </div>
          </div>

          <div className="mt-2 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg flex space-x-1">
                {renderStars(item.saoBinhLuan)}
              </span>
              <span className=" text-sm font-semibold">
                {formatVietNamDate(item.ngayBinhLuan)}
              </span>
            </div>
            <p className="lg:text-xl text-md h-14 overflow-y-hidden   font-medium capitalize">
              {item.noiDung ? item.noiDung : "Tốt"}
            </p>
          </div>
        </div>
      </div>
    ));
  };
  let renderRoomDetails = () => {
    if (dataDetail) {
      return (
        <div className="space-y-4 ">
          <WordPullUp className="text-3xl font-semibold">
            {dataDetail?.tenPhong}
          </WordPullUp>
          <div className="flex space-x-2">
            {star > 4 ? (
              <>
                <Award color="#e26060" />
                <GradualSpacing
                  className="text-md font-semibold"
                  text={
                    star == 5 ? "Chủ nhà siêu cấp" : "Chủ nhà được ưa thích"
                  }
                />
              </>
            ) : (
              <>
                <Smile color="#e26060" />
                <GradualSpacing
                  className="text-md font-semibold"
                  text="Chủ nhà chưa đạt được thành tựu nào"
                />
              </>
            )}
          </div>
          <div className="w-full rounded-xl overflow-hidden ">
            {dataDetail?.hinhAnh ? (
              <Image
                src={dataDetail?.hinhAnh}
                width={800}
                height={800}
                alt="ks"
                className="w-full lg:h-[400px] h-[250px]"
              />
            ) : (
              <Skeleton className=" w-full h-[500px]" />
            )}
          </div>
          <div className="w-full block lg:flex pt-5">
            <div className="w-full lg:w-3/4">
              <p className="text-2xl font-semibold">
                Toàn bộ căn hộ chung cư cao cấp tại {dataLocation}, Việt Nam
              </p>
              <div className="flex font-light space-x-1">
                <p className="text-md text-slate-600">
                  {dataDetail?.khach} khách ,{" "}
                </p>
                <p className="text-md text-slate-600">
                  {dataDetail?.phongNgu} Phòng ngủ ,
                </p>
                <p className="text-md text-slate-600">
                  {dataDetail?.giuong} Giường ,{" "}
                </p>
                <p className="text-md text-slate-600">
                  {dataDetail?.phongTam} Phòng tắm
                </p>
              </div>

              <div className="hidden lg:block">
                <Dialog>
                  <DialogTrigger asChild ref={refComments}>
                    <div className="flex border p-3 lg:p-5  justify-around rounded-2xl my-5 cursor-pointer">
                      <div className="xl:flex hidden items-center">
                        <Image
                          src="/assets/barley.png"
                          width={50}
                          height={50}
                          alt="barley"
                        />
                        <div className="xl:text-md text-sm font-semibold px-2 line-">
                          <SparklesText
                            sparklesCount={5}
                            className="text-center font-medium !z-10  text-sm leading-tight w-24"
                            text="Được khách yêu thích  "
                          />
                        </div>
                        <Image
                          className="transform scale-x-[-1]"
                          src="/assets/barley.png"
                          width={50}
                          height={50}
                          alt="barley"
                        />
                      </div>
                      <p className="text-sm hidden xl:block w-64 px-7 text-center font-semibold">
                        Khách đánh giá đây là một trong những ngôi nhà được yêu
                        thích nhất trên Airbnb
                      </p>

                      <div className="flex items-center flex-col justify-center">
                        <div>
                          <p className="lg:text-xl text-lg font-bold text-center w-10 h-8">
                            {formatStar(star)}
                          </p>
                        </div>
                        <div className="flex space-x-1 text-md lg:text-lg h-3 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                              display: "block",
                              height: 12,
                              width: 12,
                              fill: "currentcolor",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                              display: "block",
                              height: 12,
                              width: 12,
                              fill: "currentcolor",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                              display: "block",
                              height: 12,
                              width: 12,
                              fill: "currentcolor",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                              display: "block",
                              height: 12,
                              width: 12,
                              fill: "currentcolor",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                              display: "block",
                              height: 12,
                              width: 12,
                              fill: "currentcolor",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center xl:hidden justify-center border-x md:w-64 sm:w-52">
                        <Image
                          src="/assets/barley.png"
                          width={50}
                          height={50}
                          className="xl:w-14 w-10"
                          alt="barley"
                        />
                        <div className="xl:text-md text-sm font-semibold px-2 line-">
                          <SparklesText
                            sparklesCount={5}
                            className="text-center font-medium   text-sm leading-tight w-24"
                            text="Được khách yêu  thích "
                          />
                        </div>
                        <Image
                          className="transform scale-x-[-1] xl:w-14 w-10"
                          src="/assets/barley.png"
                          width={50}
                          height={50}
                          alt="barley"
                        />
                      </div>
                      <div className="flex items-center flex-col justify-center  w-20">
                        <div className=" flex items-center ">
                          <p className="text-xl font-bold text-center w-10 h-8">
                            <NumberTicker value={commentsOfUsers?.length} />
                          </p>
                        </div>
                        <p className="text-xs underline opacity-90 text-center h-3  flex items-center">
                          Đánh giá
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full p-5">
                    <DialogHeader>
                      <DialogTitle>
                        {" "}
                        <span className="flex justify-center">
                          <Image
                            src="/assets/barley.png"
                            width={50}
                            height={50}
                            alt="barley"
                          />
                          <p className="text-5xl font-bold ">
                            {formatStar(star)}
                          </p>
                          <Image
                            className="transform scale-x-[-1]"
                            src="/assets/barley.png"
                            width={50}
                            height={50}
                            alt="barley"
                          />
                        </span>
                        <SparklesText
                          sparklesCount={5}
                          className="text-center font-medium   text-sm leading-tight w-full"
                          text="Được khách yêu thích   "
                        />
                      </DialogTitle>
                      <DialogDescription className="space-y-3 w-full ">
                        <span className="w-full ">
                          <span>
                            Trong số các nhà/phòng cho thuê đủ điều kiện dựa
                            trên điểm xếp hạng, lượt đánh giá và vcđộ tin cậy,
                            nhà này nằm trong &nbsp;
                          </span>
                          <span className="font-bold">
                            nhóm 10% chỗ ở hàng đầu
                          </span>
                        </span>
                        <span className="text-xl font-semibold text-black dark:text-white text-center flex items-center justify-center ">
                          <NumberTicker value={commentsOfUsers?.length} />
                          lượt đánh giá{" "}
                          <Sparkles
                            className="ms-2"
                            size={20}
                            color="#a9ff29"
                            strokeWidth={2}
                          />
                        </span>
                      </DialogDescription>
                      <div>
                        <Comments commentsOfUsers={commentsOfUsers ?? []} />
                      </div>
                    </DialogHeader>
                    <div className=""></div>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <div className="block lg:hidden">
                  <Drawer>
                    <DrawerTrigger asChild ref={refCommentsMobile}>
                      <div className="flex border p-3 lg:p-5  justify-around rounded-2xl my-5 cursor-pointer">
                        <div className="xl:flex hidden items-center">
                          <Image
                            src="/assets/barley.png"
                            width={50}
                            height={50}
                            alt="barley"
                          />
                          <div className="xl:text-md text-sm font-semibold px-2 line-">
                            <SparklesText
                              sparklesCount={5}
                              className="text-center font-medium   text-sm leading-tight w-24"
                              text="Được khách yêu thích "
                            />
                          </div>
                          <Image
                            className="transform scale-x-[-1]"
                            src="/assets/barley.png"
                            width={50}
                            height={50}
                            alt="barley"
                          />
                        </div>
                        <p className="text-sm hidden xl:block w-64 px-7 text-center font-semibold">
                          Khách đánh giá đây là một trong những ngôi nhà được
                          yêu thích nhất trên Airbnb
                        </p>

                        <div className="flex items-center flex-col justify-center">
                          <div>
                            <p className="lg:text-xl text-lg font-bold text-center w-10 h-8">
                              {formatStar(star)}
                            </p>
                          </div>
                          <div className="flex space-x-1 text-md lg:text-lg h-3 items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                              style={{
                                display: "block",
                                height: 12,
                                width: 12,
                                fill: "currentcolor",
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                              style={{
                                display: "block",
                                height: 12,
                                width: 12,
                                fill: "currentcolor",
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                              style={{
                                display: "block",
                                height: 12,
                                width: 12,
                                fill: "currentcolor",
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                              style={{
                                display: "block",
                                height: 12,
                                width: 12,
                                fill: "currentcolor",
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                              style={{
                                display: "block",
                                height: 12,
                                width: 12,
                                fill: "currentcolor",
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center xl:hidden justify-center border-x md:w-64 sm:w-52">
                          <Image
                            src="/assets/barley.png"
                            width={50}
                            height={50}
                            className="xl:w-14 w-10"
                            alt="barley"
                          />
                          <div className="xl:text-md text-sm font-semibold px-2 line-">
                            <SparklesText
                              sparklesCount={5}
                              className="text-center font-medium   text-sm leading-tight w-24"
                              text="Được khách yêu thích "
                            />
                          </div>
                          <Image
                            className="transform scale-x-[-1] xl:w-14 w-10"
                            src="/assets/barley.png"
                            width={50}
                            height={50}
                            alt="barley"
                          />
                        </div>
                        <div className="flex items-center flex-col justify-center  w-20">
                          <div className=" flex items-center ">
                            <p className="text-xl font-bold text-center w-10 h-8">
                              {commentsOfUsers?.length}
                            </p>
                          </div>
                          <p className="text-xs underline opacity-90 text-center h-3  flex items-center">
                            Đánh giá
                          </p>
                        </div>
                      </div>
                    </DrawerTrigger>
                    <DrawerContent className="w-full ">
                      <div className="w-full flex justify-center">
                        <div className="sm:w-[90%] w-full">
                          <DrawerHeader>
                            <DrawerTitle>
                              <div className="flex justify-center">
                                <Image
                                  src="/assets/barley.png"
                                  width={50}
                                  height={50}
                                  alt="barley"
                                />
                                <p className="text-5xl font-bold ">
                                  {formatStar(star)}
                                </p>
                                <Image
                                  className="transform scale-x-[-1]"
                                  src="/assets/barley.png"
                                  width={50}
                                  height={50}
                                  alt="barley"
                                />
                              </div>
                              <SparklesText
                                sparklesCount={5}
                                className="text-center font-medium   text-sm leading-tight w-24"
                                text="Được khách yêu thích "
                              />
                            </DrawerTitle>
                            <DrawerDescription>
                              <p className="w-full md:flex justify-center">
                                <span>
                                  Trong số các nhà/phòng cho thuê đủ điều kiện
                                  dựa trên điểm xếp hạng, lượt đánh giá và độ
                                  tin cậy, nhà này nằm trong &nbsp;
                                </span>
                                <span className="font-bold">
                                  nhóm 10% chỗ ở hàng đầu
                                </span>
                              </p>
                              <span className="text-xl font-semibold text-black dark:text-white text-center flex items-center justify-center ">
                                {commentsOfUsers?.length} lượt đánh giá{" "}
                                <Sparkles
                                  className="ms-2"
                                  size={20}
                                  color="#a9ff29"
                                  strokeWidth={2}
                                />
                              </span>
                            </DrawerDescription>
                          </DrawerHeader>
                          <div>
                            <Comments commentsOfUsers={commentsOfUsers ?? []} />
                          </div>
                          <DrawerFooter></DrawerFooter>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>

              <div className="">
                <div className="space-y-4  my-4">
                  <div className="flex space-x-3 border-b py-5">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div className="text-sm ">
                      <p className="text-lg font-semibold ">
                        Chủ nhà/Người tổ chức: Phan Sỹ
                      </p>
                      <p className="text-gray-500">
                        Chủ nhà được ưa thích: hơn 4 năm kinh nghiệm đón khách
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <span className="material-icons-outlined text-gray-700">
                      <KeyRound />
                    </span>
                    <div className="ml-2">
                      <h2 className="text-lg font-semibold">
                        Trải nghiệm nhận phòng xuất sắc
                      </h2>
                      <p>
                        Những khách ở gần đây đã xếp hạng 5 sao cho quy trình
                        nhận phòng
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <span className="material-icons-outlined text-gray-700">
                      <MountainSnow />
                    </span>
                    <div className="ml-2">
                      <h2 className="text-lg font-semibold">
                        Giải trí ngoài trời
                      </h2>
                      <p>
                        Bể bơi, ăn uống ngoài trời và ghế ngoài trời thích hợp
                        cho các chuyến đi mùa hè.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <span className="material-icons-outlined text-gray-700">
                      <FlameKindling />
                    </span>
                    <div className="ml-2">
                      <h2 className="text-lg font-semibold">
                        Hướng núi và hướng vườn
                      </h2>
                      <p>Đắm mình vào khung cảnh trong thời gian bạn ở.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5  border-t-2 border-b-2 my-5 space-y-5">
                <div className="flex justify-between text-xl font-semibold p-4 rounded-xl border">
                  <p>Dịch sang tiếng Anh</p>
                  <Languages />
                </div>
                <div className={`  ${displayDes ? "" : "line-clamp-2"}`}>
                  <p className="text-lg">{dataDetail?.moTa}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setdisplayDes((a) => !a)}
                >
                  {displayDes ? "Thu gọn" : "Xem tất cả"}
                </Button>
              </div>
              <div className="space-y-5">
                <p className="font-bold text-2xl lg:text-left text-center">
                  Các tiện ích đi kèm
                </p>
                <div className="grid grid-cols-2 lg:gap-6 gap-5">
                  {[
                    {
                      icon: <WashingMachine />,
                      label: "Máy giặt",
                      isActive: dataDetail?.mayGiat,
                    },
                    {
                      icon: <AirVent />,
                      label: "Điều hoà",
                      isActive: dataDetail?.dieuHoa,
                    },
                    {
                      icon: <Wifi />,
                      label: "Wifi",
                      isActive: dataDetail?.wifi,
                    },
                    {
                      icon: <CookingPot />,
                      label: "Bếp",
                      isActive: dataDetail?.bep,
                    },
                    {
                      icon: <KeyRound />,
                      label: "Thẻ từ",
                      isActive: dataDetail?.banLa,
                    },
                    {
                      icon: <CircleParking />,
                      label: "Bãi đậu xe",
                      isActive: dataDetail?.doXe,
                    },
                    {
                      icon: <TvMinimal />,
                      label: "Tivi",
                      isActive: dataDetail?.tivi,
                    },
                  ].map(
                    (feature) =>
                      feature.isActive && (
                        <div
                          key={feature.label}
                          className="flex lg:justify-start  justify-center"
                        >
                          <div className="w-20 lg:w-auto space-y-2 justify-center lg:justify-start flex flex-col lg:flex-row items-center  lg:space-x-2">
                            <p>{feature.icon}</p>
                            <p> {feature.label}</p>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
            <div id="card" className="w-full lg:w-1/2  lg:flex justify-end ">
              <div className="space-y-5">
                <div className="w-full  hidden md:flex justify-center sticky xl:top-32 top-48 ">
                  <Card
                    className="xl:w-[400px] lg:w-[350px] sm:w-[450px] w-5/6
                   mt-28 lg:mt-0  p-3 shadow-xl  "
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {money}
                        <span className="text-sm font-normal"> / Đêm</span>
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormBooking
                        handleSuccess={handleSuccess}
                        dataDetail={dataDetail}
                        query={query}
                        setDifferenceDays={setDifferenceDays}
                        countComments={commentsOfUsers?.length}
                        totalMoney={totalMoney}
                      />
                      <p className="text-sm text-gray-400 text-center">
                        Bạn vẫn chưa bị trừ tiền{" "}
                      </p>
                      <div className="space-y-4 mt-3">
                        <div className="flex justify-between">
                          <p className="text-md font-light underline">
                            {money}x {differenceDays} đêm
                          </p>
                          <p>{moneyNumberOfDays}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-md font-light underline">
                            Phí vệ sinh
                          </p>
                          <p>{formatMoney(250)}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <p className="text-lg font-semibold">Tổng</p>
                          <p className="text-md font-medium underline">
                            {totalMoney}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                </div>
                <hr className="md:block hidden" />

                <div className="pt-10 md:hidden block">
                  <FormBooking
                    handleSuccess={handleSuccess}
                    dataDetail={dataDetail}
                    query={query}
                    setDifferenceDays={setDifferenceDays}
                    countComments={commentsOfUsers?.length}
                    totalMoney={totalMoney}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {
        <div className="">
          <div className="flex justify-center flex-col items-center w-full">
            {renderRoomDetails()}
          </div>
          <div className=" mt-10 ">
            <hr />
            <div className="my-10">
              <div className="flex justify-center i">
                <Image
                  src="/assets/barley.png"
                  width={100}
                  height={100}
                  alt="barley"
                />
                <p className="text-7xl font-bold pt-5">{formatStar(star)}</p>
                <Image
                  className="transform scale-x-[-1] -z-10"
                  src="/assets/barley.png"
                  width={100}
                  height={100}
                  alt="barley"
                />
              </div>
              <div className="flex justify-center flex-col items-center">
                <SparklesText
                  className="text-3xl font-medium mb-4"
                  text="Được khách yêu thích"
                />

                <div className="">
                  <p className="text-center w-80">
                    <span className="text-gray-600">
                      Trong số các nhà/phòng cho thuê đủ điều kiện dựa trên điểm
                      xếp hạng, lượt đánh giá và độ tin cậy, nhà này nằm trong
                      nhóm
                    </span>{" "}
                    10% chỗ ở hàng đầu
                  </p>
                </div>
              </div>
            </div>

            <hr />

            <div className="flex justify-between flex-col items-center my-10">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full h-56 lg:h-auto overflow-auto  gap-5 b">
                {renderComments()}
              </div>
            </div>
            <div className=" w-1/2 flex justify-center">
              {commentsOfUsers?.length > 4 && (
                <Button
                  variant="outline"
                  className=""
                  onClick={handleDisplayComment}
                >
                  Hiển thị tất cả {commentsOfUsers?.length} đánh giá
                </Button>
              )}
            </div>
          </div>

          {getUserData?.id !== 0 && showRating !== -1 && (
            <div className="my-14 ">
              <p className=" my-5 text-center text-3xl font-medium">
                Bảng đánh giá
              </p>
              <div className="w-full h-full flex justify-center ">
                <div className="xl:w-1/2 md:w-2/3 sm:w-3/4 w-full">
                  <BackgroundGradient className="rounded-[22px] w-full bg-white dark:bg-zinc-900  overflow-hidden">
                    <div className="space-y-3  lg:flex  justify-center items-center lg:space-x-5  p-5  ">
                      <div className="space-y-1">
                        <div className="flex flex-col items-center space-y-1">
                          <Avatar className="w-16 h-16 -z-10">
                            <AvatarImage
                              src={
                                getUserData?.avatar
                                  ? getUserData?.avatar
                                  : "/assets/anonymous.png"
                              }
                              className=" rounded-full"
                              alt="user"
                            />
                            <AvatarFallback>User</AvatarFallback>
                          </Avatar>
                          <p className="text-md text-center font-medium">
                            {getUserData?.name}
                          </p>
                        </div>
                        <div className="flex justify-center space-x-1">
                          {selectStar()}
                        </div>
                      </div>
                      <div className="w-full px-5 ">
                        <form
                          onSubmit={handleSubmit}
                          className="lg:flex w-full "
                        >
                          <Textarea
                            value={userInput}
                            onChange={handleChange}
                            className="resize-none   outline-none"
                            placeholder="Viết đánh giá của bạn vào đây"
                          />
                          <button
                            className="hover:scale-125 transition-all"
                            type="submit"
                          >
                            <Send className="hidden lg:block" size={30} />
                          </button>
                          <Button
                            variant="default"
                            className="w-full block lg:hidden"
                          >
                            <p>Gửi đi</p>
                          </Button>
                        </form>
                      </div>
                    </div>
                  </BackgroundGradient>
                </div>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="fixed top-0 left-0  text-4xl  w-full h-full bg-red-400 z-50  flex justify-center items-center ">
              <div className="lg:w-96 lg:h-96 w-64 h-64">
                <LottieAnimationPurchase />
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
}
