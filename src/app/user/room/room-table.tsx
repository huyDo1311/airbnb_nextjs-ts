'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
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
  useReactTable
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {formatCurrency, handleErrorApi} from '@/lib/utils';
import { useSearchParams } from 'next/navigation'
import AutoPagination from '@/components/auto-pagination'
import EditRoom from '@/app/manage/room/edit-room'
import AddRoom from '@/app/manage/room/add-room'
import {RoomListResType} from '@/schemaValidations/room.schema';
import { useDeleteRoomMutation, useGetRoomList } from '@/queries/useRoom'
import {toast} from '@/hooks/use-toast';

type RoomItem = RoomListResType['content'][0]

const RoomTableContext = createContext<{
  setRoomIdEdit: (value: number) => void
  roomIdEdit: number | undefined
  roomDelete: RoomItem | null
  setRoomDelete: (value: RoomItem | null) => void
}>({
  setRoomIdEdit: (value: number | undefined) => { },
  roomIdEdit: undefined,
  roomDelete: null,
  setRoomDelete: (value: RoomItem | null) => { }
})

export const columns: ColumnDef<RoomItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'hinhAnh',
    header: 'Ảnh',
    cell: ({ row }) => (
      <div>
        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
          <AvatarImage src={row.getValue('hinhAnh')} />
          <AvatarFallback className='rounded-none'>{row.original.hinhAnh}</AvatarFallback>
        </Avatar>
      </div>
    )
  },
  {
    accessorKey: 'tenPhong',
    header: 'Tên',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('tenPhong')}</div>
  },
  {
    accessorKey: 'giaTien',
    header: 'Giá cả',
    cell: ({ row }) => <div className='capitalize'>{formatCurrency(row.getValue('giaTien'))}</div>
  },
  // {
  //   accessorKey: 'moTa',
  //   header: 'Mô tả',
  //   cell: ({ row }) => (
  //     <div dangerouslySetInnerHTML={{ __html: row.getValue('moTa') }} className='whitespace-pre-line' />
  //   )
  // },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setRoomIdEdit, setRoomDelete } = useContext(RoomTableContext)
      const openEditRoom = () => {
        setRoomIdEdit(row.original.id)
      }

      const openDeleteDish = () => {
        setRoomDelete(row.original)
      }
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openEditRoom}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteDish}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

function AlertDialogDeleteDish({
  roomDelete,
  setRoomDelete
}: {
  roomDelete: RoomItem | null
  setRoomDelete: (value: RoomItem | null) => void
}) {
  // console.log("🚀 ~ roomDelete id:", roomDelete);


  const {mutateAsync} = useDeleteRoomMutation();
  const deleteRoom = async () => {
    if(roomDelete) {
      try {
        const result = await mutateAsync(roomDelete.id);
        setRoomDelete(null);
        toast({
          title: result.message
        })
      } catch (error) {
        handleErrorApi({
          error,
        })
      }
    }
  }
  return (
    <AlertDialog
      open={Boolean(roomDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setRoomDelete(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa phòng?</AlertDialogTitle>
          <AlertDialogDescription>
            Phòng <span className='bg text-primary-foreground rounded px-1'>{roomDelete?.tenPhong}</span> sẽ bị xóa
            vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteRoom}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
// Số lượng item trên 1 trang
const PAGE_SIZE = 10
export default function DishTable() {
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1
  const [roomIdEdit, setRoomIdEdit] = useState<number | undefined>()
  const [roomDelete, setRoomDelete] = useState<RoomItem | null>(null)
  
  const roomListQuery = useGetRoomList();
  const data = roomListQuery.data?.content ?? [];

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE //default page size
  })

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
      pagination
    }
  })

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [table, pageIndex])

  return (
    <RoomTableContext.Provider value={{ roomIdEdit, setRoomIdEdit, roomDelete, setRoomDelete }}>
      <div className='w-full'>
        <EditRoom id={roomIdEdit} setId={setRoomIdEdit} />
        <AlertDialogDeleteDish roomDelete={roomDelete} setRoomDelete={setRoomDelete} />
        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc tên'
            value={(table.getColumn('tenPhong')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('tenPhong')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <div className='ml-auto flex items-center gap-2'>
            <AddRoom />
          </div>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='text-xs text-muted-foreground py-4 flex-1 '>
            Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong> trong <strong>{data.length}</strong>{' '}
            kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname='/manage/room'
            />
          </div>
        </div>
      </div>
    </RoomTableContext.Provider>
  )
}
