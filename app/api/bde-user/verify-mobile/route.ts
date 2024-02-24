import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();
    const user = await db.student.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("VERIFY_BDE_USER_ERROR]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
