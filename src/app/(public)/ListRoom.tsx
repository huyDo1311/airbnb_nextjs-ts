import http from "@/lib/http";
import Image from "next/image";
import React from "react";
interface typeContent {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}
interface Location {
  id: string;
  name: string;
}

const vietnamLocations: Location[] = [
  { id: "HN", name: "Hanoi, VietNam" },
  { id: "HCMC", name: "Ho Chi Minh City, VietNam" },
  { id: "DN", name: "Da Nang, VietNam" },
  { id: "HP", name: "Hai Phong, VietNam" },
  { id: "CT", name: "Can Tho, VietNam" },
  { id: "HUE", name: "Hue, VietNam" },
  { id: "NT", name: "Nha Trang, VietNam" },
  { id: "HL", name: "Ha Long, VietNam" },
  { id: "VT", name: "Vung Tau, VietNam" },
  { id: "QN", name: "Qui Nhon, VietNam" },
  { id: "BH", name: "Bien Hoa, VietNam" },
  { id: "DL", name: "Da Lat, VietNam" },
  { id: "HPH", name: "Hoi An, VietNam" },
  { id: "HG", name: "Ha Giang, VietNam" },
  { id: "SP", name: "Sa Pa, VietNam" },
  { id: "PT", name: "Phan Thiet, VietNam" },
  { id: "CR", name: "Ca Mau, VietNam" },
  { id: "LG", name: "Long Xuyen, VietNam" },
  { id: "PL", name: "Pleiku, VietNam" },
  { id: "TH", name: "Thai Nguyen, VietNam" },
  { id: "VL", name: "Vinh Long, VietNam" },
  { id: "TB", name: "Thai Binh, VietNam" },
  { id: "BG", name: "Bac Giang, VietNam" },
  { id: "RG", name: "Rach Gia, VietNam" },
  { id: "TG", name: "Tra Vinh, VietNam" },
];

// Define the props type for ListRoom component
interface ListRoomProps {
  content: typeContent[];
  dateTime: string;
}
export const revalidate = 500;

// Component that displays the list of rooms
export default async function ListRoom() {
  const data: ListRoomProps = await http.get("/api/phong-thue");
  console.log("data", data);
  let renderRooms = () => {
    return data.content.map((item, index) => {
      return item.hinhAnh ? (
        <div key={item.id} className="relative">
          <div className="h-[300px]">
            <Image
              className="h-full object-left object-cover rounded-xl"
              src={item.hinhAnh}
              width={1000}
              height={1000}
              alt="ks"
            />
          </div>
          <div className="flex justify-between py-3">
            <p className="text-sm font-bold">{vietnamLocations[index]?.name}</p>
            <i className="fa fa-star text-sm"></i>
          </div>
          {item.tenPhong}
          <button className="absolute top-2 right-2">
            <i
              className="fa fa-heart text-gray-500  hover:scale-150 text-lg duration-300       text-transparent 
      bg-clip-text 
      [-webkit-text-stroke:1px_white]
      hover:text-red-500 
      hover:[-webkit-text-stroke:0px]
      transition-all"
            ></i>
          </button>
        </div>
      ) : (
        ""
      );
    });
  };

  return (
    <main>
      <h1>List of Rooms</h1>
      <div className="grid grid-cols-4 gap-5">{renderRooms()}</div>
    </main>
  );
}
