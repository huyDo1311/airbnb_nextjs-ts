"use client";

import { typeContent } from "@/app/(public)/(ListRoom)/ListRoom";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "@/store/store";
import { ChevronDown, Minus, Plus } from "lucide-react";

import { useEffect, useState } from "react";
interface dataTypeCustomers {
  Object: string;
  Age: string;
  Quantity: any;
  HandleQuantityPlus: any;
  HandleQuantityMinus: any;
}
interface DataDetail {
  dataDetail: typeContent;
}

export function CustomerPickerDetails({ dataDetail }: DataDetail) {
  let { customers, setCustomers } = useStore();

  console.log("customer", customers);
  const [quantityOfAdult, setQuantityOfAdult] = useState<number>(1);
  const [quantityOfChildren, setQuantityOfChildren] = useState<number>(0);
  const [quantityOfBabies, setQuantityOfBaby] = useState<number>(0);
  const [quantityOfPets, setQuantityOfPets] = useState<number>(0);
  const [totalCustomer, setTotalCustomer] = useState<number>(0);
  useEffect(() => {
    if (totalCustomer) {
      console.log("vo roi a");
      setCustomers({
        adults: quantityOfAdult,
        children: quantityOfChildren,
        babies: quantityOfBabies,
        pets: quantityOfPets,
      });
    } else {
      console.log("khong vo rooi");
    }
  }, [quantityOfAdult, quantityOfChildren, setCustomers]);

  useEffect(() => {
    let total = customers.adults + customers.children;
    console.log("total", total);
    setTotalCustomer(total);
  }, [quantityOfAdult, quantityOfChildren]);
  // useEffect(() => {
  //   roomApiRequest
  //     .NextClientToServerGetListRoom()
  //     .then((res) => {
  //       setDataApiListRoom(res.content);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [setDataApiListRoom]);
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
                {(() => {
                  if (item.Object === "Người lớn") {
                    return customers.adults;
                  } else if (item.Object === "Trẻ em") {
                    return customers.children;
                  } else if (item.Object === "Em bé") {
                    return customers.babies;
                  } else {
                    return customers.pets;
                  }
                })()}
              </p>
            </div>
            <div>
              <Button
                onClick={() => {
                  item.HandleQuantityPlus((prev: any) =>
                    prev == 15 ? 15 : prev + 1
                  );
                }}
                variant={`${item.Quantity == 15 ? "secondary" : "ghost"}`}
                className={`rounded-full border-2 h-10 w-10 ${
                  item.Quantity >= 15 ? "cursor-not-allowed opacity-30" : ""
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
    <div className="relative border rounded-lg border-black">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full  h-full flex justify-between text-left group "
          >
            {customers?.adults ? (
              <div>
                <p className="font-semibold text-xs">Khách</p>
                <p className="text-gray-400 font-light">
                  {totalCustomer > 1 ? totalCustomer : customers.adults}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-xs">Khách</p>
                <p className="text-gray-400 font-light">
                  {" "}
                  {totalCustomer ? totalCustomer : "khách"}
                </p>
              </div>
            )}
            <div className="group-focus:rotate-180 transition duration-500">
              <ChevronDown />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[450px] rounded-3xl" align="end">
          <div className="space-y-5 p-5">{renderCustomer()}</div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
