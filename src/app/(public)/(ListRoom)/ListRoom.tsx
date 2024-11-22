import roomApiRequest from "@/apiRequests/room";
import ListRoomCsr from "@/app/(public)/(ListRoom)/ListRoomCsr";

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
  hinhAnh?: string;
}

export interface ListRoomProps {
  content: typeContent[];
  dateTime: string;
}

// Component that displays the list of rooms
export default async function ListRoom() {
  const data: ListRoomProps =
    await roomApiRequest.NextClientToServerGetListRoom();
  return (
    <div>
      <ListRoomCsr data={data} />
    </div>
  );
}
