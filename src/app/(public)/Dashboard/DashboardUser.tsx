"use client";
import userApiRequest from "@/apiRequests/user";
import FavoriteRooms from "@/app/(public)/Dashboard/FavoriteRooms";
import FormUploadImage from "@/app/(public)/Dashboard/FormUploadImage";
import RentedRooms from "@/app/(public)/Dashboard/RentedRooms";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/lib/helper.type";
import { useStore } from "@/store/store";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DashboardUser() {
  let { getUserData, setGetUserData } = useStore();

  const [avatarUser, setAvatarUser] = useState<string | null>(null);
  const [render, setRender] = useState(false);
  const [dataUser, setDataUser] = useState<UserProfile | null>(null);
  const formattedBirthday = dataUser?.birthday
    ? dataUser?.birthday ?? format(dataUser?.birthday, "dd/MM/yyyy")
    : "Date not available";

  useEffect(() => {
    userApiRequest
      .NextClientToServerGetUser(getUserData.id)
      .then((res) => {
        setDataUser(res.content);
        setAvatarUser(res.content.avatar);
        setGetUserData(res.content);
      })
      .catch((err) => {});
  }, [render]);

  return (
    <div className="h">
      <div className="lg:flex block relative ">
        <div className="lg:w-1/3 w-full       ">
          <div className="sticky top-36 ">
            <CardContainer className="z-50 ">
              <CardBody className=" h-full   group border-black relative group/card space-y-4 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  rounded-t-xl p-3  ">
                <div className="w-[350px]">
                  <CardItem
                    translateZ={100}
                    translateX={-10}
                    className="w-full mt-4"
                  >
                    <p
                      className="text-xl dark:text-white font-semibold text-accent text-center"
                      style={{ textShadow: "2px 2px #FF0000" }}
                    >
                      Thông tin người dùng
                    </p>
                  </CardItem>

                  <CardItem
                    translateZ={100}
                    translateX={-10}
                    className="w-full mt-4"
                  >
                    <div className="flex justify-center border-2 dark:border-white border-black py-3">
                      {avatarUser ? (
                        <Image
                          className="rounded-full w-40 h-40"
                          src={avatarUser}
                          width={200}
                          height={200}
                          alt="avatarUser"
                        />
                      ) : (
                        <Image
                          className="rounded-full w-40 h-40 object-cover"
                          src="/assets/Dashboard/anonymous.jpg"
                          width={200}
                          height={200}
                          alt="avatarUser"
                        />
                      )}
                    </div>{" "}
                  </CardItem>

                  <div className="flex justify-center ">
                    <Dialog>
                      <CardItem
                        translateZ={200}
                        translateX={40}
                        as={DialogTrigger}
                        className="rounded-xl pb-2  underline text-lg font-medium group-hover:text-red-400 group-hover:scale-125 transition   dark:text-white w-full"
                      >
                        <p className="text-md text-center">
                          {" "}
                          Thay đổi ảnh đại diện
                        </p>
                      </CardItem>

                      <DialogContent className="">
                        <DialogHeader>
                          <DialogTitle className=" text-center">
                            Thay đổi ảnh đại diện
                          </DialogTitle>
                          <div className="py-3">
                            <FormUploadImage
                              setRender={setRender}
                              render={render}
                            />
                          </div>
                          <DialogDescription className="text-center ">
                            chỉ chấp nhận jpeg, jpg, png và không quá 1mb
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardItem
                    translateZ={100}
                    translateX={30}
                    className="rounded-xl text-xs font-normal dark:text-white w-full"
                  >
                    {" "}
                    <div className="space-y-4 rounded border-2 p-4 dark:border-white border-black">
                      <div className="flex justify-between">
                        <p className="text-md font-semibold">Họ và tên:</p>
                        <CardItem
                          translateZ={200}
                          className="rounded-xl text-xs font-normal dark:text-white "
                        >
                          <p className="text-md">{dataUser?.name}</p>
                        </CardItem>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-md font-semibold">Email:</p>
                        <p className="text-md">{dataUser?.email}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-md font-semibold">Số điện thoại:</p>
                        <p className="text-md">{dataUser?.phone}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-md font-semibold">Sinh nhật:</p>
                        <p className="text-md">{formattedBirthday}</p>
                      </div>
                    </div>{" "}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        <div className="lg:w-2/3 w-full sm:p-10">
          <Tabs defaultValue="rented" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rented">Đã thuê</TabsTrigger>
              <TabsTrigger value="favorite">Ưa thích</TabsTrigger>
            </TabsList>
            <TabsContent value="rented">
              <RentedRooms />
            </TabsContent>
            <TabsContent value="favorite">
              <FavoriteRooms />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
