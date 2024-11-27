import roomApiRequest from "@/apiRequests/room";
import ListRoomCsr from "@/app/(public)/(ListRoom)/ListRoomCsr";
import { destination } from "@/app/(public)/(QuickSearch)/QuickSearch";
import http from "@/lib/http";

export interface typeContent {
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
  hinhAnh?: string;
}

export interface ListRoomProps {
  content: typeContent[];
  dateTime: string;
}

export default async function ListRoom() {
  const data: ListRoomProps =
    await roomApiRequest.NextClientToServerGetListRoom();
  const data2: any = await http.get(
    "/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8"
  );
  return (
    <div>
      <ListRoomCsr data={data} data2={data2} />
    </div>
  );
}
