import SigninForm from "@/app/(public)/auth/SigninForm";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React from "react";
import SignupForm from "@/app/(public)/auth/SignupForm";

export default function AuthBox() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-md font-semibold cursor-pointer">Đăng nhập</p>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-10" />
        <DialogContent className="w-[500px] fixed bg-white shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg z-20 px-3">
          <DialogHeader>
            <DialogTitle className="text-center font-semibold text-lg py-5">
              Đăng nhập hoặc đăng ký
            </DialogTitle>
          </DialogHeader>
          <hr />
          <div className="h-auto">
            <Tabs defaultValue="signin" className="w-full h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Đăng Nhập</TabsTrigger>
                <TabsTrigger value="signup">Đăng ký</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SigninForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
