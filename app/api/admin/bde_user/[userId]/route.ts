import { NextResponse } from "next/server";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOption } from "../../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedUser = await db.student.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    console.log("[BDE_USER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
