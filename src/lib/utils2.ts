import { Location } from "@/lib/helper.type";
import { format, isValid } from "date-fns";
import { vi } from "date-fns/locale";
// star
export const vietnamLocations: Location[] = [
  { star: 4.3 },
  { star: 4.8 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.3 },
  { star: 4.8 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.2 },
  { star: 3.6 },
  { star: 3.5 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 4.2 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 5.0 },
  { star: 4.5 },
  { star: 2.5 },
  { star: 4.5 },
];
export const formatStar = (star: number) => {
  return star ? star.toFixed(1).replace(".", ",") : star;
};

// handle usd to vietnamese
export let handleMoney = (money: number): string => {
  let currency = money * 25;
  let formattedCurrency =
    new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(currency) + " đ"; // Adding the "đ" symbol at the end
  return formattedCurrency.replace(",", ".");
};

// format money
export let formatMoney = (money: number): string | undefined => {
  let formattedCurrency =
    new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(money) + " đ"; // Adding the "đ" symbol at the end
  return formattedCurrency.replace(",", ".");
};

// handle money

// convert vietnameseCalendar
export const formatDateToVietnamese = (date: any) => {
  return format(date, "eeee, dd MMMM yyyy", { locale: vi });
};

export let formatVietNamDate = (date: any) => {
  let formatDateString = new Date(date);
  if (isValid(formatDateString)) {
    let VietnamDate = format(formatDateString, "eeee, dd MMMM yyyy", {
      locale: vi,
    });
    return VietnamDate;
  } else {
    return `loi hien thi`;
  }
};

export const vietnameseDate = formatDateToVietnamese(new Date());

// handle favorite
