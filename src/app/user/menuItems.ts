import {
  Home,
  LineChart,
  Users2,
  LayoutList,
  NotebookPen,
  MapPinned,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    Icon: Home,
    href: "/",
  },
  {
    title: "Booking",
    Icon: NotebookPen,
    href: "/user/booking",
  },
  {
    title: "Phòng",
    Icon: LayoutList,
    href: "/user/room",
  },
];

export default menuItems;
