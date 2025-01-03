"use client";
import {
  Home,
  Settings,
  User,
  LogIn,
  Minus,
  Plus,
  CalendarFold,
  LogOut,
  UserCogIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SigninForm from "@/app/(public)/auth/SigninForm";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/store";
import SignupForm from "@/app/(public)/auth/SignupForm";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import http from "@/lib/http";
import Image from "next/image";
import { DateBefore, DateRange } from "react-day-picker";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface dataTypeCustomers {
  Object: string;
  Age: string;
  Quantity: any;
  HandleQuantityPlus: any;
  HandleQuantityMinus: any;
}
interface destinationProps {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}
export function AppSidebar() {
  let { clearStorageUser, getUserData } = useStore();

  let refDestination = useRef<HTMLDivElement | null>(null);
  let refCalendar = useRef<HTMLDivElement | null>(null);
  let refCustomer = useRef<HTMLDivElement | null>(null);

  let handleRefDestination = () => {
    refDestination.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  let handleRefCalendar = () => {
    refCalendar.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let handleRefCustomer = () => {
    refCustomer.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [tabValue, setTabValue] = useState<string>("signin");

  const handleClose = () => {
    setOpenLogin(false);
  };
  const [fetchData, setFetchData] = useState<boolean>(false);

  const [OpenLogin, setOpenLogin] = useState<boolean>(false);
  const [Open, setOpen] = useState<boolean>(false);
  const [OpenCalendar, setOpenCalendar] = useState<boolean>(false);

  const handleClick = () => {
    setTabValue("signin");
  };

  const items = [
    {
      title: "Trang chủ",
      url: "/",
      icon: Home,
    },
    {
      title: "Quản trị",
      url: "#",
      icon: UserCogIcon,
      action: () => router.push("/manage/dashboard"),
    },
    {
      title: "Truy cập",
      url: "#",
      icon: LogIn,
      action: () => setOpenLogin((a) => !a),
    },
    {
      title: "Thông tin",
      url: "/Dashboard",
      icon: User,
    },
    {
      title: "Đặt lịch",
      url: "#",
      icon: CalendarFold,
      action: () => {
        setOpenCalendar((a) => true);
        handleRefDestination();
      },
    },

    {
      title: "Cài đặt",
      url: "https://www.airbnb.com.vn/help",
      icon: Settings,
    },
    {
      title: "Đăng xuất",
      url: "#",
      icon: LogOut,
      action: () => {
        clearStorageUser();
        window.location.href = "/";
      },
    },
  ];

  let renderSideTab = (): any => {
    return items
      .filter((item) => {
        // Logic for filtering items based on user role and id
        if (item.title === "Quản trị" && getUserData?.role === "ADMIN") {
          return true;
        }
        if (
          (item.title === "Thông tin" || item.title === "Đăng xuất") &&
          getUserData?.id !== 0
        ) {
          return true;
        }
        if (
          item.title === "Trang chủ" ||
          item.title === "Cài đặt" ||
          (item.title === "Truy cập" && getUserData?.id === 0) || // Show "Truy cập" only when not signed in
          item.title === "Đặt lịch"
        ) {
          return true;
        }
        return false;
      })
      .map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a href={item.url} onClick={item?.action} className="space-x-2">
              <item.icon size={50} />
              <span className="text-xl">{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ));
  };

  //   DATA DESTINATION
  let { dataStoreDestination2 } = useStore();

  const [pickDataDestination, setPickDataDestination] = useState<
    destinationProps[]
  >([]);

  const { setDataStoreDestination, setDataStoreDestination2 } = useStore();
  let handleDestination = (id: number, tinhThanh: string): void => {
    setDataStoreDestination(id);
    setDataStoreDestination2(tinhThanh);
  };

  let renderDestination = () => {
    return pickDataDestination?.map((item) => {
      return (
        <div
          key={item.id}
          className="flex justify-center cursor-pointer active:scale-125 transition "
        >
          <div className="space-y-1">
            <div
              className="sm:w-36 sm:h-36 w-24 h-24 rounded-md overflow-hidden border-2 dark:border-white border-black"
              onClick={() => {
                handleDestination(item.id, item.tinhThanh);
              }}
            >
              <Image
                src={item.hinhAnh}
                width={100}
                height={100}
                className="w-full h-full"
                alt="destination"
              />
            </div>
            <p className="text-sm font-semibold text-center">
              {" "}
              {item.tinhThanh}
            </p>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    http
      .get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then((res) => {
        // setPickDataDestination(res.content.data);
        let vietNam = {
          id: 0,
          tenViTri: "vn",
          tinhThanh: "Khắp Việt Nam",
          quocGia: "Viet nam",
          hinhAnh:
            "https://i.pinimg.com/originals/c0/a7/0f/c0a70f0ab2d1559c9c0faf6eeae938f8.jpg",
        };
        let cloneDataDestination: destinationProps[] = [
          vietNam,
          ...res.content.data,
        ];
        setPickDataDestination(cloneDataDestination);
      })
      .catch((err) => console.log(err));
  }, []);

  // Calendar

  const [active, setActive] = useState(false);
  const [click, setClick] = useState<string | null>(null);
  const matcher: DateBefore = { before: new Date() };
  const [date, setDate] = useState<DateRange | undefined>();
  let { setDataCalendar, dataCalendar, removeDataHeader, setRemoveDataHeader } =
    useStore();

  let handleDate = (date: DateRange | undefined) => {
    setDate(date);
  };

  useEffect(() => {
    setDataCalendar(date);
  }, [date, setDataCalendar]);

  useEffect(() => {
    setDataCalendar(date);
  }, [date, setDataCalendar]);
  useEffect(() => {
    setDate(undefined);
  }, [setRemoveDataHeader, removeDataHeader]);

  //  Customer

  let {
    setCustomers,
    setSearch,
    dataStoreDestination,
    setHeaderTotal,
    headerTotal,
  } = useStore();
  let router = useRouter();
  const [quantityOfAdult, setQuantityOfAdult] = useState<number>(0);
  const [quantityOfChildren, setQuantityOfChildren] = useState<number>(0);
  const [quantityOfBabies, setQuantityOfBaby] = useState<number>(0);
  const [quantityOfPets, setQuantityOfPets] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(quantityOfAdult + quantityOfChildren);
    setHeaderTotal(quantityOfAdult + quantityOfChildren);
  }, [quantityOfAdult, quantityOfChildren]);
  let dataCustomers: dataTypeCustomers[] = [
    {
      Object: "Người lớn",
      Age: "Từ 13 tuổi trở lên",
      Quantity: quantityOfAdult,
      HandleQuantityPlus: setQuantityOfAdult,
      HandleQuantityMinus: setQuantityOfAdult,
    },
    {
      Object: "Trẻ em",
      Age: "Độ tuổi 2-12 ",
      Quantity: quantityOfChildren,
      HandleQuantityPlus: setQuantityOfChildren,
      HandleQuantityMinus: setQuantityOfChildren,
    },
    {
      Object: "Em bé",
      Age: "Dưới 2 tuổi",
      Quantity: quantityOfBabies,
      HandleQuantityPlus: setQuantityOfBaby,
      HandleQuantityMinus: setQuantityOfBaby,
    },
    {
      Object: "Thú cưng",
      Age: "Bạn sẽ mang theo động vật để phục vụ?",
      Quantity: quantityOfPets,
      HandleQuantityPlus: setQuantityOfPets,
      HandleQuantityMinus: setQuantityOfPets,
    },
  ];
  useEffect(() => {
    setQuantityOfAdult(0);
    setQuantityOfChildren(0);
    setQuantityOfBaby(0);
    setQuantityOfPets(0);
  }, [setRemoveDataHeader, removeDataHeader]);
  const formattedDestination = dataStoreDestination2.replace(/\s+/g, "-");

  let handleSearching = () => {
    if (!dataStoreDestination2) {
      toast({
        description: "Không được bỏ trống địa điểm",
      });
    } else if (!dataCalendar?.from || !dataCalendar?.to) {
      toast({
        description: "Không được bỏ trống ngày nhận và trả phòng",
      });
    } else if (headerTotal === 0) {
      toast({
        description: "Không được bỏ trống số lượng khách",
      });
    } else {
      setCustomers({
        adults: quantityOfAdult,
        children: quantityOfChildren,
        babies: quantityOfBabies,
        pets: quantityOfPets,
      });
      if (dataStoreDestination == 0) {
        router.push("/rooms");
      }

      window.location.href = `/room-destination/location?name=${formattedDestination}&id=${dataStoreDestination}`;
      setSearch();
    }
  };

  let renderCustomer = () => {
    return dataCustomers.map((item, index) => {
      return (
        <div
          key={index}
          className={`${
            index == 3 ? "" : "flex justify-between"
          }  space-y-2 border-b py-3`}
        >
          <div>
            <p className="text-md font-semibold">{item.Object}</p>
            <p
              className={`text-sm ${
                index == 3 ? "font-semibold underline" : "font-normal"
              }  text-gray-500`}
            >
              {item.Age}
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            <div>
              {item.Object == "Người lớn" ? (
                <Button
                  onClick={() => {
                    item.HandleQuantityMinus((prev: any) =>
                      prev == 1 ? 1 : prev - 1
                    );
                  }}
                  variant={`${item.Quantity == 0 ? "secondary" : "ghost"}`}
                  className={`rounded-full border-2 h-10 w-10 ${
                    item.Quantity == 1 ? "cursor-not-allowed opacity-30" : ""
                  }`}
                >
                  <Minus />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    item.HandleQuantityMinus((prev: any) =>
                      prev == 0 ? 0 : prev - 1
                    );
                  }}
                  variant={`${item.Quantity == 0 ? "secondary" : "ghost"}`}
                  className={`rounded-full border-2 h-10 w-10 ${
                    item.Quantity == 0 ? "cursor-not-allowed opacity-30" : ""
                  }`}
                >
                  <Minus />
                </Button>
              )}
            </div>
            <div className="w-10">
              <p className="text-center text-md">
                {item.Quantity == 5 ? "5+" : item.Quantity}
              </p>
            </div>
            <div>
              <Button
                onClick={() => {
                  item.HandleQuantityPlus((prev: any) =>
                    prev == 5 ? 5 : prev + 1
                  );
                }}
                variant={`${item.Quantity == 5 ? "secondary" : "ghost"}`}
                className={`rounded-full border-2 h-10 w-10 ${
                  item.Quantity >= 5 ? "cursor-not-allowed opacity-30" : ""
                }`}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Sidebar className="">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg">Ứng dụng</SidebarGroupLabel>
            <SidebarGroupContent className="mt-6">
              <SidebarMenu className="space-y-2">{renderSideTab()}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Truy cập */}
      <Drawer open={OpenLogin} onOpenChange={setOpenLogin}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle className=""> Đăng nhập hoặc đăng ký</DrawerTitle>
            <DrawerDescription>
              Truy cập ngay để trải nghiệm nhiều tính năng mới
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full flex justify-center">
            <Tabs
              value={tabValue}
              onValueChange={setTabValue}
              className="w-[90%] sm:h-full h-[600px]"
            >
              <TabsList className="grid w-full grid-cols-2  h-10 my-2">
                <TabsTrigger
                  value="signin"
                  className=" rounded-lg border focus:bg-gray-300/25"
                >
                  Đăng Nhập
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg border focus:bg-gray-300/25"
                >
                  Đăng ký
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SigninForm
                  setFetchData={setFetchData}
                  handleClose={handleClose}
                />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm handleClick={handleClick} />
              </TabsContent>
            </Tabs>
          </div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Đặt lịch */}
      <Drawer open={OpenCalendar} onOpenChange={setOpenCalendar}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle>Đặt chỗ nhanh chóng với Airbnb</DrawerTitle>
            <DrawerDescription>Nhanh chóng và tiện lợi!</DrawerDescription>
          </DrawerHeader>

          <div className="h-[550px] sm:h-[600px]  overflow-auto space-y-10">
            {/*  destination    */}

            <div
              className="w-full flex justify-center my-6 "
              ref={refDestination}
            >
              <div className="flex flex-col items-center w-full">
                <p className="text-xl text-red-400 font-medium">
                  Tìm kiếm địa điểm
                </p>
                <div className="grid grid-cols-3 sm:gap-5 gap-3 mt-3 px-4">
                  {renderDestination()}
                </div>
              </div>
            </div>
            <hr />

            {/*  calendar   */}

            <div className="py-6" ref={refCalendar}>
              <p className="text-center text-red-400 p-3  text-xl font-medium">
                Đặt ngày nhận và trả phòng
              </p>

              <div id="DatePicker" className="flex justify-center">
                <Calendar
                  locale={vi}
                  disabled={matcher}
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleDate}
                  numberOfMonths={2}
                  captionLayout="dropdown"
                />
              </div>
            </div>
            <hr />
            {/* customer */}

            <div className="space-y-8 px-10 w-full" ref={refCustomer}>
              <p className="text-xl text-center text-red-400 font-medium">
                Số lượng khách hàng
              </p>
              {renderCustomer()}
            </div>
          </div>

          <DrawerFooter className=" border-t border-2 rounded-t-lg !p-2">
            {" "}
            <div className=" flex items-center   h-full">
              {" "}
              {/* destination */}
              <div className="w-1/3" onClick={handleRefDestination}>
                <button className=" w-full h-full text-left ">
                  <div className="text-wrap text-center ">
                    <p className="font-semibold text-center  text-xs">
                      Địa điểm
                    </p>
                    <p
                      className={` text-sm ${
                        dataStoreDestination2 ? "font-normal " : "font-light  "
                      }`}
                    >
                      {dataStoreDestination2
                        ? dataStoreDestination2
                        : "Điểm đến"}
                    </p>
                  </div>
                </button>
              </div>
              {/* calendar */}
              <div className="w-1/3" onClick={handleRefCalendar}>
                {" "}
                <button
                  id="date2"
                  className={cn(
                    `group w-full h-full
            
              `
                  )}
                >
                  {dataCalendar?.to && dataCalendar?.from ? (
                    <div className="w-full text-sm  flex-col items-center flex">
                      <div className="w-full flex-col text-sm items-center flex">
                        {" "}
                        <p className="font-semibold text-xs text-wrap w-full">
                          Nhận & trả phòng
                        </p>
                        <div className="text-sm  flex">
                          <p>
                            {" "}
                            {format(dataCalendar.to, "dd ", { locale: vi })}
                          </p>{" "}
                          -
                          <p>
                            {format(dataCalendar.from, "dd MMM", {
                              locale: vi,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full ">
                      <div className="w-full h-full  ">
                        <p className="font-semibold text-xs text-wrap h-full w-full ">
                          Nhận & Trả phòng
                        </p>
                        <p className=" font-light w-full text-sm">Thêm ngày</p>
                      </div>
                    </div>
                  )}
                </button>
              </div>
              {/* customer */}
              <div
                className="flex justify-center h-full w-1/3"
                onClick={handleRefCustomer}
              >
                <button className="h-full  w-full  ">
                  <div>
                    <p className="font-semibold text-xs">Khách</p>
                    {headerTotal > 0 ? (
                      <p className=" ">{headerTotal} khách</p>
                    ) : (
                      <p className=" font-light text-sm">Thêm khách</p>
                    )}
                  </div>
                </button>
              </div>
            </div>
            <div className=" w-full flex justify-center">
              <button
                className="rounded-md p-1 border-2  w-1/2 text-sm font-medium"
                onClick={handleSearching}
              >
                {" "}
                Tìm kiếm
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
