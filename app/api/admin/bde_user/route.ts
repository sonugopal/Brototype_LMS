import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/actions/get-isadmin";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
const jwt = require("jsonwebtoken");
export async function POST(req: Request) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.id;
    const { firstName, lastName, phoneNumber } = await req.json();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userExists = await db.student.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (userExists) {
      return new NextResponse("The user is already exists", { status: 400 });
    }
    const student = await db.student.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        createdBy: userId,
      },
    });
    return NextResponse.json(student);
  } catch (error) {
    console.log("[ADMIN CREATE]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
