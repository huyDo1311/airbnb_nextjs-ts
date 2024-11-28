"use client";
import { typeContent } from "@/app/(public)/(ListRoom)/ListRoom";
import { CustomerPickerDetails } from "@/app/(public)/room-detail/[query]/CustomerPickerDetails";
import { DatePickerWithRangeDetails } from "@/app/(public)/room-detail/[query]/DatePickerWithRangeDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@/store/store";
import {
  AirVent,
  Award,
  CircleParking,
  CookingPot,
  FlameKindling,
  KeyRound,
  Languages,
  MountainSnow,
  Shirt,
  Smile,
  TvMinimal,
  WashingMachine,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RoomDetails() {
  let { dataApiListRoom, star, dataLocation } = useStore();
  const searchParams = useSearchParams();
  const newSearch = searchParams.get("name");
  const [dataDetail, setDataDetail] = useState<typeContent>({
    id: 0,
    tenPhong: "",
    khach: 1,
    phongNgu: 1,
    giuong: 1,
    phongTam: 1,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: "",
  });
  console.log("sy ngu lon", dataDetail);
  useEffect(() => {
    let filterDetail: any = dataApiListRoom.filter(
      (item: any) => item.id == newSearch
    );
    setDataDetail(filterDetail[0]);
  }, []);
  let renderRoomDetails = () => {
    return (
      <div className="space-y-4 2xl:w-1/2 ">
        <p className="text-3xl font-semibold">{dataDetail?.tenPhong}</p>
        <div className="flex space-x-2">
          {star > 4 ? (
            <>
              <Award color="#e26060" />

              <p className="text-md font-semibold">
                {star == 5 ? "Chủ nhà siêu cấp" : "Chủ nhà được ưa thích"}
              </p>
            </>
          ) : (
            <>
              <Smile color="#e26060" />
              <p className="text-md font-semibold">
                Chủ nhà này hiện tại chưa đạt được thành tựu nào
              </p>
            </>
          )}
        </div>
        <div className="w-full">
          {dataDetail?.hinhAnh && (
            <Image
              src={dataDetail?.hinhAnh}
              width={800}
              height={800}
              alt="ks"
              className="w-full"
            />
          )}
        </div>
        <div className="w-full flex">
          <div className="w-1/2">
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
            <div className="flex border p-5 space-x-5 justify-center rounded-2xl my-5 cursor-pointer">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 20 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={32}
                >
                  <g clipPath="url(#clip0_5880_37773)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z"
                      fill="#222222"
                    />
                  </g>
                </svg>
                <div className="text-md font-semibold px-2 line-">
                  <p className="text-center leading-tight">
                    Được khách <br /> yêu thích
                  </p>
                </div>
                <svg
                  viewBox="0 0 20 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={32}
                  className="scale-x-[-1] "
                >
                  <g clipPath="url(#clip0_5880_37773)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z"
                      fill="#222222"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z"
                      fill="#F7F7F7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z"
                      fill="#222222"
                    />
                  </g>
                </svg>
              </div>
              <p className="text-sm w-64 px-5 font-semibold">
                Khách đánh giá đây là một trong những ngôi nhà được yêu thích
                nhất trên Airbnb
              </p>
              <div className="flex items-center flex-col justify-center">
                <div>
                  <p className="text-xl font-bold text-center w-10 h-8">
                    {star}
                  </p>
                </div>
                <div className="flex space-x-1 text-lg h-3 items-center">
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
              <div className="flex items-center flex-col justify-center ms-10">
                <div className=" flex items-center ">
                  <p className="text-xl font-bold text-center w-10 h-8">166</p>
                </div>
                <p className="text-xs underline opacity-90 text-center h-3  flex items-center">
                  Đánh giá
                </p>
              </div>
            </div>
            <div className="">
              <div className="space-y-4  mt-4">
                <div className="flex space-x-3 border-b py-5">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-500">
                    <p className="text-lg font-semibold text-black">
                      Chủ nhà/Người tổ chức: Phan Sỹ
                    </p>
                    <p>
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
                      Những khách ở gần đây đã xếp hạng 5 sao cho quy trình nhận
                      phòng
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
                      Bể bơi, ăn uống ngoài trời và ghế ngoài trời thích hợp cho
                      các chuyến đi mùa hè.
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
              <p className="text-lg">{dataDetail?.moTa}</p>
            </div>
            <div className="space-y-5">
              <p className="font-bold text-2xl">Các tiện ích đi kèm</p>
              <div className="flex justify-between">
                {dataDetail?.bep && (
                  <div className="flex space-x-2 items-center">
                    <CookingPot />
                    <p>Bếp</p>
                  </div>
                )}
                {dataDetail?.wifi && (
                  <div className=" flex space-x-2 items-center w-28">
                    <Wifi />
                    <p>Wifi</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                {dataDetail?.tivi && (
                  <div className="flex space-x-2 items-center">
                    <TvMinimal />
                    <p>Tivi</p>
                  </div>
                )}
                {dataDetail?.dieuHoa && (
                  <div className=" flex space-x-2 items-center w-28">
                    <AirVent />
                    <p>Điều hòa</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                {dataDetail?.doXe && (
                  <div className="flex space-x-2 items-center">
                    <CircleParking />
                    <p>Bãi đỗ xe</p>
                  </div>
                )}
                {dataDetail?.banUi && (
                  <div className=" flex space-x-2 items-center w-28">
                    <Shirt />
                    <p>Bàn ủi </p>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                {dataDetail?.hoBoi && (
                  <div className="flex space-x-2 items-center">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="water-ladder"
                      className="svg-inline--fa fa-water-ladder w-5 h-5"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M128 127.7C128 74.9 170.9 32 223.7 32c48.3 0 89 36 95 83.9l1 8.2c2.2 17.5-10.2 33.5-27.8 35.7s-33.5-10.2-35.7-27.8l-1-8.2c-2-15.9-15.5-27.8-31.5-27.8c-17.5 0-31.7 14.2-31.7 31.7V224H384V127.7C384 74.9 426.9 32 479.7 32c48.3 0 89 36 95 83.9l1 8.2c2.2 17.5-10.2 33.5-27.8 35.7s-33.5-10.2-35.7-27.8l-1-8.2c-2-15.9-15.5-27.8-31.5-27.8c-17.5 0-31.7 14.2-31.7 31.7V361c-1.6 1-3.3 2-4.8 3.1c-18 12.4-40.1 20.3-59.2 20.3h0V288H192v96.5c-19 0-41.2-7.9-59.1-20.3c-1.6-1.1-3.2-2.2-4.9-3.1V127.7zM306.5 389.9C329 405.4 356.5 416 384 416c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 469.7 417 480 384 480c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 405.2 165.1 416 192 416c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"
                      />
                    </svg>

                    <p>Hồ bơi</p>
                  </div>
                )}
                {dataDetail?.mayGiat && (
                  <div className=" flex space-x-2 items-center w-28">
                    <WashingMachine />
                    <p>Máy giặt </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <Card className="w-[350px] shadow-xl">
              <CardHeader>
                <CardTitle>${dataDetail?.giaTien}/ Đêm</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl   ">
                  <DatePickerWithRangeDetails />
                  <CustomerPickerDetails dataDetail={dataDetail} />
                </div>
                <button className="font-semibold text-md text-white bg-red-400 w-full rounded-lg p-2 my-5 py-3">
                  Đặt phòng
                </button>
                <p className="text-sm text-gray-400 text-center">
                  Bạn vẫn chưa bị trừ tiền{" "}
                </p>
                <div>
                  <p className="text-md font-medium underline">
                    ${dataDetail?.giaTien}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex justify-center flex-col items-center w-full">
      {" "}
      {renderRoomDetails()}
    </div>
  );
}
