"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { formattedDestination2 } from "@/lib/utils2";
import { useStore } from "@/store/store";
import { Hotel } from "lucide-react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormatTime(filterRoomDestination: any) {
  let { resultSearch, dataCalendar } = useStore();
  const params = useSearchParams();
  const newParams = params.get("name");
  const [formatDate, setFormatDate] = useState(null);
  const [formatDate2, setFormatDate2] = useState(null);
  useEffect(() => {
    let fromDate: any = moment(dataCalendar?.from);
    let toDate: any = moment(dataCalendar?.to);
    const formatDate = fromDate?.format("DD/MM");
    const formatDate2 = toDate?.format("DD/MM/YYYY");
    setFormatDate(formatDate);
    setFormatDate2(formatDate2);
  }, [resultSearch, dataCalendar]);
  return (
    <RainbowButton className="cursor-default">
      <div className="md:flex items-center text-white">
        {" "}
        <div className="text-black dark:text-white">
          <span>Có</span>
          <span className="text-red-400 text-lg mx-2">
            {filterRoomDestination?.filterRoomDestination?.length > 0
              ? filterRoomDestination?.filterRoomDestination?.length
              : 0}
          </span>
          <span>chỗ ở tại</span>
          <span className="ms-2 me-1 text-red-400">
            {" "}
            {formattedDestination2(newParams)}
          </span>
        </div>
        <div className="flex items-center text-black dark:text-white">
          <Hotel className="me-2" size={20} color="#f96262" />|{" "}
          <span className="ms-2 w-48 ">
            {formatDate} - {formatDate2}
          </span>
        </div>
      </div>
    </RainbowButton>
  );
}
