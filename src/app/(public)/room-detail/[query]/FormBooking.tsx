"use client";
import { typeContent } from "@/app/(public)/(ListRoom)/ListRoom";
import SigninForm from "@/app/(public)/auth/SigninForm";
import SignupForm from "@/app/(public)/auth/SignupForm";
import { CustomerPickerDetails } from "@/app/(public)/room-detail/[query]/CustomerPickerDetails";
import { DatePickerWithRangeDetails } from "@/app/(public)/room-detail/[query]/DatePickerWithRangeDetails";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useStore } from "@/store/store";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

import * as tabs from "@/components/ui/tabs";
import {
  AlertCircle,
  Award,
  CircleAlert,
  PartyPopper,
  Smile,
  Star,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { CreateBookingDetailBodyType } from "@/schemaValidations/booking.schema";
import { useAddBookingDetailMutation } from "@/queries/useBooking";
import Image from "next/image";
import bookingApiRequest from "@/apiRequests/booking";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
interface DataDetail {
  dataDetail: typeContent;
  query: string | null;
  setDifferenceDays: React.Dispatch<React.SetStateAction<number>>;
  countComments: number | null;
  totalMoney: string | undefined;
  handleSuccess: () => void;
}

export default function FormBooking({
  dataDetail,
  query,
  setDifferenceDays,
  countComments,
  totalMoney,
  handleSuccess,
}: DataDetail) {
  let { star, getUserData, dataApiListRoom, setDataRented, setHideHeader } =
    useStore();
  const handleClose = () => {
    setOpen(false);
    setOpenMobile(false);
  };

  const formatStar = (): string => {
    return star.toFixed(1).replace(".", ",");
  };

  let { total } = useStore();
  const [dateSubmit, setDateSubmit] = useState<DateRange | undefined>();
  const [Open, setOpen] = useState(false);
  const [OpenMobile, setOpenMobile] = useState(false);
  const [storageUser, setStorageUser] = useState<any>(null);
  let userBooking = useAddBookingDetailMutation();
  let refClick = useRef<null | HTMLButtonElement>(null);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<string>("signin");
  const [modalMobile, setModalMobile] = useState<boolean>(false);
  const handleClick = () => {
    setTabValue("signin");
  };

  useEffect(() => {
    if (getUserData?.id) {
      let dataOfUser = getUserData;
      setStorageUser(dataOfUser);
    }
  }, [fetchData, getUserData]);
  let handleOpenModal = async () => {
    if (dateSubmit?.from && dateSubmit?.to) {
      if (!storageUser) {
        if (window.innerWidth < 767) {
          setOpenMobile(true);
        } else {
          setOpen(true);
        }
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center">
              {" "}
              <CircleAlert className="me-2" /> Bạn cần phải đăng nhập.
            </div>
          ),
        });
      } else {
        setModalMobile(true);
      }
    } else {
      toast({
        variant: "destructive",
        description: (
          <div className="flex items-center">
            {" "}
            <CircleAlert className="me-2" /> Bạn cần phải chọn cả ngày nhận và
            trả phòng.
          </div>
        ),
      });
    }
  };
  let handlesubmit = async (): Promise<void> => {
    if (dateSubmit?.from && dateSubmit?.to) {
      let dataSubmit: CreateBookingDetailBodyType = {
        id: dataDetail.id ?? 0,
        maPhong: Number(query) ?? 0,
        ngayDen: dateSubmit?.from,
        ngayDi: dateSubmit?.to,
        soLuongKhach: total,
        maNguoiDung: storageUser.id,
      };
      await userBooking.mutateAsync(dataSubmit);

      let result = await bookingApiRequest.NextClientToServerGetBookingByUser(
        getUserData.id
      );
      let sliceData = result.content.reverse().slice(0, 10);
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
      setDataRented(filterDetail);
      handleSuccess();
      toast({
        description: (
          <div className="flex items-center">
            {" "}
            <PartyPopper className="me-2" />
            <p className="text-md text-red-400"> Đặt thành công.</p>
          </div>
        ),
      });
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex w-full justify-center">
          <div className="border rounded-xl  w-full sm:w-[430px]  ">
            <DatePickerWithRangeDetails
              setDateSubmit={setDateSubmit}
              setDifferenceDays={setDifferenceDays}
            />
            <CustomerPickerDetails dataDetail={dataDetail} />
          </div>
        </div>
        <div className="hidden md:block my-4">
          <Modal>
            <ModalTrigger
              storageUser={storageUser}
              className="bg-red-500 text-white flex justify-center group/modal-btn w-full rounded-lg "
              dateSubmit={dateSubmit}
              refClick={refClick}
              setHideHeader={setHideHeader}
            >
              <span className="group-hover/modal-btn:translate-x-72 text-center transition duration-500 w-full p-1">
                Đặt phòng
              </span>
              <div
                className=" w-full -translate-x-full group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20"
                onClick={handleOpenModal}
              >
                ✈️
              </div>
            </ModalTrigger>
            <ModalBody className="">
              <ModalContent className="w-full z-50 ">
                <div className="w-full">
                  <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                    <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                      Chuyến đi của bạn ✈️
                    </span>{" "}
                  </h4>
                  <div className="h-[500px] border-2 rounded-lg">
                    <div className=" block justify-center items-center border-b-2 space-x-2 p-4  h-[55%] sm:h-1/2">
                      <div className=" w-full h-32">
                        <Image
                          className="h-full w-full object-left object-cover rounded-xl"
                          src={dataDetail?.hinhAnh ?? ""}
                          width={1000}
                          height={1000}
                          alt="ks"
                        />
                      </div>
                      <div className=" rounded-lg  space-y-1 p-1">
                        <span className="  text-md sm:text-lg font-medium">
                          {dataDetail?.tenPhong}
                        </span>{" "}
                        <div className="sm:flex items-center sm:space-x-1">
                          <div className="flex items-center space-x-1">
                            <Star size={13} color="#FFD602" />
                            <p className="text-md font-medium">
                              {formatStar()}
                            </p>
                            <p className="text-sm">
                              ({countComments} bình luận)
                            </p>
                          </div>
                          <div className="flex  items-center">
                            {star > 4 && <Award size={13} color="#e26060" />}

                            <p className="text-sm font-medium">
                              {star == 5
                                ? "Chủ nhà siêu cấp"
                                : star < 4
                                ? ""
                                : "Chủ nhà được ưa thích"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full p-5 h-1/2">
                      <div className="  flex  flex-col justify-center space-y-2 w-2/3">
                        <div className="sm:flex block items-center sm:space-x-1">
                          <p className="md:text-lg text-md font-semibold">
                            Ngày:
                          </p>
                          <p className="md:text-lg text-md font-normal">
                            {dateSubmit?.from &&
                              format(dateSubmit?.from, "dd ")}{" "}
                            -{" "}
                            {dateSubmit?.to &&
                              format(dateSubmit?.to, "dd MMM yyy", {
                                locale: vi,
                              })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <p className="md:text-lg text-md font-semibold">
                            Khách:{" "}
                          </p>
                          <p className="md:text-lg text-md font-normal">
                            {total}
                          </p>
                        </div>
                        <div className="sm:flex block items-center sm:space-x-1">
                          <p className="md:text-lg text-md font-semibold text-nowrap">
                            Tổng giá (VNĐ):{" "}
                          </p>
                          <p className="md:text-lg text-md font-normal">
                            {totalMoney}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-1/3">
                        <Image
                          src="/assets/airbnb.png"
                          width={120}
                          height={120}
                          alt="logo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalContent>
              <ModalFooter
                setHideHeader={setHideHeader}
                handleSuccess={handleSuccess}
                handlesubmit={handlesubmit}
                className="gap-4"
              ></ModalFooter>
            </ModalBody>
          </Modal>
        </div>
        <div className="">
          <Dialog open={Open} onOpenChange={setOpen}>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 md:block hidden w-[500px]  bg-black/50 z-10" />
              <DialogContent className="md:block hidden w-[500px] p-5 border fixed dark:bg-black bg-white black:bg-black shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-50 px-3">
                <DialogHeader>
                  <DialogTitle className="text-center font-semibold text-lg py-5">
                    Đăng nhập hoặc đăng ký
                  </DialogTitle>
                </DialogHeader>
                <hr />
                <div className="h-auto">
                  <tabs.Tabs
                    value={tabValue}
                    onValueChange={setTabValue}
                    className="w-full h-full"
                  >
                    <tabs.TabsList className="grid w-full grid-cols-2">
                      <tabs.TabsTrigger value="signin">
                        Đăng Nhập
                      </tabs.TabsTrigger>
                      <tabs.TabsTrigger value="signup">
                        Đăng ký
                      </tabs.TabsTrigger>
                    </tabs.TabsList>
                    <tabs.TabsContent value="signin">
                      <SigninForm
                        setFetchData={setFetchData}
                        handleClose={handleClose}
                      />
                    </tabs.TabsContent>
                    <tabs.TabsContent value="signup">
                      <SignupForm handleClick={handleClick} />
                    </tabs.TabsContent>
                  </tabs.Tabs>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
        <div>
          <Drawer open={OpenMobile} onOpenChange={setOpenMobile}>
            <DrawerContent className="md:hidden block">
              <DrawerHeader className="flex flex-col items-center">
                <DrawerTitle className=""> Đăng nhập hoặc đăng ký</DrawerTitle>
                <DrawerDescription>
                  Truy cập ngay để trải nghiệm nhiều tính năng mới
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full flex justify-center">
                <tabs.Tabs
                  value={tabValue}
                  onValueChange={setTabValue}
                  className="w-[90%] h-full"
                >
                  <tabs.TabsList className="grid w-full grid-cols-2  h-10 my-2">
                    <tabs.TabsTrigger
                      value="signin"
                      className=" rounded-lg border focus:bg-gray-300/25"
                    >
                      Đăng Nhập
                    </tabs.TabsTrigger>
                    <tabs.TabsTrigger
                      value="signup"
                      className="rounded-lg border focus:bg-gray-300/25"
                    >
                      Đăng ký
                    </tabs.TabsTrigger>
                  </tabs.TabsList>
                  <tabs.TabsContent value="signin">
                    <SigninForm
                      setFetchData={setFetchData}
                      handleClose={handleClose}
                    />
                  </tabs.TabsContent>
                  <tabs.TabsContent value="signup">
                    <SignupForm handleClick={handleClick} />
                  </tabs.TabsContent>
                </tabs.Tabs>
              </div>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className=" p-3 py-5 w-full left-0 bottom-0 fixed border bg-white text-black flex justify-between px-5 z-50">
        <div>
          <p className="text-lg font-medium underline">{totalMoney}/ Đêm</p>
          <p className="text-xs  font-normal">
            {dateSubmit?.from && format(dateSubmit?.from, "dd ")} -{" "}
            {dateSubmit?.to &&
              format(dateSubmit?.to, "dd MMM ", {
                locale: vi,
              })}
          </p>
        </div>

        <Drawer open={modalMobile}>
          <DrawerTrigger>
            {" "}
            <Button
              variant="default"
              className="px-8"
              onClick={handleOpenModal}
            >
              Đặt phòng
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {" "}
                <span className="text-xl px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                  Chuyến đi của bạn ✈️
                </span>{" "}
              </DrawerTitle>
              <DrawerDescription>
                Bạn có thể hủy bất cứ lúc nào
              </DrawerDescription>
            </DrawerHeader>
            <div className="w-full">
              <div className="h-[500px] border-2 rounded-lg">
                <div className=" sm:flex  w-full flex flex-col items-center border-b-2 space-x-2 p-4  ">
                  <div className=" w-28 h-28 ">
                    <Image
                      className="w-28 h-28 object-left object-cover rounded-xl"
                      src={dataDetail?.hinhAnh ?? ""}
                      width={1000}
                      height={1000}
                      alt="ks"
                    />
                  </div>
                  <div className=" rounded-lg  space-y-1 p-1">
                    <span className=" text-wrap text-sm text-center font-medium">
                      {dataDetail?.tenPhong}
                    </span>{" "}
                    <div className="flex-col  flex items-center sm:space-x-1">
                      <div className="flex items-center space-x-1">
                        <Star size={13} color="#FFD602" />
                        <p className="text-md font-medium">{formatStar()}</p>
                        <p className="text-sm">({countComments} bình luận)</p>
                      </div>
                      <div className="flex  items-center">
                        {star > 4 && <Award size={13} color="#e26060" />}

                        <p className="text-sm font-medium">
                          {star == 5
                            ? "Chủ nhà siêu cấp"
                            : star < 4
                            ? ""
                            : "Chủ nhà được ưa thích"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-5 h-1/2">
                  <div className="  flex  flex-col justify-center space-y-2 w-2/3">
                    <p className="text-xl font-semibold">Chuyến đi của bạn</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold">Ngày:</p>
                      <p className="text-lg text-md font-normal">
                        {dateSubmit?.from && format(dateSubmit?.from, "dd ")} -{" "}
                        {dateSubmit?.to &&
                          format(dateSubmit?.to, "dd MMM yyy", {
                            locale: vi,
                          })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <p className="text-lg text-md font-semibold">Khách: </p>
                      <p className="text-lg text-md font-normal">{total}</p>
                    </div>
                    <div className="flex  items-center space-x-2">
                      <p className="text-lg text-md font-semibold text-nowrap">
                        Tổng giá (VNĐ):{" "}
                      </p>
                      <p className="text-lg text-md font-normal">
                        {totalMoney}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button
                  onClick={() => {
                    setModalMobile(false), handlesubmit;
                  }}
                  className="w-full"
                >
                  Thuê phòng
                </Button>
              </DrawerClose>
              <DrawerClose>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setModalMobile(false)}
                >
                  Hủy
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
