"use client";

import {DotsHorizontalIcon, CaretSortIcon} from '@radix-ui/react-icons';
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

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem} from '@/components/ui/dropdown-menu';
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
import { createContext, useContext, useEffect, useState } from "react";
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
import { formatCurrency, handleErrorApi } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";
import EditRoom from "@/app/manage/room/edit-room";
import AddRoom from "@/app/manage/room/add-room";
import { RoomListResType } from "@/schemaValidations/room.schema";
import { useDeleteRoomMutation, useGetRoomList } from "@/queries/useRoom";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { useDeleteBookingMutation } from '@/queries/useBooking';
import {ChevronDown} from 'lucide-react';

type RoomItem = RoomListResType["content"][0];

const RoomTableContext = createContext<{
  setRoomIdEdit: (value: number) => void;
  roomIdEdit: number | undefined;
  roomDelete: RoomItem | null;
  setRoomDelete: (value: RoomItem | null) => void;
  rowSelectionIdArray: number[];
  setRowSelectionIdArray: (value: number[]) => void;
  setIsDialogOpen: (value: boolean) => void;
}>({
  setRoomIdEdit: (value: number | undefined) => { },
  roomIdEdit: undefined,
  roomDelete: null,
  setRoomDelete: (value: RoomItem | null) => { },
  rowSelectionIdArray: [],
  setRowSelectionIdArray: (value: number[]) => { },
  setIsDialogOpen: () => { }
});

interface RowData {
  original: {
    id: number;
  };
}

const HeaderCheckbox = ({ table }: { table: any }) => {
  // const [rowSelectionIdArray, setRowSelectionIdArray] = useState<number[]>([]);
  const { rowSelectionIdArray, setRowSelectionIdArray } = useContext(RoomTableContext);

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
  const { rowSelectionIdArray, setRowSelectionIdArray } = useContext(RoomTableContext);
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


export const columns: ColumnDef<RoomItem>[] = [
  {
    id: 'select',
    header: ({ table }) => <HeaderCheckbox table={table} />,
    cell: ({ row }) => <CellCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "hinhAnh",
    header: "Ảnh",
    cell: ({ row }) => (
      <div>
        <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover">
          <AvatarImage src={row.getValue("hinhAnh")} />
          <AvatarFallback className="rounded-none">
            {row.original.hinhAnh}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "tenPhong",
    header: "Tên",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tenPhong")}</div>
    ),
  },
  {
    accessorKey: "giaTien",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Gía tiền
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {formatCurrency(row.getValue("giaTien"))}
      </div>
    ),
  },
  // {
  //   accessorKey: "banUi",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
  //         Bàn ủi
  //         <CaretSortIcon className='ml-2 h-4 w-4' />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("banUi")}</div>
  //   ),
  // },

  {
    accessorKey: 'wifi',
    header: ({ column }) => (
      <div className="flex flex-col">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Wi-Fi
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        <select
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="mt-1 border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue<boolean>('wifi');
      return <div className="capitalize text-center">{value ? 'Có' : 'Không'}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.getValue(columnId) === (filterValue === 'true');
    },
  },
  {
    accessorKey: 'doXe',
    header: ({ column }) => (
      <div className="flex flex-col">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Đỗ xe
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        <select
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="mt-1 border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue<boolean>('doXe');
      return <div className="capitalize text-center">{value ? 'Có' : 'Không'}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.getValue(columnId) === (filterValue === 'true');
    },
  },
  {
    accessorKey: 'hoBoi',
    header: ({ column }) => (
      <div className="flex flex-col">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Hồ bơi
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        <select
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="mt-1 border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue<boolean>('hoBoi');
      return <div className="capitalize text-center">{value ? 'Có' : 'Không'}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.getValue(columnId) === (filterValue === 'true');
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setRoomIdEdit, setRoomDelete } = useContext(RoomTableContext);
      const openEditRoom = () => {
        setRoomIdEdit(row.original.id);
      };

      const openDeleteDish = () => {
        setRoomDelete(row.original);
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
            <DropdownMenuItem onClick={openEditRoom}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteDish}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];



function AlertDialogDeleteDish({
  roomDelete,
  setRoomDelete,
}: {
  roomDelete: RoomItem | null;
  setRoomDelete: (value: RoomItem | null) => void;
}) {
  // console.log("🚀 ~ roomDelete id:", roomDelete);

  const { mutateAsync } = useDeleteRoomMutation();
  const deleteRoom = async () => {
    if (roomDelete) {
      try {
        const result = await mutateAsync(roomDelete.id);
        setRoomDelete(null);
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
      open={Boolean(roomDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setRoomDelete(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa phòng?</AlertDialogTitle>
          <AlertDialogDescription>
            Phòng{" "}
            <span className="bg text-primary-foreground rounded px-1">
              {roomDelete?.tenPhong}
            </span>{" "}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteRoom}>Continue</AlertDialogAction>
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

  const { mutateAsync } = useDeleteRoomMutation();

  const deleteBookingAll = async (
    rowSelectionIdArray: number[],
    setRowSelectionIdArray: (value: number[]) => void
  ) => {
    if (rowSelectionIdArray.length === 0) {
      toast({ title: 'Please select at least one booking to delete' });
      return;
    }

    try {
      // Loop through selected booking IDs and delete
      await Promise.all(
        rowSelectionIdArray.map(async (id) => {
          await mutateAsync(id);
        })
      );
      toast({ title: 'Xoá chọn thành công' });

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
              Booking <span className='rounded px-1'>{rowSelectionIdArray.join(', ')}</span> sẽ bị xóa
              vĩnh viễn
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteBookingAll(rowSelectionIdArray, setRowSelectionIdArray)}>
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
export default function DishTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  const [roomIdEdit, setRoomIdEdit] = useState<number | undefined>();
  const [roomDelete, setRoomDelete] = useState<RoomItem | null>(null);

  const roomListQuery = useGetRoomList();
  console.log("roomListQuery", roomListQuery);
  const data = roomListQuery.data?.content ?? [];
  console.log("data", data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE, //default page size
  });

  const [rowSelectionIdArray, setRowSelectionIdArray] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const table = useReactTable({
    data,
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

  return (
    <RoomTableContext.Provider
      value={{ roomIdEdit, setRoomIdEdit, roomDelete, setRoomDelete, rowSelectionIdArray, setRowSelectionIdArray, setIsDialogOpen }}
    >
      <div className="w-full">
        <EditRoom id={roomIdEdit} setId={setRoomIdEdit} />
        <AlertDialogDeleteDish
          roomDelete={roomDelete}
          setRoomDelete={setRoomDelete}
        />
        <AlertDialogDeleteAllBookings
          rowSelectionIdArray={rowSelectionIdArray}
          setRowSelectionIdArray={setRowSelectionIdArray}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
        <div className="flex items-center py-4">
          <Input
            placeholder="Lọc tên"
            value={
              (table.getColumn("tenPhong")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("tenPhong")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-auto flex items-center gap-2">
            <Button
              className="btn btn-danger"
              onClick={() => setIsDialogOpen(true)}
              disabled={rowSelectionIdArray.length === 0}
            >
              Delete All
            </Button>
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
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <AddRoom />
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
            <strong>{data.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/manage/room"
            />
          </div>
        </div>
      </div>
    </RoomTableContext.Provider>
  );
}
