"use client";
import roomApiRequest from "@/apiRequests/room";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface dataTypeCustomers {
  Object: string;
  Age: string;
  Quantity: any;
  HandleQuantityPlus: any;
  HandleQuantityMinus: any;
}

export function CustomerPicker() {
  let { setCustomers, setSearch, setDataApiListRoom, dataStoreDestination } =
    useStore();
  let router = useRouter();
  const [quantityOfAdult, setQuantityOfAdult] = useState<number>(1);
  const [quantityOfChildren, setQuantityOfChildren] = useState<number>(0);
  const [quantityOfBabies, setQuantityOfBaby] = useState<number>(0);
  const [quantityOfPets, setQuantityOfPets] = useState<number>(0);

  // useEffect(() => {

  // }, [quantityOfAdult, quantityOfChildren, setCustomers]);
  useEffect(() => {
    roomApiRequest
      .NextClientToServerGetListRoom()
      .then((res) => {
        setDataApiListRoom(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setDataApiListRoom]);
  let dataCustomers: dataTypeCustomers[] = [
    {
      Object: "Người lớn",
      Age: "Từ 13 tuổi trở lên",
      Quantity: quantityOfAdult,
      HandleQuantityPlus: setQuantityOfAdult,
      HandleQuantityMinus: setQuantityOfAdult,
    },
    {
      Object: "Trẻ em",
      Age: "Độ tuổi 2-12 ",
      Quantity: quantityOfChildren,
      HandleQuantityPlus: setQuantityOfChildren,
      HandleQuantityMinus: setQuantityOfChildren,
    },
    {
      Object: "Em bé",
      Age: "Dưới 2 tuổi",
      Quantity: quantityOfBabies,
      HandleQuantityPlus: setQuantityOfBaby,
      HandleQuantityMinus: setQuantityOfBaby,
    },
    {
      Object: "Thú cưng",
      Age: "Bạn sẽ mang theo động vật để phục vụ?",
      Quantity: quantityOfPets,
      HandleQuantityPlus: setQuantityOfPets,
      HandleQuantityMinus: setQuantityOfPets,
    },
  ];
  let handleSearching = () => {
    setCustomers({
      adults: quantityOfAdult,
      children: quantityOfChildren,
      babies: quantityOfBabies,
      pets: quantityOfPets,
    });
    if (dataStoreDestination == 1) {
      router.push("/rooms/ho-chi-minh");
    } else if (dataStoreDestination == 2) {
      router.push("/rooms/can-tho");
    } else if (dataStoreDestination == 3) {
      router.push("/rooms/nha-trang");
    } else if (dataStoreDestination == 4) {
      router.push("/rooms/ha-noi");
    } else if (dataStoreDestination == 5) {
      router.push("/rooms/phu-quoc");
    } else if (dataStoreDestination == 6) {
      router.push("/rooms/da-nang");
    } else if (dataStoreDestination == 7) {
      router.push("/rooms/da-lat");
    } else if (dataStoreDestination == 8) {
      router.push("/rooms/phan-thiet");
    } else {
      router.push("/rooms");
    }

    setSearch();
  };
  let renderCustomer = () => {
    return dataCustomers.map((item, index) => {
      return (
        <div
          key={index}
          className={`${
            index == 3 ? "" : "flex justify-between"
          }  space-y-2 border-b py-5`}
        >
          <div>
            <p className="text-md font-semibold">{item.Object}</p>
            <p
              className={`text-sm ${
                index == 3 ? "font-semibold underline" : "font-normal"
              }  text-gray-500`}
            >
              {item.Age}
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            <div>
              <Button
                onClick={() => {
                  item.HandleQuantityMinus((prev: any) =>
                    prev == 0 ? 0 : prev - 1
                  );
                }}
                variant={`${item.Quantity == 0 ? "secondary" : "ghost"}`}
                className={`rounded-full border-2 h-10 w-10 ${
                  item.Quantity == 0 ? "cursor-not-allowed opacity-30" : ""
                }`}
              >
                <Minus />
              </Button>
            </div>
            <div className="w-10">
              <p className="text-center text-md">
                {item.Quantity == 5 ? "5+" : item.Quantity}
              </p>
            </div>
            <div>
              <Button
                onClick={() => {
                  item.HandleQuantityPlus((prev: any) =>
                    prev == 5 ? 5 : prev + 1
                  );
                }}
                variant={`${item.Quantity == 5 ? "secondary" : "ghost"}`}
                className={`rounded-full border-2 h-10 w-10 ${
                  item.Quantity >= 5 ? "cursor-not-allowed opacity-30" : ""
                }`}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-[280px] h-full flex justify-start text-left"
          >
            <div>
              <p className="font-semibold text-xs">Khách</p>
              <p className="text-gray-300">Thêm khách</p>
            </div>
          </Button>
        </PopoverTrigger>
        <div className="absolute top-0 right-8 h-full">
          <div className="h-full  flex items-center w-full justify-center ">
            <div
              className="p-3  bg-red-500  rounded-3xl h-3/4 w-full flex space-x-3 px-4 cursor-pointer"
              onClick={handleSearching}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2px"
                strokeLinejoin="round"
                className="lucide lucide-search hover:scale-110 transition cursor-pointer text-white  "
              >
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="text-md font-medium text-white">Tìm kiếm</p>
            </div>
          </div>
        </div>
        <PopoverContent className="w-[480px] rounded-3xl" align="end">
          <div className="space-y-8 p-8">{renderCustomer()}</div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
