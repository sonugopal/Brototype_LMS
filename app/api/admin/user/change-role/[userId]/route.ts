import { NextResponse } from "next/server";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOption } from "../../../../auth/[...nextauth]/route";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;
    const isAdmin = session?.user.role == process.env.ADMIN_ROLE;
    if (!userId || !isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await db.user.findUnique({
      where: {
        id: params.userId,
      },
    });
    const newRole =
      user?.role == 0 ? parseInt(process.env.BDE_ROLE as string) : 0;
    const updateUser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        role: newRole,
      },
    });
    return NextResponse.json({ status: true });
  } catch (error) {
    console.log("[USER_CHANGE_ROLE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
