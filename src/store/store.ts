import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define types for the calendar and customers
interface CalendarType {
  from: string;
  to: string;
}

export interface CustomerType {
  id?: string;
  adults: number;
  children: number;
  babies: number;
  pets: number;
}

interface AppState {
  NextStep: number;
  dataStoreDestination: any;
  dataStoreDestination2: any;
  dataApiListRoom: any;
  dataCalendar: CalendarType;
  customers: CustomerType;
  resultSearch: any;
  star: any;
  dataLocation: any;

  setStar: (newStar: any) => void;
  setDataLocation: (newLocation: any) => void;
  setSearch: () => void;
  setDataApiListRoom: (newDataApiListRoom: any) => void;
  setNextStep: (newStep: number) => void;
  setDataStoreDestination: (newDestination: any) => void;
  setDataStoreDestination2: (newDestination2: any) => void;
  setDataCalendar: (newCalendar: any) => void;
  setCustomers: (newCustomers: CustomerType) => void;
  increment: (category: any) => void; // Use any to restrict categories
  decrement: (category: any) => void; // Use any to restrict categories
}

export const useStore = create<AppState>()(
  devtools((set) => ({
    star: 0,
    dataLocation: "",
    customers: {
      id: "",
      adults: 1,
      children: 0,
      babies: 0,
      pets: 0,
    },
    resultSearch: [],
    dataStoreDestination: 0,
    dataStoreDestination2: "",
    NextStep: 0,
    dataApiListRoom: [],
    dataCalendar: {
      from: "",
      to: "",
    },
    setDataLocation: (newLocation) => set({ dataLocation: newLocation }),
    setNextStep: (newStep) => set({ NextStep: newStep }),
    setStar: (newStar) => set({ star: newStar }),
    setDataStoreDestination: (newDestination) =>
      set({ dataStoreDestination: newDestination }),
    setDataStoreDestination2: (newDestination2) =>
      set({ dataStoreDestination2: newDestination2 }),
    setDataApiListRoom: (newDataApiListRoom) =>
      set({ dataApiListRoom: newDataApiListRoom }),
    setDataCalendar: (newCalendar) => set({ dataCalendar: newCalendar }),
    setCustomers: (newCustomers) => set({ customers: newCustomers }),
    setSearch: () => {
      set((state) => {
        let cloneDataApiListRoom = [...state.dataApiListRoom];
        let cloneCustomers = state.customers.adults;
        let cloneDataStoreDestination = state.dataStoreDestination;
        if (cloneDataStoreDestination !== 0) {
          let filterListRooms = cloneDataApiListRoom.filter(
            (item) => item.maViTri === cloneDataStoreDestination
          );
          return { resultSearch: filterListRooms };
        }
        let filterListRooms = cloneDataApiListRoom.filter(
          (item) => item.khach >= cloneCustomers
        );
        return { resultSearch: filterListRooms };
      });
    },
    increment: (category: any) =>
      set((state: any) => {
        if (category == "pets" && state.customers.pets < 3) {
          return {
            customers: {
              ...state.customers,
              pets: state.customers.pets + 1,
            },
          };
        } else if (category != "pets" && state.customers[category] < 5) {
          return {
            customers: {
              ...state.customers,
              [category]: state.customers[category] + 1,
            },
          };
        }
        return state;
      }),
    decrement: (category: any) =>
      set((state: any) => {
        if (state.customers[category] > 0) {
          return {
            customers: {
              ...state.customers,
              [category]: state.customers[category] - 1,
            },
          };
        }
        return state;
      }),
  }))
);
