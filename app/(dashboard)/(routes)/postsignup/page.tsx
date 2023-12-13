import { auth, clerkClient } from "@clerk/nextjs";
import { signedInAuthObject } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
// interface userCreateInput {
//   userid: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   role: number;
// }
export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { createdAt, firstName, lastName, phoneNumbers } =
    await clerkClient.users.getUser(userId);

  const phoneNumber = phoneNumbers[0].phoneNumber;
  await db.user.create({
    data: {
      userid: userId,
      firstName: firstName as string,
      lastName: lastName as string,
      phoneNumber,
      role: 0,
    },
  });
  return redirect("/");
}
