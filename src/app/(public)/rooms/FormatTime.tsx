"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useStore } from "@/store/store";
import { Hotel } from "lucide-react";

export default function FormatTime() {
  let { resultSearch, dataCalendar, dataStoreDestination2 } = useStore();
  const [formatDate, setFormatDate] = useState(null);
  const [formatDate2, setFormatDate2] = useState(null);
  const [choO, setChoO] = useState(0);
  useEffect(() => {
    let fromDate: any = moment(dataCalendar?.from);
    let toDate: any = moment(dataCalendar?.to);
    const formatDate = fromDate?.format("DD/MM/YYYY");
    const formatDate2 = toDate?.format("DD/MM/YYYY");
    console.log(formatDate2, "huhuh");
    setFormatDate(formatDate);
    setFormatDate2(formatDate2);
    setChoO(resultSearch.length);
  }, [resultSearch, dataCalendar]);
  return (
    <div className="text-md font-semibold bg-white p-2 px-3 rounded-xl">
      <div className="md:flex items-center text-white">
        {" "}
        <div className="text-black">
          <span>Có</span>
          <span className="text-red-400 text-lg mx-2">{choO}</span>
          <span>chỗ ở tại</span>
          <span className="ms-2 me-1 text-red-400">
            {" "}
            {dataStoreDestination2}
          </span>
        </div>
        <div className="flex items-center text-black">
          <Hotel className="me-2" size={20} color="#f96262" />|{" "}
          <span className="ms-2 w-48">
            {formatDate} - {formatDate2}
          </span>
        </div>
      </div>
    </div>
  );
}
