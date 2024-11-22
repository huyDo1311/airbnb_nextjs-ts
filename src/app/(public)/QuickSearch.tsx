import { CustomerPicker } from "@/components/ui/CustomerPicker";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { PickDestination } from "@/components/ui/PickDestination";
import http from "@/lib/http";

interface Data {
  id: number;
  hinhAnh: string;
  quocGia: string;
  tenViTri: string;
  tinhThanh: string;
}
interface dataApi {
  data: Data[];
  keywords: null;
  pageIndex: number;
  pageSize: number;
  totalRow: number;
}
export interface destination {
  content: dataApi;
  dateTime?: string;
}

export default async function QuickSearch() {
  const data: destination = await http.get(
    "/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8"
  );
  console.log("data", data);
  return (
    <div
      className={`flex rounded-s-full rounded-e-full border shadow-md overflow-hidden   
     
      h-16`}
    >
      <PickDestination pickDataDestination={data} />
      <DatePickerWithRange />
      <CustomerPicker />
    </div>
  );
}
