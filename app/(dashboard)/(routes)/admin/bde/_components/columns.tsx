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
    accessorKey: "name",
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
];
