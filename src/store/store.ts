import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ListRoomProps } from "@/app/(public)/(ListRoom)/ListRoom";

// interface Data {
//   id: number;
//   hinhAnh: string;
//   quocGia: string;
//   tenViTri: string;
//   tinhThanh: string;
// }
// interface dataApi {
//   data: Data[];
//   keywords: null;
//   pageIndex: number;
//   pageSize: number;
//   totalRow: number;
// }
// interface destination {
//   content: dataApi;
//   dateTime?: string;
// }
interface CalendarType {
  form: string;
  to: string;
}
interface AppState {
  NextStep: number;
  dataStoreDestination: any;
  dataApiListRoom: any;
  dataCalendar: CalendarType;
  customers: any;
  resultSearch: any;
  setSearch: () => any;
  setDataApiListRoom: (newDAtaApiListRoom: any) => any;
  setNextStep: (newStep: number) => void;
  setDataStoreDestination: (newDestination: any) => void;
  setDataCalendar: (newCalendar: any) => void;
  setCustomers: (newCustomers: any) => void;
}

export const useStore = create<AppState>()(
  devtools((set) => ({
    customers: {},
    resultSearch: {},
    dataStoreDestination: {},
    NextStep: 0,
    dataApiListRoom: {},
    dataCalendar: {
      form: "",
      to: "",
    },
    setNextStep: (newStep: number) => set({ NextStep: newStep }),
    setDataStoreDestination: (newDestination: any) =>
      set({ dataStoreDestination: newDestination }),
    setDataApiListRoom: (newDAtaApiListRoom: any) =>
      set({ dataApiListRoom: newDAtaApiListRoom }),
    setDataCalendar: (newCalendar: any) => set({ dataCalendar: newCalendar }),
    setCustomers: (newCustomers: any) => set({ customers: newCustomers }),
    setSearch: () => {
      set((state) => {
        let cloneDestination = { ...state.dataStoreDestination };
        return { resultSearch: cloneDestination };
      });
    },
  }))
);
