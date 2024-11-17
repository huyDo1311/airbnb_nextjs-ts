import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/hooks/use-toast";
import { UseFormSetError } from "react-hook-form";
// import {RoomStatus, OrderStatus, TableStatus} from '../../../../NextJs-Super-Template-main/src/constants/type';
// import envConfig from '../../';
// import {format} from 'date-fns';
// import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

// export const decodeJWT = <Payload = any>(token: string) => {
//   return jwt.decode(token) as Payload

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  // console.log(error.payload);
  error?.payload?.errors?.forEach((item: any) => {
    setError?.(item.field, {
      type: "server",
      message: item.message,
    });
  });

  // Handle generic errors
  if (!error?.payload?.errors) {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
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
};

const isBrowser = typeof window !== "undefined";
export const getTokenCybersoftFromLocalStorage = () =>
  isBrowser ? localStorage.getItem("tokenCybersoft") : null;

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

// export const getVietnameseRoomStatus = (status: (typeof RoomStatus)[keyof typeof RoomStatus]) => {
//   switch (status) {
//     case RoomStatus.Available:
//       return 'Có sẵn'
//     case RoomStatus.Unavailable:
//       return 'Không có sẵn'
//     default:
//       return 'Ẩn'
//   }
// }

// export const getVietnameseOrderStatus = (status: (typeof OrderStatus)[keyof typeof OrderStatus]) => {
//   switch (status) {
//     case OrderStatus.Delivered:
//       return 'Đã phục vụ'
//     case OrderStatus.Paid:
//       return 'Đã thanh toán'
//     case OrderStatus.Pending:
//       return 'Chờ xử lý'
//     case OrderStatus.Processing:
//       return 'Đang nấu'
//     default:
//       return 'Từ chối'
//   }
// }

// export const getVietnameseTableStatus = (status: (typeof TableStatus)[keyof typeof TableStatus]) => {
//   switch (status) {
//     case TableStatus.Available:
//       return 'Có sẵn'
//     case TableStatus.Reserved:
//       return 'Đã đặt'
//     default:
//       return 'Ẩn'
//   }
// }

// export const getTableLink = ({ token, tableNumber }: { token: string; tableNumber: number }) => {
//   return envConfig.NEXT_PUBLIC_URL + '/tables/' + tableNumber + '?token=' + token
// }
