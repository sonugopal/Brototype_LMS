import { NextResponse } from "next/server";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOption } from "../../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { bdeId: string } }
) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log(params);
    const deletedBDE = await db.bDE.delete({
      where: {
        id: params.bdeId,
      },
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    console.log("[BDE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
