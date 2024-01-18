import { db } from "@/lib/db";
import { serialize } from "cookie";
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();



    // check if mobile already exist
    const existingUserByMobile = await db.user.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });

    // checking the password validity
    if (!existingUserByMobile || !existingUserByMobile.password) {
      throw new Error("User or password is undefined");
    }

    if (!existingUserByMobile) {
      return NextResponse.json(
        {
          user: null,
          message: "such a user doesn't exist",
        },
        { status: 409 },
      );
    }

    const passwordMatch = await argon2.verify(
      existingUserByMobile.password,
      body.password,
    );

    const { password, ...userWithouPass } = existingUserByMobile;


    if (passwordMatch && existingUserByMobile) {
      return NextResponse.json({
        message: "This is the user",
        user: userWithouPass
      });
    }
  } catch (error) {
    NextResponse.json(
      {
        user: null,
        message: "something went wrong while doing this operation", 
      },
      { status: 500 },
    );
  }
}
