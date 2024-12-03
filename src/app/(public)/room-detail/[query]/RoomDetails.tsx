"use client";
import commentsRequest from "@/apiRequests/comments";
import { typeContent } from "@/app/(public)/(ListRoom)/ListRoom";
import Comments from "@/app/(public)/room-detail/[query]/Comments";
import { CustomerPickerDetails } from "@/app/(public)/room-detail/[query]/CustomerPickerDetails";
import { DatePickerWithRangeDetails } from "@/app/(public)/room-detail/[query]/DatePickerWithRangeDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { commentsSchema } from "@/schemaValidations/comments.schema";
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
  Smile,
  Sparkles,
  TvMinimal,
  WashingMachine,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RoomDetails() {
  const [commentsOfUsers, setCommentsOfUsers] = useState<
    commentsSchema[] | null
  >(null);
  const [countComments, setCountComments] = useState(0);
  let { dataApiListRoom, star, dataLocation, setCustomerDetails } = useStore();
  const searchParams = useSearchParams();
  const query = searchParams.get("name");
  useEffect(() => {
    if (query) {
      commentsRequest
        .NextClientToServerGetComments(query)
        .then((res: any) => {
          let totalCount = 0;

          res?.content.forEach((_: any, index: any) => (totalCount = index));
          setCommentsOfUsers(res?.content);
          setCountComments(totalCount + 1);
        })
        .catch((err) => console.log(err));
    }
  }, [query]);

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
  const formatStar = (star: number) => {
    return star.toFixed(1).replace(".", ",");
  };
  useEffect(() => {
    // if (!dataApiListRoom) {
    //   window.location.reload();
    // }
    let filterDetail: any = dataApiListRoom?.filter(
      (item: any) => item.id == query
    );
    setCustomerDetails(filterDetail[0]?.khach);
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

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex border p-5 space-x-5 justify-center rounded-2xl my-5 cursor-pointer">
                  <div className="flex items-center">
                    <Image
                      src="/assets/barley.png"
                      width={50}
                      height={50}
                      alt="barley"
                    />
                    <div className="text-md font-semibold px-2 line-">
                      <p className="text-center leading-tight">
                        Được khách <br /> yêu thích
                      </p>
                    </div>
                    <Image
                      className="transform scale-x-[-1]"
                      src="/assets/barley.png"
                      width={50}
                      height={50}
                      alt="barley"
                    />
                  </div>
                  <p className="text-sm w-64 px-5 font-semibold">
                    Khách đánh giá đây là một trong những ngôi nhà được yêu
                    thích nhất trên Airbnb
                  </p>
                  <div className="flex items-center flex-col justify-center">
                    <div>
                      <p className="text-xl font-bold text-center w-10 h-8">
                        {formatStar(star)}
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
                      <p className="text-xl font-bold text-center w-10 h-8">
                        {countComments}
                      </p>
                    </div>
                    <p className="text-xs underline opacity-90 text-center h-3  flex items-center">
                      Đánh giá
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[1000px] p-5">
                <DialogHeader>
                  <DialogTitle>
                    {" "}
                    <div className="flex justify-center">
                      <Image
                        src="/assets/barley.png"
                        width={50}
                        height={50}
                        alt="barley"
                      />
                      <p className="text-5xl font-bold ">{formatStar(star)}</p>
                      <Image
                        className="transform scale-x-[-1]"
                        src="/assets/barley.png"
                        width={50}
                        height={50}
                        alt="barley"
                      />
                    </div>
                    <p className="text-lg text-center">Được khách yêu thích</p>
                  </DialogTitle>
                  <DialogDescription className="space-y-3 text-center">
                    Trong số các nhà/phòng cho thuê đủ điều kiện dựa trên điểm
                    xếp hạng, lượt đánh giá và vcđộ tin cậy, nhà này nằm trong
                    &nbsp;
                    <span className="font-bold">nhóm 10% chỗ ở hàng đầu</span>
                    <div className="text-xl font-semibold text-black text-center flex items-center justify-center ">
                      {countComments} lượt đánh giá{" "}
                      <Sparkles
                        className="ms-2"
                        size={20}
                        color="#a9ff29"
                        strokeWidth={2}
                      />
                    </div>
                  </DialogDescription>
                  <div>
                    <Comments commentsOfUsers={commentsOfUsers ?? []} />
                  </div>
                </DialogHeader>
                <div className=""></div>
                {/* <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>

            <div>
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
              <div className="grid grid-cols-2 gap-6">
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
                  { icon: <Wifi />, label: "Wifi", isActive: dataDetail?.wifi },
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
                      <div key={feature.label}>
                        <div className="flex items-center space-x-4 ">
                          <p>{feature.icon}</p>
                          <p> {feature.label}</p>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div id="card" className="w-1/2 flex justify-center">
            <div className="relative">
              <Card className="w-[350px] shadow-xl sticky top-28">
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