"use client";
import Authenticate from "@/app/(public)/auth/Authenticate";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSignoutMutation } from "@/queries/useAuth";
import { useStore } from "@/store/store";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MenuDropDown() {
  let refSidebar = useRef<HTMLButtonElement | null>(null);
  const [avatarUser, setAvatarUser] = useState<string | null>(null);
  const { fetchDataStore, getUserData, setFetchDataStore, clearStorageUser } =
    useStore();

  const signout = useSignoutMutation();
  let handleSignout = async () => {
    try {
      await signout.mutateAsync();
      setFetchDataStore();
      clearStorageUser();
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.log("loi", err);
    }
  };
  useEffect(() => {
    setAvatarUser(getUserData?.avatar);
  }, [getUserData, fetchDataStore]);
  let clickref = () => {
    refSidebar.current?.click();
  };

  return (
    <div>
      <SidebarTrigger ref={refSidebar} className="hidden" />
      <Button
        variant="outline"
        className="rounded-3xl w-[100px]  md:hidden flex"
        onClick={clickref}
      >
        <div className=" w-full flex justify-between items-center ">
          <div className="">
            <Menu className="w-10" size={50} />
          </div>
          <div className="w-8 h-8">
            <Image
              src={avatarUser ? avatarUser : "/assets/Dashboard/anonymous.jpg"}
              alt="avt"
              width={100}
              height={100}
              className="rounded-full w-full object-cover h-full"
            />
          </div>
        </div>
      </Button>
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger asChild>
            <RainbowButton className="rounded-3xl border-3 shadow-lg w-[100px] p-5 ">
              <div className=" w-[100px]  flex items-center ">
                <Menu
                  className="w-5 text-black/70 dark:text-white me-3"
                  size={50}
                />
                <div className="w-8 h-8 z-50">
                  <Image
                    src={
                      avatarUser
                        ? avatarUser
                        : "/assets/Dashboard/anonymous.jpg"
                    }
                    alt="avt"
                    width={100}
                    height={100}
                    className="rounded-full w-full object-cover h-full"
                  />
                </div>
              </div>
            </RainbowButton>
          </PopoverTrigger>
          <PopoverContent className="bg-white  border-2 border-black p-3 rounded-xl px-5 z-50">
            {getUserData?.id ? (
              <div className="space-y-1 text-black">
                {getUserData?.role === "ADMIN" && (
                  <div className=" ">
                    <Link className="text-sm" href="/manage/dashboard">
                      <Button
                        variant="ghost"
                        className="w-full flex justify-start"
                      >
                        Quản trị
                      </Button>
                    </Link>
                  </div>
                )}
                <div className=" ">
                  <Link className="text-sm" href="/Dashboard">
                    <Button
                      variant="ghost"
                      className="w-full flex justify-start"
                    >
                      Thông tin{" "}
                    </Button>
                  </Link>
                </div>

                <Button
                  variant="ghost"
                  className="flex justify-start w-full"
                  onClick={handleSignout}
                >
                  <p>Đăng xuất</p>
                </Button>
              </div>
            ) : (
              <div className="space-y-3 text-black">
                <Authenticate />
                <div>
                  <Button className="w-full flex justify-start" variant="ghost">
                    <p className="">Cho thuê chỗ ở qua Airbnb</p>
                  </Button>
                </div>
                <div>
                  <Button className="w-full flex justify-start" variant="ghost">
                    Tổ chức trải nghiệm
                  </Button>
                </div>
                <div>
                  <Button className="w-full flex justify-start" variant="ghost">
                    Trung tâm trợ giúp
                  </Button>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
