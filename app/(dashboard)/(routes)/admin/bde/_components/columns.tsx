"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { deleteBDE } from "@/service/axios-services/dataFetching";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const handleDelete = async (id: any) => {
  try {
    await deleteBDE(id);
    toast.success("BDE Deleted");
  } catch (error) {
    console.log("Delete BDE Error:", error);
  }
};
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
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-[#292524] text-white/80 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        // <Button
        //   onClick={() => handleDelete(row.original.id)}
        //   className="bg-red-500 hover:bg-red-700"
        // >
        //   Delete
        // </Button>
        <ConfirmModal onConfirm={() => handleDelete(row.original.id)}>
          <Button size="sm" className="bg-red-500 hover:bg-red-700">
            <Trash className="h-4 w-4 " />
          </Button>
        </ConfirmModal>
      );
    },
  },
];
