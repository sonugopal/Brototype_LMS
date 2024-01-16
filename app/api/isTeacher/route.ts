import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
) {
  try {
    const userId = "1";
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