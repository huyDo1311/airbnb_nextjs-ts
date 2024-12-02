"use client";

import { DotsHorizontalIcon, CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { handleErrorApi } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";
import EditBooking from "@/app/manage/booking/edit-booking";

import { toast } from "@/hooks/use-toast";
import { ListBookingUserBodyType } from "@/schemaValidations/booking.schema";
import {
  useDeleteBookingMutation,
  useDeleteSingleBookingMutation,
  useGetBookingList,
} from "@/queries/useBooking";
import AddBooking from "./add-booking";
import dayjs from "dayjs";
import { useGetUserList } from "@/queries/useUser";
import { useGetRoomList } from "@/queries/useRoom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import UploadExcelForm from "./upload-excel-form";
import { BsArrowUp } from "react-icons/bs";

type ListBookingUser = ListBookingUserBodyType["content"][0];

const BookingTableContext = createContext<{
  setBookingIdEdit: (value: number) => void;
  BookingIdEdit: number | undefined;
  BookingDelete: ListBookingUser | null;
  setBookingDelete: (value: ListBookingUser | null) => void;
  rowSelectionIdArray: number[];
  setRowSelectionIdArray: (value: number[]) => void;
  setIsDialogOpen: (value: boolean) => void;
}>({
  setBookingIdEdit: (value: number | undefined) => {},
  BookingIdEdit: undefined,
  BookingDelete: null,
  setBookingDelete: (value: ListBookingUser | null) => {},
  rowSelectionIdArray: [],
  setRowSelectionIdArray: (value: number[]) => {},
  setIsDialogOpen: () => {},
});

interface RowData {
  original: {
    id: number;
  };
}

// const calculatePrice = (row: any) => {
//   const giaMotNgay = row.room?.giaTien || 0;
//   const ngayDen = dayjs(row.ngayDen, 'DD-MM-YYYY');
//   const ngayDi = dayjs(row.ngayDi, 'DD-MM-YYYY');
//   let soNgay = ngayDi.diff(ngayDen, 'day'); // Tính số ngày thuê
//   let totalPrice = 0;

//   // Kiểm tra ngày trong khoảng từ ngày đi đến ngày đến có phải là cuối tuần hoặc ngày lễ
//   for (let i = 0; i <= soNgay; i++) {
//     const currentDate = ngayDen.add(i, 'day');

//     // Kiểm tra ngày cuối tuần (thứ 7 và chủ nhật)
//     const isWeekend = currentDate.day() === 0 || currentDate.day() === 6; // Chủ nhật (0) hoặc thứ 7 (6)

//     // Kiểm tra ngày lễ (giả sử ngày lễ là 01/01 và 30/04 - bạn có thể thêm nhiều ngày lễ khác)
//     const isHoliday = currentDate.isSame(dayjs('01-01-YYYY', 'DD-MM-YYYY'), 'day') || currentDate.isSame(dayjs('30-04-YYYY', 'DD-MM-YYYY'), 'day');

//     if (isWeekend) {
//       totalPrice += (giaMotNgay * 10) / 100; // Nhân 2 cho cuối tuần
//     } else if (isHoliday) {
//       totalPrice += (giaMotNgay * 20) / 100; // Nhân 3 cho ngày lễ
//     } else {
//       totalPrice += giaMotNgay;
//     }
//   }
//   return totalPrice;
// };

const HeaderCheckbox = ({ table }: { table: any }) => {
  // const [rowSelectionIdArray, setRowSelectionIdArray] = useState<number[]>([]);
  const { rowSelectionIdArray, setRowSelectionIdArray } =
    useContext(BookingTableContext);

  const handleSelectAllChange = (value: boolean) => {
    const newSelection = value
      ? table.getRowModel().rows.map((row: RowData) => row.original.id)
      : [];

    table.toggleAllRowsSelected(!!value);
    setRowSelectionIdArray(newSelection);
  };
  console.log("rowSelectionIdArray:", rowSelectionIdArray);

  return (
    <Checkbox
      checked={table.getIsAllRowsSelected()}
      onCheckedChange={handleSelectAllChange}
      aria-label="Select All"
    />
  );
};

const CellCheckbox = ({ row }: { row: any }) => {
  const { rowSelectionIdArray, setRowSelectionIdArray } =
    useContext(BookingTableContext);
  // const [rowSelectionIdArray, setRowSelectionIdArray] = useState<number[]>([]);
  const handleCheckedChange = (value: boolean) => {
    row.toggleSelected(!!value);

    const updatedSelection = value
      ? [...rowSelectionIdArray, row.original.id]
      : rowSelectionIdArray.filter((id: number) => id !== row.original.id);

    setRowSelectionIdArray(updatedSelection);
    // console.log("🚀 ~ rowSelectionIdArray:", updatedSelection);
    // setRowSelectionIdArray((prevSelection) => {
    //   const updatedSelection = value
    //     ? [...prevSelection, row.original.id]
    //     : prevSelection.filter((id) => id !== row.original.id);

    //   return updatedSelection;
    // });
  };
  console.log("rowSelectionIdArray:", rowSelectionIdArray);

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={handleCheckedChange}
      aria-label={`Select Booking ${row.original.id}`}
    />
  );
};

