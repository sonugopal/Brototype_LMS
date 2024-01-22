import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { phoneNumber } = body;
  
      // check if the phone number exists
      const existingUser = await db.user.findUnique({
        where: { phoneNumber: phoneNumber },
      });
  
  
      if (!existingUser) {
        return NextResponse.json(
          {
            message: "There is no user with this given number",
          },
          { status: 200 },
        );
      }
  
  
      return NextResponse.json(
        {
          message: "there is already a user with the given number",
        },
        { status: 404 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Something went wrong while doing this operation",
        },
        { status: 500 },
      );
    }
  }