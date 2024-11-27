import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CalendarType {
  from: string;
  to: string;
}
interface AppState {
  NextStep: number;
  dataStoreDestination: any;
  dataStoreDestination2: any;
  dataApiListRoom: any;
  dataCalendar: CalendarType;
  customers: any;
  resultSearch: any;
  star: any;
  dataLocation: any;

  setStar: (newStar: any) => any;
  setDataLocation: (newStar: any) => any;
  setSearch: () => any;
  setDataApiListRoom: (newDAtaApiListRoom: any) => any;
  setNextStep: (newStep: number) => void;
  setDataStoreDestination: (newDestination: any) => void;
  setDataStoreDestination2: (newDestination: any) => void;
  setDataCalendar: (newCalendar: any) => void;
  setCustomers: (newCustomers: any) => void;
}
export const useStore = create<AppState>()(
  devtools((set) => ({
    star: 0,
    dataLocation: "",
    customers: {},
    resultSearch: [],
    dataStoreDestination: 0,
    dataStoreDestination2: "",
    NextStep: 0,
    dataApiListRoom: [],
    dataCalendar: { 
      from: "",
      to: "",
    },
    setDataLocation: (newLocation: number) =>
      set({ dataLocation: newLocation }),
    setNextStep: (newStep: number) => set({ NextStep: newStep }),
    setStar: (newStar: number) => set({ star: newStar }),
    setDataStoreDestination: (newDestination: any) =>
      set({ dataStoreDestination: newDestination }),
    setDataStoreDestination2: (newDestination2: any) =>
      set({ dataStoreDestination2: newDestination2 }),
    setDataApiListRoom: (newDAtaApiListRoom: any) =>
      set({ dataApiListRoom: newDAtaApiListRoom }),
    setDataCalendar: (newCalendar: any) => {
      set((state) => {
        console.log(newCalendar, "cc");
        return {
          dataCalendar: newCalendar,
        };
      });
    },
    setCustomers: (newCustomers: any) => set({ customers: newCustomers }),
    setSearch: () => {
      set((state) => {
        let cloneDataApiListRoom = [...state.dataApiListRoom];
        let cloneCustomers = state.customers.adults;
        let cloneDataStoreDestination = state.dataStoreDestination;
        if (cloneDataStoreDestination != 0) {
          let filterListRooms = cloneDataApiListRoom.filter(
            (item) => item.maViTri == cloneDataStoreDestination
          );
          console.log("sy ne ", filterListRooms);
          return { resultSearch: filterListRooms };
        }
        let filterListRooms = cloneDataApiListRoom.filter(
          (item) => item.khach >= cloneCustomers
        );
        console.log("sy ne 2", filterListRooms);

        return { resultSearch: filterListRooms };
      });
    },
  }))
);
