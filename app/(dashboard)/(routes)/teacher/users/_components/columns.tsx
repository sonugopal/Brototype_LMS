"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
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
    accessorKey: "watchTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Watch Time
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const watchTime = row.original.watchTime;
      const minutes = Math.floor(watchTime / 60);
      const hours = Math.floor(watchTime / 3600);
      return (
        <span>{`${minutes} minutes (${hours} hours)`}</span>
      );
    },
  },

  {
    accessorKey: "leadStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lead Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const watchTime = row.original.watchTime;
      const minutes = Math.floor(watchTime / 60);
      let statusColor = "";
      let statusText = "";

      if (minutes < 10) {
        statusColor = process.env.NEXT_PUBLIC_WEAK_LEAD_COLOR!
        statusText = process.env.NEXT_PUBLIC_WEAK_LEAD_TEXT!
      } else if (minutes >= 10 && minutes < 20) {
        statusColor = process.env.NEXT_PUBLIC_MEDIUM_LEAD_COLOR!
        statusText = process.env.NEXT_PUBLIC_MEDIUM_LEAD_TEXT!;
      } else if (minutes >= 20) {
        statusColor = process.env.NEXT_PUBLIC_STRONG_LEAD_COLOR!;
        statusText = process.env.NEXT_PUBLIC_STRONG_LEAD_TEXT!;
      }
      return (
        <span style={{ color: statusColor }}>{statusText}</span>
      );
    },
  }


];
