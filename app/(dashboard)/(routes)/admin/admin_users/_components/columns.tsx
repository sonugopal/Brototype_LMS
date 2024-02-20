"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-[#292524] text-white/80 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>{`${row.original.firstName} ${row.original.lastName}`}</span>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-[#292524] text-white/80 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mobile Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-[#292524] text-white/80 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("role");

      return (
        <Badge className={cn("bg-slate-500", status == 1 && "bg-sky-700")}>
          {status == 1 ? "Super Admin" : "BDE"}
        </Badge>
      );
    },
  },
];
