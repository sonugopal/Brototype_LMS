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
import apiService from "@/service/apiService";

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

  // for pushing the leads to the google sheet
  const handlePushToSheet = async () => {
    const filteredData = data.map(({ firstName, lastName, qualification, email, watchTime, phoneNumber, leadStatus, createdAt }: any) => ({
      name: firstName + " " + lastName,
      email,
      qualification,
      watchTime: (watchTime / 60).toFixed(2) + " mins",
      phoneNumber: "+" + phoneNumber,
      leadStatus,
      createdAt: moment.utc(createdAt).local().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    }));

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    try {
      const request = await apiService.post('/api/courses/google-sheet', { filteredData })
      console.log(request)
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    }
  };

  // for downloading the leads as csv
  const handleDownload = () => {
    const filteredData = data.map(({ firstName, lastName, qualification, email, watchTime, phoneNumber, leadStatus, createdAt }: any) => ({
      Name: firstName + " " + lastName,
      email,
      qualification,
      watchTime: (watchTime / 60).toFixed(2) + " mins",
      phoneNumber: "+" + phoneNumber,
      leadStatus,
      createdAt: moment.utc(createdAt).local().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    }));

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    downloadCSV(filteredData, `userDetails-${dateString}.csv`);
  };

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter user..."
          value={
            (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-black"
        />
        <select
          value={(table.getColumn("leadStatus")?.getFilterValue() as any) ?? ""}
          onChange={(event) =>
            table.getColumn("leadStatus")?.setFilterValue(event.target.value as any)
          }
          className="max-w-sm bg-black border-none focus:outline-none w-24 mx-5"
        >
          <option placeholder="Filter Leads" value="">Leads</option>
          <option value="Cold">Cold</option>
          <option value="Warm">Warm</option>
          <option value="Hot">Hot</option>
        </select>

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
          className="bg-black text-white hover:text-white hover:bg-[#292524]"
          variant="outline"
          size="sm"
          onClick={handleDownload}
        >
          Download
        </Button>
        <Button
          className="bg-black text-white hover:text-white hover:bg-[#292524]"
          variant="outline"
          size="sm"
          onClick={handlePushToSheet}
        >
          Push to Google Sheet
        </Button>
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
