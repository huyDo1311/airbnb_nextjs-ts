import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {toast} from '../../../../nextjs/client/src/hooks/use-toast';
import {UseFormSetError} from 'react-hook-form';
// import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

// export const decodeJWT = <Payload = any>(token: string) => {
//   return jwt.decode(token) as Payload

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  // console.log(error.payload);
  error?.payload?.errors?.forEach((item:any) => {
    setError?.(item.field, {
      type: 'server',
      message: item.message,
    });
  });

  // Handle generic errors
  if (!error?.payload?.errors) {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000,
    });
  }

  // if (error instanceof EntityError && setError) {
  //   error.payload.errors.forEach((item) => {
  //     console.log(item);
  //     setError(item.field, {
  //       type: 'server',
  //       message: item.message
  //     })
  //   })
  // } else {
  //   toast({
  //     title: 'Lỗi',
  //     description: error?.payload?.message ?? 'Lỗi không xác định',
  //     variant: 'destructive',
  //     duration: duration ?? 5000
  //   })
  // }
}

const isBrowser = typeof window !== 'undefined';
export const getTokenCybersoftFromLocalStorage = () => (isBrowser ? localStorage.getItem('tokenCybersoft') : null);