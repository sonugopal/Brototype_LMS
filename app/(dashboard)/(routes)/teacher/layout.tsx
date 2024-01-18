//import { isTeacher } from "@/lib/teacher";
import { isTeacher } from "@/actions/get-isteacher";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {

  const session: Userid | null = await getServerSession(authOption)

  const userId = await session?.user.userid;

  if (!isTeacher(userId)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
