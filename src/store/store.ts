import FavoriteRooms from "@/app/(public)/Dashboard/FavoriteRooms";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define types for the calendar and customers
interface CalendarType {
  from: Date | undefined;
  to: Date | undefined;
}

export interface CustomerType {
  adults: number;
  children: number;
  babies: number;
  pets: number;
}

interface UserProfile {
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

interface AppState {
  hideHeader: boolean;
  NextStep: number;
  total: number;
  dataRented: any;
  dataStoreDestination: any;
  dataStoreDestination2: any;
  dataApiListRoom: any;
  dataCalendar: CalendarType;
  customers: CustomerType;
  customerDetails: any;
  resultSearch: any;
  star: any;
  dataDetail: any;
  getUserData: UserProfile;
  dataLocation: any;
  headerTotal: any;
  fetchDataStore: boolean;
  removeDataHeader: boolean;
  favorite: number[];
  searchingHistory: any;
  setStar: (newStar: any) => void;
  setDataDetail: (newDataDetail: any) => void;
  setDataLocation: (newLocation: any) => void;
  setSearch: (id?: number) => void;
  setDataApiListRoom: (newDataApiListRoom: any) => void;
  setNextStep: (newStep: number) => void;
  setDataStoreDestination: (newDestination: any) => void;
  setDataStoreDestination2: (newDestination2: any) => void;
  setDataCalendar: (newCalendar: any) => void;
  setCustomers: (newCustomers: CustomerType) => void;
  setCustomerDetails: (newCustomerDetails: any) => void;
  increment: (category: keyof CustomerType) => void;
  decrement: (category: keyof CustomerType) => void;
  setFetchDataStore: () => void;
  resetCustomers: () => void;
  resetDataCalendar: () => void;
  setGetUserData: (userData: UserProfile) => void;
  setHeaderTotal: (newHeaderTotal: number) => void;
  setRemoveDataHeader: () => void;
  resetQuickSearch: () => void;
  clearStorageUser: () => void;
  setFavorite: (newFavorite: number) => any;
  setRemoveFavorite: (newRemoveFavorite: number) => any;
  setDataRented: (newDataRented: any) => any;
  setHideHeader: (newHideHeader: any) => any;
  setTotal: (newTotal: any) => any;
  setResetHistory: () => any;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        dataDetail: {},
        hideHeader: false,
        dataRented: [],
        star: 0,
        favorite: [],
        removeDataHeader: false,
        headerTotal: 0,
        fetchDataStore: false,
        customerDetails: 0,
        dataLocation: "",
        customers: {
          adults: 1,
          children: 0,
          babies: 0,
          pets: 0,
        },
        getUserData: {
          avatar: "",
          birthday: "",
          email: "",
          gender: false,
          id: 0,
          name: "",
          password: "",
          phone: "",
          role: "USER",
        },
        total: 1,
        resultSearch: [],
        dataStoreDestination: 0,
        dataStoreDestination2: "",
        NextStep: 0,
        dataApiListRoom: [],
        dataCalendar: {
          from: undefined,
          to: undefined,
        },
        searchingHistory: [],

        setResetHistory: () =>
          set({
            searchingHistory: [],
          }),

        setDataRented: (newDataRented: any) => {
          set({ dataRented: newDataRented });
        },
        setRemoveFavorite: (newRemoveFavorite) => {
          set((state) => {
            let cloneFavorite: number[] = [...state.favorite];
            let filterFavorite = cloneFavorite.filter(
              (item) => item != newRemoveFavorite
            );
            return {
              favorite: filterFavorite,
            };
          });
        },
        setFavorite: (newFavorite: number): any =>
          set((state): any => {
            let cloneFavorite: number[] = [...state.favorite];
            let filterFavorite = cloneFavorite.filter(
              (item) => item === newFavorite
            );
            if (filterFavorite.length === 0) {
              cloneFavorite.push(newFavorite);
              return {
                favorite: cloneFavorite,
              };
            }

            return { favorite: cloneFavorite };
          }),
        setDataLocation: (newLocation) => set({ dataLocation: newLocation }),
        setNextStep: (newStep) => set({ NextStep: newStep }),
        setStar: (newStar) => set({ star: newStar }),
        setDataStoreDestination: (newDestination) =>
          set({ dataStoreDestination: newDestination }),
        setDataStoreDestination2: (newDestination2) =>
          set({ dataStoreDestination2: newDestination2 }),
        setDataApiListRoom: (newDataApiListRoom) => {
          set({ dataApiListRoom: newDataApiListRoom });
        },
        setDataDetail: (newDataDetail) => set({ dataDetail: newDataDetail }),
        setDataCalendar: (newCalendar) => set({ dataCalendar: newCalendar }),

