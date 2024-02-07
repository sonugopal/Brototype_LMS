import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/actions/get-isadmin";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
export async function POST(
  req: Request,
) {
  try {
    
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;
    const { title } = await req.json();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}