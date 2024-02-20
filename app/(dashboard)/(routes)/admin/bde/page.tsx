import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";
import { Navbar } from "@/app/(dashboard)/_components/navbar";

const UsersPage = async () => {
  const session: Userid | null = await getServerSession(authOption);

  const userId = await session?.user.userid;

  if (!userId) {
    return redirect("/");
  }

  const users = await db.bDE.findMany({
    select: {
      name: true,
      phoneNumber: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6 relative top-[-90px]">
      <Navbar />
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersPage;
