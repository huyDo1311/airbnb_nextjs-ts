import { CustomerPicker } from "@/app/(public)/(QuickSearch)/CustomerPicker";
import { DatePickerWithRange } from "@/app/(public)/(QuickSearch)/DatePickerWithRange";
import { PickDestination } from "@/app/(public)/(QuickSearch)/PickDestination";

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

export default function QuickSearch() {
  return (
    <div className="flex justify-center">
      <div
        className={`flex justify-center rounded-s-full rounded-e-full border shadow-md overflow-hidden  w-[850px]
     
     h-[69px]`}
      >
        <PickDestination />
        <DatePickerWithRange />
        <CustomerPicker />
      </div>
    </div>
  );
}
