'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {  UserUpdateBody, UserUpdateBodyType } from '@/schemaValidations/user.schema'
import { useMemo, useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {useUserProfile} from '@/queries/useUser';

export default function UpdateProfileForm() {
  const [file, setFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Cách 1 fetch 2 lần
  const [userId, setUserId] = useState<number>(0);
  const [handleFetch, setHandleFetch] = useState(false);
  const { data } = useUserProfile(userId, handleFetch);
  const account = data?.content

  const form = useForm<UserUpdateBodyType>({
    resolver: zodResolver(UserUpdateBody),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      birthday: '',
      gender: true,
      role: 'USER',
      avatar: account?.avatar ?? ''
    }
  })

  useEffect(() => {
    const userString = localStorage.getItem('user') ? localStorage.getItem('user') : localStorage.getItem('userProfile');
    if (userString) {
      const user = JSON.parse(userString); // Chuyển chuỗi JSON thành đối tượng
      const id = user?.id;
      setUserId(id); // Lưu id vào state hoặc làm việc với id
      setHandleFetch(true)
    }
  }, []);

  useEffect(() => {
    if(account){
    const { name, email, phone, birthday, gender, role, avatar } = account;
    form.reset({
      name: name ?? '',
      email: email ?? '',
      phone: phone ?? '',
      birthday: birthday ?? '',
      gender: gender ?? '',
      role: role ?? '',
      avatar: avatar ?? ''
    })
  }
  }, [account]);




  // Cách 2 fetch 1 lần
  // const storedUser = localStorage.getItem('userProfile');
  // const userProfile = storedUser ? JSON.parse(storedUser) : null;
  // useEffect(() => {
  //   const { name, email, phone, birthday, gender, role, avatar } = userProfile;
  //   form.reset({
  //     name: name ?? '',
  //     email: email ?? '',
  //     phone: phone ?? '',
  //     birthday: birthday ?? '',
  //     gender: gender ?? '',
  //     role: role ?? '',
  //     avatar: avatar ?? ''
  //   })
  // }, []);

  // const form = useForm<UserUpdateBodyType>({
  //   resolver: zodResolver(UserUpdateBody),
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     birthday: '',
  //     gender: true,
  //     role: 'USER',
  //     avatar: userProfile.avatar ?? ''
  //   }
  // })


  //Nếu dùng react 19 và next 15 thì không cần dùng useMemo chỗ này
  // const inputRef = useRef<HTMLInputElement | null>(null)
  const image = form.watch('avatar')

  const name = form.watch('name')
  const previewAvatar = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
  }, [file])

  const reset = () => {
    form.reset()
    setFile(null)
  }

  return (
    <Form {...form} >
      <form onReset={reset} noValidate className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Avatar Upload */}
              <FormField
                control={form.control}
                name={'avatar'}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-start justify-start">
                      <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover">
                        {(file || image) && (
                          <div>
                            <AvatarImage src={file ? URL.createObjectURL(file) : image} />
                            <AvatarFallback className="rounded-none">{name}</AvatarFallback>
                          </div>
                        )}
                      </Avatar>
                      <input type="file" accept="image/*" className="hidden" ref={avatarInputRef}
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file)
                          }
                        }}
                      />
                      <button
                        className="flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed"
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </FormItem>
                )}

              />

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Tên</Label>
                      <Input id="name" type="text" className="w-full" {...field}
                        onChange={(e) => {
                          field.onChange(e); // Cập nhật giá trị trong form
                          // Bạn có thể thực hiện các logic bổ sung nếu cần
                          console.log("Tên mới:", e.target.value);
                        }}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" className="w-full" {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" type="text" className="w-full" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Birthday Field */}
              {/* <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Ngày sinh</Label>
                      <Input id="birthday" type="text" className="w-full" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'dd-MM-yyyy') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="birthday">Ngày sinh</Label>
                      <Input
                        id="birthday"
                        type="date"
                        className="w-full"
                        placeholder="Chọn ngày"
                        value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                        onChange={(e) => {
                          // Cập nhật giá trị birthday trong form dưới định dạng 'YYYY-MM-DD'
                          field.onChange(e.target.value);
                        }}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Gender Field */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="gender">Giới tính</Label>
                      <select
                        id="gender"
                        {...field}
                        className="w-full p-2"
                        value={field.value ? 'true' : 'false'}
                      >
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                      </select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />



              {/* Role Field */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Vai trò</Label>
                      <select id="role" {...field} className="w-full p-2">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="items-center gap-2 md:ml-auto flex">
                <Button variant="outline" size="sm" type="reset">
                  Hủy
                </Button>
                <Button size="sm" type="submit">
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}