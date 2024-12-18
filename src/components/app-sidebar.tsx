"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  User,
  LogIn,
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
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import SigninForm from "@/app/(public)/auth/SigninForm";
import { useEffect, useState } from "react";
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
import { Button } from "react-day-picker";

export function AppSidebar() {
  const [tabValue, setTabValue] = useState<string>("signin");
  let { getUserData } = useStore();

  const handleClose = () => {
    setOpen(false);
  };
  const [fetchData, setFetchData] = useState<boolean>(false);

  const [Open, setOpen] = useState<boolean>(false);

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
      title: "Truy cập",
      url: "#",
      icon: LogIn,
      action: () => setOpen((a) => !a),
    },
    {
      title: "Thông tin người dùng",
      url: "#",
      icon: User,
    },
    {
      title: "Đặt lịch",
      url: "#",
      icon: Calendar,
    },

    {
      title: "Settings",
      url: "https://www.airbnb.com.vn/help",
      icon: Settings,
    },
  ];

  return (
    <div>
      <Sidebar className="">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Ứng dụng</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} onClick={item && item.action}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* <Dialog open={Open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50 z-10" />
          <DialogContent className="w-[500px] p-5 border fixed dark:bg-black bg-white black:bg-black shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-50 px-3">
            <DialogHeader>
              <DialogTitle className="text-center font-semibold text-lg py-5">
                Đăng nhập hoặc đăng ký
              </DialogTitle>
            </DialogHeader>
            <hr />
            <div className="h-auto">
              <Tabs
                value={tabValue}
                onValueChange={setTabValue}
                className="w-full h-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Đăng Nhập</TabsTrigger>
                  <TabsTrigger value="signup">Đăng ký</TabsTrigger>
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
          </DialogContent>
        </DialogPortal>
      </Dialog> */}
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>bk</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
