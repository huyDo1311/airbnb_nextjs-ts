"use client";
import { BirthdayPicker } from "@/app/(public)/auth/BirthdayPicker";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useUpdateMutation2 } from "@/queries/useUser";
import {
  UserUpdateBody2,
  UserUpdateBodyType2,
} from "@/schemaValidations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

interface ChangeInfomationProps {
  setOpenChangeInfo: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ChangeInfomation({
  setOpenChangeInfo,
}: ChangeInfomationProps) {
  const updateMutation = useUpdateMutation2();
  const form = useForm<UserUpdateBodyType2>({
    resolver: zodResolver(UserUpdateBody2),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: null,
    },
  });
  const onSubmit = async (data: UserUpdateBodyType2) => {
    if (updateMutation.isPending) return;
    try {
      let User = localStorage.getItem("user");
      if (User) {
        let idUser = JSON.parse(User)?.id;
        const result = await updateMutation.mutateAsync({
          id: idUser,
          ...data,
        });
        // localStorage.setItem("user", JSON.stringify(user));
        if (result.statusCode == 400) {
          toast({
            variant: "destructive",
            description: (
              <p className="flex text-lg font-normal items-center">
                {" "}
                <CircleAlert className="me-2" />
                {result.content}
              </p>
            ),
          });
        } else {
          toast({
            description: `Thay đổi thông tin thành công`,
          });
          setOpenChangeInfo(false);
        }
        // window.location.href = "/manage/dashboard";
      }
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
          noValidate
          onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.warn("loi", err);
          })}
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2 w-full ">
                    <Label htmlFor="name">Họ và Tên</Label>
                    <Input
                      className="w-full"
                      id="name"
                      type="text"
                      placeholder="Nguyễn Văn A"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="phone">Số điện thoại</Label>
                    </div>
                    <Input id="phone" type="number" required {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="md:flex justify-start md:space-x-5 grid grid-cols-1 gap-4">
              <div className="md:w-1/2 w-full">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <Label htmlFor="gender">Giới tính</Label>

                        <Select
                          required
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          } // Convert string "true"/"false" to boolean
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                          <SelectContent side="top">
                            <SelectGroup>
                              <SelectItem value="true">Nam</SelectItem>
                              <SelectItem value="false">Nữ</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:w-1/2 w-full">
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2 ">
                        <Label htmlFor="birthday">Sinh nhật</Label>

                        <BirthdayPicker field={field} />

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="">
              Cập nhật
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
