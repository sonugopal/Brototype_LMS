import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";

export async function POST(
  req: Request,
) {
  try {

    const session: Userid | null = await getServerSession(authOption)
    const userId = await session?.user?.userid;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isTeacher = await db.user.findFirst({
      where: {
          userid: userId,
          role:1
      }
    });
    return NextResponse.json(isTeacher!==null);
  } catch (error) {
    console.log("[ISTEACHER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}