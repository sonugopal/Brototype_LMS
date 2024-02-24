"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { updateUserRole } from "@/service/axios-services/dataFetching";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";

const handleAction = async (id: any) => {
  try {
    await updateUserRole(id);
    toast.success("User Role Updated");
    window.location.reload();
  } catch (error) {
    console.log("Update User Role Error:", error);
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-[#292524] text-white/80 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Login
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      var localDate = moment
        .utc(row.original.createdAt)
        .local()
        .format("dddd, MMMM Do YYYY, h:mm:ss a");
      return <span>{localDate}</span>;
    },
  },
  {
    accessorKey: "qualification",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-[#292524] text-white/80 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Qualification
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-[#292524] text-white/80 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "watchTime",
    header: ({ column }) => (
      <Button
        className="hover:bg-[#292524] text-white/80 hover:text-white"
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
      return <span>{`${minutes} minutes (${hours} hours)`}</span>;
    },
  },

  {
    accessorKey: "leadStatus",
    header: ({ column }) => (
      <Button
        className="hover:bg-[#292524] text-white/80 hover:text-white"
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

      if (minutes < Number(process.env.NEXT_PUBLIC_WEAK_LEAD_LIMIT!)) {
        statusColor = process.env.NEXT_PUBLIC_WEAK_LEAD_COLOR!;
        statusText = process.env.NEXT_PUBLIC_WEAK_LEAD_TEXT!;
      } else if (
        minutes >= Number(process.env.NEXT_PUBLIC_WEAK_LEAD_LIMIT!) &&
        minutes < Number(process.env.NEXT_PUBLIC_STRONG_LEAD_LIMIT!)
      ) {
        statusColor = process.env.NEXT_PUBLIC_MEDIUM_LEAD_COLOR!;
        statusText = process.env.NEXT_PUBLIC_MEDIUM_LEAD_TEXT!;
      } else if (
        minutes >= Number(process.env.NEXT_PUBLIC_STRONG_LEAD_LIMIT!)
      ) {
        statusColor = process.env.NEXT_PUBLIC_STRONG_LEAD_COLOR!;
        statusText = process.env.NEXT_PUBLIC_STRONG_LEAD_TEXT!;
      }
      return <span style={{ color: statusColor }}>{statusText}</span>;
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <Button
        className="hover:bg-[#292524] text-white/80 hover:text-white"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created By
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      let data = row.original.createdBy;
      if (data) {
        return <span>{data.firstName + " " + data.lastName}</span>;
      } else {
        return "";
      }
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
        <div>
          {row.original.role != 1 && (
            <ConfirmModal onConfirm={() => handleAction(row.original.id)}>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-700">
                {row.original.role == 0 ? "Make BDE" : "Make Student"}
              </Button>
            </ConfirmModal>
          )}
        </div>
      );
    },
  },
];