export const columns: ColumnDef<ListBookingUser>[] = [
  {
    id: "select",
    header: ({ table }) => <HeaderCheckbox table={table} />,
    cell: ({ row }) => <CellCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "hinhAnh",
    header: "Room",
    cell: ({ row }) => {
      const room = row.original.room;
      return (
        <div>
          <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover">
            <AvatarImage src={room?.hinhAnh} />
            <AvatarFallback className="rounded-none">
              {room?.hinhAnh}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "ngayDen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check in
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {dayjs(row.getValue<string>("ngayDen"), "DD-MM-YYYY").format(
          "DD-MM-YYYY"
        )}
      </div>
    ),
  },
  {
    accessorKey: "ngayDi",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check out
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {dayjs(row.getValue<string>("ngayDi"), "DD-MM-YYYY").format(
          "DD-MM-YYYY"
        )}
      </div>
    ),
  },
  {
    accessorKey: "songay",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số ngày thuê
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ngayDen = dayjs(row.getValue<string>("ngayDen"), "DD-MM-YYYY");
      const ngayDi = dayjs(row.getValue<string>("ngayDi"), "DD-MM-YYYY");
      const soNgay = ngayDi.diff(ngayDen, "day"); // Tính số ngày
      return <div className="text-center">{soNgay >= 0 ? soNgay : "N/A"}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const ngayDenA = dayjs(rowA.original.ngayDen, "DD-MM-YYYY");
      const ngayDiA = dayjs(rowA.original.ngayDi, "DD-MM-YYYY");
      const soNgayA = ngayDiA.diff(ngayDenA, "day"); // Số ngày thuê dòng A

      const ngayDenB = dayjs(rowB.original.ngayDen, "DD-MM-YYYY");
      const ngayDiB = dayjs(rowB.original.ngayDi, "DD-MM-YYYY");
      const soNgayB = ngayDiB.diff(ngayDenB, "day"); // Số ngày thuê dòng B

      return soNgayA - soNgayB; // Sắp xếp theo số ngày thuê
    },
  },
  {
    accessorKey: "gia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const giaMotNgay = row.original.room?.giaTien ?? 0;
      const ngayDen = dayjs(row.getValue<string>("ngayDen"), "DD-MM-YYYY");
      const ngayDi = dayjs(row.getValue<string>("ngayDi"), "DD-MM-YYYY");
      const soNgay = ngayDi.diff(ngayDen, "day"); // Tính số ngày thuê
      // Tính giá với các ngày cuối tuần và ngày lễ
      // const gia = calculatePrice(row.original);
      const gia = giaMotNgay * soNgay;

      // Hiển thị thông tin với mũi tên
      let displayPrice = gia.toLocaleString() + " $";
      // displayPrice += <br />;

      return <div>{displayPrice}</div>;
    },
    // sortingFn: (rowA, rowB) => {
    //   const giaA = calculatePrice(rowA.original);
    //   const giaB = calculatePrice(rowB.original);
    //   return giaA - giaB;
    // }
    sortingFn: (rowA, rowB) => {
      // Get the calculated prices for each row
      const giaA =
        (rowA.original.room?.giaTien ?? 0) *
        dayjs(rowA.original.ngayDi).diff(dayjs(rowA.original.ngayDen), "day");
      const giaB =
        (rowB.original.room?.giaTien ?? 0) *
        dayjs(rowB.original.ngayDi).diff(dayjs(rowB.original.ngayDen), "day");

      return giaA - giaB;
    },
  },
  // {
  //   accessorKey: '%',
  //   header: ({ column }) => {
  //     return (
  //       <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
  //         %
  //         <CaretSortIcon className='ml-2 h-4 w-4' />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     const giaMotNgay = row.original.room?.giaTien;
  //     const ngayDen = dayjs(row.getValue<string>('ngayDen'), 'DD-MM-YYYY');
  //     const ngayDi = dayjs(row.getValue<string>('ngayDi'), 'DD-MM-YYYY');
  //     const soNgay = ngayDi.diff(ngayDen, 'day'); // Tính số ngày thuê
  //     // Tính giá với các ngày cuối tuần và ngày lễ
  //     const gia = calculatePrice(row.original);

  //     // Hiển thị thông tin với mũi tên
  //     let displayPrice = gia.toLocaleString() + ' $';
  //     // displayPrice += <br />;
  //     if (soNgay > 0) {
  //       const isWeekend = dayjs(ngayDi).day() === 0 || dayjs(ngayDi).day() === 6;
  //       const isHoliday = dayjs(ngayDi).isSame(dayjs('01-01-YYYY', 'DD-MM-YYYY'), 'day') || dayjs(ngayDi).isSame(dayjs('30-04-YYYY', 'DD-MM-YYYY'), 'day');
  //       if (isWeekend) {
  //         return (
  //           <div className="flex justify-between items-center">
  //             <p className='text-red-500'>10%</p>
  //             <ArrowBigUp className='text-red-500' />
  //           </div>);
  //       } else if (isHoliday) {
  //         return (
  //           <div className="flex justify-between items-center">
  //             <p className='text-red-900'>20%</p>
  //             <ArrowBigUp className='text-red-900' />
  //           </div>);
  //       } else {
  //         return <></>
  //       }
  //     }
  //     // return <div>{displayPrice}<ArrowBigUp/></div>;
  //   },
  //   sortingFn: (rowA, rowB) => {
  //     const giaA = calculatePrice(rowA.original);
  //     const giaB = calculatePrice(rowB.original);
  //     return giaA - giaB;
  //   }
  // },
  // {
  //   accessorKey: '%',
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
  //         %
  //         <CaretSortIcon className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const ngayDen = dayjs(row.getValue<string>('ngayDen'), 'DD-MM-YYYY');
  //     const ngayDi = dayjs(row.getValue<string>('ngayDi'), 'DD-MM-YYYY');
  //     const soNgay = ngayDi.diff(ngayDen, 'day'); // Tính số ngày thuê

  //     // Xác định % tăng giá
  //     let percentage = 0;
  //     const isWeekend = dayjs(ngayDi).day() === 0 || dayjs(ngayDi).day() === 6;
  //     const isHoliday =
  //       dayjs(ngayDi).isSame(dayjs('01-01-YYYY', 'DD-MM-YYYY'), 'day') ||
  //       dayjs(ngayDi).isSame(dayjs('30-04-YYYY', 'DD-MM-YYYY'), 'day');

  //     if (isWeekend) {
  //       percentage = 10; // Ngày cuối tuần tăng 10%
  //     } else if (isHoliday) {
  //       percentage = 20; // Ngày lễ tăng 20%
  //     }

  //     return (
  //       <div className="flex justify-between items-center">
  //         {percentage > 0 ? (
  //           <>
  //             <p className={percentage === 10 ? 'text-red-300' : 'text-red-500'}>{percentage}%</p>
  //             <ArrowBigUp className={percentage === 10 ? 'text-red-300' : 'text-red-00'} />
  //           </>
  //         ) : (
  //           <p>0%</p>
  //         )}
  //       </div>
  //     );
  //   },
  //   sortingFn: (rowA, rowB) => {
  //     // Lấy giá trị % từ hàm tính toán
  //     const calculatePercentage = (row: any) => {
  //       const ngayDi = dayjs(row.ngayDi, 'DD-MM-YYYY');
  //       const isWeekend = dayjs(ngayDi).day() === 0 || dayjs(ngayDi).day() === 6;
  //       const isHoliday =
  //         dayjs(ngayDi).isSame(dayjs('01-01-YYYY', 'DD-MM-YYYY'), 'day') ||
  //         dayjs(ngayDi).isSame(dayjs('30-04-YYYY', 'DD-MM-YYYY'), 'day');
  //       if (isWeekend) return 10;
  //       if (isHoliday) return 20;
  //       return 0;
  //     };

  //     const percentageA = calculatePercentage(rowA.original);
  //     const percentageB = calculatePercentage(rowB.original);

  //     return percentageA - percentageB;
  //   },
  // },

  {
    accessorKey: "soLuongKhach",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số lượng khách
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">
        {row.getValue("soLuongKhach")}
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên khách
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user;
      return <div className="capitalize">{user?.name || "N/A"}</div>;
    },
    filterFn: (row, columnId, value) => {
      const user = row.original.user;
      if (user) {
        // const nameMatch = user.name?.toLowerCase().includes(value.toLowerCase()) ?? false;
        // const phoneMatch = user.phone?.toLowerCase().includes(value.toLowerCase()) ?? false;
        const nameMatch = String(user?.name || "")
          .toLowerCase()
          .includes(value.toLowerCase());
        const emailMatch = String(user?.email || "")
          .toLowerCase()
          .includes(value.toLowerCase());
        // const phoneMatch = String(user.phone || "").toLowerCase().includes(value.toLowerCase());
        return nameMatch || emailMatch;
      }
      return false; // Return false if no user data exists
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setBookingIdEdit, setBookingDelete } =
        useContext(BookingTableContext);
      const openEditBooking = () => {
        setBookingIdEdit(row.original.id);
      };

      const opendeleteBooking = () => {
        setBookingDelete(row.original);
      };
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openEditBooking}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={opendeleteBooking}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function AlertDialogDeleteBooking({
  BookingDelete,
  setBookingDelete,
}: {
  BookingDelete: ListBookingUser | null;
  setBookingDelete: (value: ListBookingUser | null) => void;
}) {
  // console.log("🚀 ~ BookingDelete id:", BookingDelete);

  const { mutateAsync } = useDeleteBookingMutation();

  const deleteBooking = async () => {
    if (BookingDelete) {
      try {
        const result = await mutateAsync(BookingDelete.id);
        setBookingDelete(null);
        toast({
          title: result.message,
        });
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    }
  };

  return (
    <AlertDialog
      open={Boolean(BookingDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setBookingDelete(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Booking{" "}
            <span className="bg text-primary-foreground rounded px-1">
              {BookingDelete?.id}
            </span>{" "}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBooking}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface AlertDialogDeleteAllProps {
  rowSelectionIdArray: number[];
  setRowSelectionIdArray: (value: number[]) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}

const AlertDialogDeleteAllBookings: React.FC<AlertDialogDeleteAllProps> = ({
  rowSelectionIdArray,
  setRowSelectionIdArray,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const { mutateAsync } = useDeleteBookingMutation();

  const deleteBookingAll = async (
    rowSelectionIdArray: number[],
    setRowSelectionIdArray: (value: number[]) => void
  ) => {
    if (rowSelectionIdArray.length === 0) {
      toast({ title: "Please select at least one booking to delete" });
      return;
    }

    try {
      // Loop through selected booking IDs and delete
      await Promise.all(
        rowSelectionIdArray.map(async (id) => {
          await mutateAsync(id);
        })
      );
      toast({ title: "Xoá chọn thành công" });

      // Reset selected rows state
      setRowSelectionIdArray([]);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Bookings?</AlertDialogTitle>
            <AlertDialogDescription>
              Booking{" "}
              <span className="bg text-primary-foreground rounded px-1">
                {rowSelectionIdArray.join(", ")}
              </span>{" "}
              sẽ bị xóa vĩnh viễn
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteBookingAll(rowSelectionIdArray, setRowSelectionIdArray)
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Số lượng item trên 1 trang
const PAGE_SIZE = 10;

export default function BookingTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  const [BookingIdEdit, setBookingIdEdit] = useState<number | undefined>();
  const [BookingDelete, setBookingDelete] = useState<ListBookingUser | null>(
    null
  );

  const bookingListQuery = useGetBookingList();
  const bookingList = bookingListQuery.data?.content ?? [];

  const userListQuery = useGetUserList();
  const userList = userListQuery.data?.content ?? [];

  const roomListQuery = useGetRoomList();
  const roomList = roomListQuery.data?.content ?? [];

  const mergedBookingData = bookingList.map((booking: any) => {
    const user = userList.find((user: any) => user.id === booking.maNguoiDung);
    const room = roomList.find((room: any) => room.id === booking.maPhong);

    return {
      ...booking,
      user: user || null, // Thông tin người dùng hoặc null nếu không tìm thấy
      room: room || null, // Thông tin phòng hoặc null nếu không tìm thấy
    };
  });

  const validBookingData = mergedBookingData.filter(
    (booking: any) => booking.user !== null && booking.room !== null
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE, //default page size
  });

  // const { rowSelectionIdArray, setRowSelectionIdArray } = useContext(BookingTableContext);
  const [rowSelectionIdArray, setRowSelectionIdArray] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const table = useReactTable({
    data: validBookingData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE,
    });
  }, [table, pageIndex]);

  // Custom hook to handle booking deletion

  // const { mutateAsync } = useDeleteBookingMutation();

  // const deleteBookingAll = async (
  //   rowSelectionIdArray: number[],
  //   setRowSelectionIdArray: (value: number[]) => void
  // ) => {
  //   if (rowSelectionIdArray.length === 0) {
  //     toast({ title: 'Please select at least one booking to delete' });
  //     return;
  //   }

  //   try {
  //     // Loop through selected booking IDs and delete
  //     await Promise.all(
  //       rowSelectionIdArray.map(async (id) => {
  //         await mutateAsync(id);
  //       })
  //     );
  //     toast({ title: 'Xoá chọn thành công' });

  //     // Reset selected rows state
  //     setRowSelectionIdArray([]);
  //   } catch (error) {
  //     handleErrorApi({ error });
  //   }
  // };

  return (
    // <BookingTableContext.Provider value={{ BookingIdEdit, setBookingIdEdit, BookingDelete, setBookingDelete}}>
    <BookingTableContext.Provider
      value={{
        setBookingIdEdit,
        BookingIdEdit,
        BookingDelete,
        setBookingDelete,
        rowSelectionIdArray,
        setRowSelectionIdArray,
        setIsDialogOpen,
      }}
    >
      <div className="w-full">
        <EditBooking id={BookingIdEdit} setId={setBookingIdEdit} />
        <AlertDialogDeleteBooking
          BookingDelete={BookingDelete}
          setBookingDelete={setBookingDelete}
        />
        <AlertDialogDeleteAllBookings
          rowSelectionIdArray={rowSelectionIdArray}
          setRowSelectionIdArray={setRowSelectionIdArray}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
        <div className="flex items-center py-4">
          <Input
            placeholder="Lọc theo tên khách"
            value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
            onChange={(e) => {
              const filterValue = e.target.value.trim();
              const col = table.getColumn("user");
              col?.setFilterValue(filterValue);
            }}
            className="max-w-sm"
          />

          <div className="ml-auto flex items-center gap-2">
            {/* <Button
              variant="destructive"
              onClick={() => deleteBookingAll(rowSelectionIdArray, setRowSelectionIdArray)}
              disabled={Object.keys(rowSelection).length === 0}
            >
              Xóa đã chọn
            </Button> */}

            <Button
              className="btn btn-danger"
              onClick={() => setIsDialogOpen(true)}
              disabled={rowSelectionIdArray.length === 0}
            >
              Delete All
            </Button>

            {/* <Label htmlFor="picture">Import</Label> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <UploadExcelForm />

            <AddBooking />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-xs text-muted-foreground py-4 flex-1 ">
            Hiển thị{" "}
            <strong>{table.getPaginationRowModel().rows.length}</strong> trong{" "}
            <strong>{validBookingData.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/manage/booking"
            />
          </div>
        </div>
      </div>
    </BookingTableContext.Provider>
  );
}
