import { auth, clerkClient } from "@clerk/nextjs";
import { signedInAuthObject } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
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
      firstname: firstName,
      lastname: lastName,
      phone: phoneNumber,
      role: 0,
    },
  });
  return redirect("/");
}
