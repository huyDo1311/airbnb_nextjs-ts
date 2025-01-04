export interface Location {
  star: number;
}

export interface Booking {
  id: number; // Booking ID
  maNguoiDung: number; // User ID (maNguoiDung)
  maPhong: number; // Room ID (maPhong)
  ngayDen: string; // Check-in date (ISO 8601 string format)
  ngayDi: string; // Check-out date (ISO 8601 string format)
  soLuongKhach: number; // Number of guests (soLuongKhach)
}
export interface responseBooking {
  content: Booking[];
}

export interface typeContent {
  id: number | null;
  tenPhong?: string;
  loving?: boolean;
  khach?: number;
  phongNgu?: number;
  giuong?: number;
  phongTam?: number;
  moTa?: string;
  giaTien: number;
  mayGiat?: boolean;
  banLa?: boolean;
  tivi?: boolean;
  dieuHoa?: boolean;
  wifi?: boolean;
  bep?: boolean;
  doXe?: boolean;
  hoBoi?: boolean;
  banUi?: boolean;
  maViTri?: number;
  hinhAnh?: string;
  ngayDi?: string;
  ngayDen?: string;
}

export interface ListRoomProps {
  content: typeContent[];
  dateTime: string;
}

// userProfile
export interface UserProfile {
  avatar: string;
  birthday: string;
  gender: boolean; // Gender, typically `true` for male and `false` for female, or you can use `enum` for more clarity
  email: string;
  id: number; // Unique identifier for the user
  name: string; // User's name
  password: string; // User's password (empty string if not set)
  phone: string;
  role: "USER" | "ADMIN";
}
