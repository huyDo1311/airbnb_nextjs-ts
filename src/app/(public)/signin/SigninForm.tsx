"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninBody, SigninBodyType } from '@/schemaValidations/auth.schema'
import authApiRequest from '@/apiRequests/auth'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
// import { useAppContext } from '../../AppProvider/AppProvider';
// import { clientSessionToken } from '@/lib/http'

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

export default function SigninForm() {
  const [loading, setLoading] = useState(false);
  // const { setUser } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();



  // 1. Define your form.
  const form = useForm<SigninBodyType>({
    resolver: zodResolver(SigninBody),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: SigninBodyType) => {
    // console.log(values)
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.NextClientToNextServerSigin(values);
      console.log('result', result);

      toast({
        description: result.status
      })
      // setUser(result.payload.data.account)

      // router.push('/');
      // router.refresh();
    } catch (error: any) {
      console.log('error', error);
      handleErrorApi({
        error,
        setError: form.setError, // Ensure form.setError is defined
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {/* Register Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" noValidate>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Mật khẩu" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" className='!mt-8 w-full'>Đăng nhập</Button>
        </form>
      </Form>
    </div>
  )
}
