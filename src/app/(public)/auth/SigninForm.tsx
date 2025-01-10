"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SigninBody, SigninBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi, setUserToLocalStorage } from "@/lib/utils";
import { useSigninMutation } from "@/queries/useAuth";
import Image from "next/image";
import { CircleAlert, Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FacebookButton } from "@/app/(public)/auth/FacebookForm";

interface SigninFormProps {
  handleClose: () => void; // Specify that handleClose is a function that takes no arguments and returns void
  setFetchData?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SigninForm({
  handleClose,
  setFetchData,
}: SigninFormProps) {
  const { setFetchDataStore, setGetUserData } = useStore();
  let router = useRouter();
  const signinMutation = useSigninMutation();
  const [show, setShow] = useState(true);
  const form = useForm<SigninBodyType>({
    resolver: zodResolver(SigninBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: SigninBodyType) => {
    if (signinMutation.isPending) return;
    try {
      const result = await signinMutation.mutateAsync(data);
      const user = result.content.user;
      setGetUserData(user);
      setUserToLocalStorage(user);
      setFetchDataStore();
      handleClose();
      if (setFetchData) {
        setFetchData(true);
      }
      console.log(1);
      if (result.statusCode === 400) {
        console.log(2);
        toast({
          variant: "destructive",
          description: (
            <p className="flex text-md font-normal items-center">
              {" "}
              <CircleAlert className="me-2" />
              {result.content}
            </p>
          ),
        });
      } else {
        toast({
          description: "Xin chào " + result.content.user.name,
        });
      }
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };

  return (
    <div className="w-full">
      <Card className=" w-full shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email và mật khẩu của bạn để đăng nhập vào hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
              noValidate
              onSubmit={form.handleSubmit(onSubmit, (err) => {
                console.warn(err);
              })}
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Mật khẩu</Label>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={!show ? "text" : "password"}
                            required
                            {...field}
                          />
                          <Eye
                            onClick={() => {
                              setShow(true);
                            }}
                            className={`${
                              show ? "hidden" : "block"
                            } me-3 absolute right-1 top-2 cursor-pointer`}
                            size={20}
                          />
                          <EyeClosed
                            onClick={() => {
                              setShow(false);
                            }}
                            className={`${
                              show ? "block" : "hidden"
                            } me-3 absolute right-1 top-2 cursor-pointer`}
                            size={20}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {signinMutation.isPending && (
                    <LoaderCircle className="mr-2 animate-spin" />
                  )}
                  <span> Đăng nhập</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast({
                      title: "Tính năng đang được thử nghiệm",
                    })
                  }
                >
                  <div className="w-52 flex justify-start space-x-4 items-center ">
                    <Image
                      src="/assets/google.png"
                      width={16}
                      height={16}
                      alt="google"
                    />{" "}
                    <span> Đăng nhập bằng Google</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast({
                      title: "Tính năng đang được thử nghiệm",
                    })
                  }
                >
                  <div className="w-52 flex justify-start space-x-4 items-center ">
                    <Image
                      src="/assets/facebook.png"
                      width={16}
                      height={16}
                      alt="google"
                    />{" "}
                    <span>Đăng nhập bằng Facebook</span>
                  </div>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
