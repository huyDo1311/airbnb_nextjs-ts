import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/hooks/use-toast";
import { UseFormSetError } from "react-hook-form";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@/types/jwt.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload;
};
export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  error?.payload?.errors?.forEach((item: any) => {
    setError?.(item.field, {
      type: "server",
      message: item.message,
    });
  });

  if (!error?.payload?.errors) {
    console.log("err", error.payload);
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

const isBrowser = typeof window !== "undefined";

//user
export const getUserFromLocalStorage = () => {
  return isBrowser ? JSON.parse(localStorage.getItem("user") || "null") : null;
};

export const setUserToLocalStorage = (value: object) => {
  isBrowser && localStorage.setItem("user", JSON.stringify(value));
};

export const removeUserFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("user");
};

//userToken
export const getUserTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("userToken") : null;
};

export const setUserTokenToLocalStorage = (value: string) => {
  isBrowser && localStorage.setItem("userToken", value);
};

export const removeUserTokenFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("userToken");
};

//userProfile
export const getUserProfileFromLocalStorage = () => {
  return isBrowser
    ? JSON.parse(localStorage.getItem("userProfile") || "null")
    : null;
};

export const setUserProfileToLocalStorage = (value: object) => {
  isBrowser && localStorage.setItem("userProfile", JSON.stringify(value));
};

export const removeUserProfileFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("userProfile");
};
