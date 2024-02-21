import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";
import { Navbar } from "@/app/(dashboard)/_components/navbar";

const CoursesPage = async () => {
  const session: Userid | null = await getServerSession(authOption);

  const userId = session?.user.userid;
  const isAdmin = session?.user.role == process.env.ADMIN_ROLE;

  if (!userId || !isAdmin) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 relative top-[-90px]">
      <Navbar />
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
