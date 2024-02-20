"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import classNames from "classnames";
import Link from "next/link";
import { PlusCircle, ArrowBigUp, Loader, Router } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadCSV } from "../../courses/_components/json-csv";
import moment from "moment";
import { uploadCsv } from "@/service/axios-services/dataFetching";
import { WaitToast } from "@/components/custom/wait-toast";
import Papa from "papaparse";
import toast from "react-hot-toast";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends object, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const tableData: TData[] = data;

  const [disableButton, setDisableButton] = React.useState(false);
  const waitToast = WaitToast();

  const confirmSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    confirmAlert({
      title: "Confirm to upload file",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            Papa.parse(file as any, {
              header: true,
              skipEmptyLines: true,
              complete: async function (results) {
                await uploadCsv(results);
                toast("Uploaded CSV file successfully");
                router.refresh();
              },
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center py-4 justify-start">
          <Input
            placeholder="Filter user..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-black"
          />
        </div>
        <div className=" w-full flex justify-end">
          <Link href="/admin/bde/create">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add BDE
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className=" w-full flex justify-end py-4">
          <input
            type="file"
            id="files"
            className="hidden"
            accept=".csv"
            onChange={confirmSubmit}
          />
          <Button className="bg-cyan-800 hover:bg-cyan-900">
            <ArrowBigUp className="h-4 w-4 mr-2" />
            <label className="cursor-pointer" htmlFor="files">
              Upload Csv
            </label>
          </Button>
        </div>
      </div>

      <div className="rounded-md border hover:bg-[#131313]">
        <Table className="bg-black">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-[#000]" key={headerGroup.id}>
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
                    <TableCell className="bg-black" key={cell.id}>
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
        <Button
          className="bg-black text-white"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          className="bg-black text-white"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
