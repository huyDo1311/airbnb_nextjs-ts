"use client";
import SigninForm from "@/app/(public)/auth/SigninForm";
import SignupForm from "@/app/(public)/auth/SignupForm";
import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Drawer,
} from "@/components/ui/drawer";

interface dialogFormType {
  Open: boolean;
  handleClose: () => void;
}

export default function FormDialog({ Open, handleClose }: dialogFormType) {
  let { getUserData } = useStore();
  //   const [storageUser, setStorageUser] = useState<any>(null);

  const [tabValue, setTabValue] = useState<string>("signin");
  //   const [fetchData, setFetchData] = useState<boolean>(false);
  const handleClick = () => {
    setTabValue("signin");
  };

  const [fetchData, setFetchData] = useState<boolean>(false);

  if (typeof window !== "undefined") {
    if (window.innerWidth < 767) {
      return (
        <Drawer open={Open}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
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
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <div>
        <Dialog open={Open} onOpenChange={handleClose}>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/50 z-10" />
            <DialogContent className="] p-5 border fixed dark:bg-black bg-white black:bg-black shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-50 px-3">
              <DialogHeader>
                <DialogTitle className="text-center font-semibold text-lg py-5">
                  Đăng nhập hoặc đăng ký
                </DialogTitle>
              </DialogHeader>
              <hr />
              <div className="h-auto w-auto">
                <Tabs
                  value={tabValue}
                  onValueChange={setTabValue}
                  className="w-full"
                >
                  <TabsList className="grid w-auto grid-cols-2 h-auto">
                    <TabsTrigger value="signin">Đăng Nhập</TabsTrigger>
                    <TabsTrigger value="signup">Đăng ký</TabsTrigger>
                  </TabsList>
                  <TabsContent value="signin">
                    <SigninForm handleClose={handleClose} />
                  </TabsContent>
                  <TabsContent value="signup">
                    <SignupForm handleClick={handleClick} />
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    );
  }
}
