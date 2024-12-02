import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define types for the calendar and customers
interface CalendarType {
  from: string;
  to: string;
}

export interface CustomerType {
  adults: number;
  children: number;
  babies: number;
  pets: number;
}

interface AppState {
  NextStep: number;
  total: number;
  dataStoreDestination: any;
  dataStoreDestination2: any;
  dataApiListRoom: any;
  dataCalendar: CalendarType;
  customers: CustomerType;
  customerDetails: any;
  resultSearch: any;
  star: any;
  dataLocation: any;
  loading: boolean;
  setStar: (newStar: any) => void;
  setLoading: (newLoading: boolean) => void;
  setDataLocation: (newLocation: any) => void;
  setSearch: () => void;
  setDataApiListRoom: (newDataApiListRoom: any) => void;
  setNextStep: (newStep: number) => void;
  setDataStoreDestination: (newDestination: any) => void;
  setDataStoreDestination2: (newDestination2: any) => void;
  setDataCalendar: (newCalendar: any) => void;
  setCustomers: (newCustomers: CustomerType) => void;
  setCustomerDetails: (newCustomerDetails: any) => void;
  increment: (category: keyof CustomerType) => void;
  decrement: (category: keyof CustomerType) => void;
}

export const useStore = create<AppState>()(
  devtools((set) => ({
    star: 0,
    loading: false,
    customerDetails: 0,
    dataLocation: "",
    customers: {
      adults: 1,
      children: 0,
      babies: 0,
      pets: 0,
    },
    total: 1,

    resultSearch: [],
    dataStoreDestination: 0,
    dataStoreDestination2: "",
    NextStep: 0,
    dataApiListRoom: [],
    dataCalendar: {
      from: "",
      to: "",
    },
    setLoading: (newLoading: boolean) => set({ loading: newLoading }),
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
        let cloneCustomers2 = state.customers.children;
        let cloneDataStoreDestination = state.dataStoreDestination;
        let resultTotal = cloneCustomers + cloneCustomers2;
        localStorage.setItem("storeTotal", resultTotal.toString());
        if (cloneDataStoreDestination !== 0) {
          let filterListRooms = cloneDataApiListRoom.filter(
            (item) => item.maViTri === cloneDataStoreDestination
          );
          return { resultSearch: filterListRooms };
        }
        let filterListRooms = cloneDataApiListRoom.filter(
          (item) => item.khach >= cloneCustomers + cloneCustomers2
        );
        return { resultSearch: filterListRooms, total: resultTotal };
      });
    },
    setCustomerDetails: (newCustomerDetails: any) =>
      set({ customerDetails: newCustomerDetails }),
    increment: (category: keyof CustomerType) =>
      set((state) => {
        if (category === "pets" && state.customers.pets < 3) {
          return {
            customers: {
              ...state.customers,
              pets: state.customers.pets + 1,
            },
          };
        } else if (category === "babies" && state.customers.babies < 4) {
          return {
            customers: {
              ...state.customers,
              babies: state.customers.babies + 1,
            },
          };
        } else if (
          category == "adults" &&
          state.customers.adults < state.customerDetails &&
          state.total < state.customerDetails
        ) {
          const newTotal =
            state.customers.adults + state.customers.children + 1;
          return {
            customers: {
              ...state.customers,
              [category]: state.customers[category] + 1,
            },
            total: newTotal,
          };
        } else if (
          category == "children" &&
          state.customers.children < state.customerDetails &&
          state.total < state.customerDetails
        ) {
          const newTotal =
            state.customers.adults + state.customers.children + 1;
          return {
            customers: {
              ...state.customers,
              [category]: state.customers[category] + 1,
            },
            total: newTotal,
          };
        }
        return state;
      }),

    decrement: (category: keyof CustomerType) =>
      set((state) => {
        if (category == "adults" && state.customers.adults > 1) {
          let totalCustomer = state.total - 1;
          return {
            total: totalCustomer,
            customers: {
              ...state.customers,
              [category]: state.customers[category] - 1,
            },
          };
        } else if (category == "children" && state.customers.children > 0) {
          let totalCustomer = state.total - 1;
          return {
            total: totalCustomer,
            customers: {
              ...state.customers,
              [category]: state.customers[category] - 1,
            },
          };
        } else if (state.customers[category] > 0) {
          let totalCustomer = state.total - 1;
          return {
            total: totalCustomer,
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