        setCustomers: (newCustomers) => set({ customers: newCustomers }),

        setTotal: (newTotal) =>
          set({
            total: newTotal,
          }),

        setSearch: () => {
          set((state) => {
            let cloneCalendar = { ...state.dataCalendar };
            let cloneDataStoreDestination = state.dataStoreDestination;
            let cloneDataStoreDestination2 = state.dataStoreDestination2;
            let cloneCustomers = { ...state.customers };
            let dataHistory = {
              calendar: cloneCalendar,
              destination: cloneDataStoreDestination,
              destination2: cloneDataStoreDestination2,
              customers: cloneCustomers,
              totalOfCustomers: state.total,
            };
            let cloneDataApiListRooms = [...state.dataApiListRoom];
            let filterRooms = cloneDataApiListRooms.filter(
              (item) => item.khach >= state.total
            );

            let cloneSearchingHistory = [...state.searchingHistory];

            let checkResultSearch = cloneSearchingHistory.filter(
              (item) =>
                item.destination === cloneDataStoreDestination &&
                item.totalOfCustomers === state.total &&
                item.calendar.from === cloneCalendar.from &&
                item.calendar.to === cloneCalendar.to
            );
            if (checkResultSearch.length === 0) {
              cloneSearchingHistory.push(dataHistory);
            }

            return {
              searchingHistory: cloneSearchingHistory,
              resultSearch: filterRooms,
              total: state.total,
            };
          });
          // set((state) => {
          //   let cloneDataApiListRooms = [...state.dataApiListRoom];
          //   let filterRooms = cloneDataApiListRooms.filter(
          //     (item) => item.khach >= state.total
          //   );
          //   let cloneResultSearch = [...state.resultSearch];
          //   let checkResultSearch = cloneResultSearch.filter(
          //     (item) => item.id === id
          //   );

          //   if (checkResultSearch.length === 0) {

          //   }
          // });
        },
        setCustomerDetails: (newCustomerDetails: any) =>
          set({ customerDetails: newCustomerDetails }),
        increment: (category: keyof CustomerType) =>
          set((state) => {
            if (category === "pets" && state.customers.pets < 5) {
              return {
                customers: {
                  ...state.customers,
                  pets: state.customers.pets + 1,
                },
              };
            } else if (category === "babies" && state.customers.babies < 5) {
              return {
                customers: {
                  ...state.customers,
                  babies: state.customers.babies + 1,
                },
              };
            } else if (category == "adults") {
              const newTotal =
                state.customers.adults + state.customers.children + 1;
              return {
                customers: {
                  ...state.customers,
                  [category]: state.customers[category] + 1,
                },
                total: newTotal,
              };
            } else if (category == "children") {
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
            } else if (category != "adults" && state.customers[category] > 0) {
              return {
                customers: {
                  ...state.customers,
                  [category]: state.customers[category] - 1,
                },
              };
            }
            return state;
          }),
        resetCustomers: () =>
          set({
            customers: {
              adults: 1,
              children: 0,
              babies: 0,
              pets: 0,
            },
            total: 1,
          }),
        resetDataCalendar: () => {
          set({
            dataCalendar: {
              from: undefined,
              to: undefined,
            },
          });
        },
        resetQuickSearch: () => {
          set({
            dataCalendar: {
              from: undefined,
              to: undefined,
            },
            dataStoreDestination2: "",
            dataStoreDestination: "",
            customers: {
              adults: 1,
              children: 0,
              babies: 0,
              pets: 0,
            },
            total: 0,
          });
        },
        setHideHeader: (newHideHeader) => {
          set({ hideHeader: newHideHeader });
        },
        clearStorageUser: () => {
          set((state) => {
            // Reset the user data to its default value (empty object or some default)
            let defaultData = { ...state.getUserData }; // Adjust this to your default user data structure
            return { getUserData: defaultData }; // Reset user data
          });

          // Remove persisted storage
          localStorage.removeItem("app-state"); // Remove app-state from localStorage
        },
        setHeaderTotal: (newHeaderTotal) =>
          set({ headerTotal: newHeaderTotal }),
        setFetchDataStore: () =>
          set((state) => ({ fetchDataStore: !state.fetchDataStore })),
        setGetUserData: (userData: UserProfile) =>
          set({ getUserData: userData }),
        setRemoveDataHeader: () => {
          set((state) => ({
            removeDataHeader: !state.removeDataHeader,
          }));
        },
      }),

      {
        name: "app-state", // Name for the persisted state
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) =>
                ![
                  "customers",
                  "headerTotal",
                  "dataStoreDestination",
                  "dataStoreDestination2",
                  "NextStep",
                  "hideHeader",
                  "removeDataHeader",
                ].includes(key)
            )
          ),
        version: 1,
      }
    )
  )
);
