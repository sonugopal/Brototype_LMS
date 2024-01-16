
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";
// interface userCreateInput {
//   userid: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   role: number;
// }

export default async function PostSignup() {

  const session: Userid | null = await getServerSession(authOption)

  const userId = session?.user.userid
  if (!userId) {
    return redirect("/");
  }

  const existingUser = await db.user.findFirst({
    where: {
      userid: userId as string,
    },
  });
  return redirect("/");
}
