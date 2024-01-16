import { db } from "@/lib/db";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

// for creating the user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, firstName, lastName, password, role } = body;

    console.log("This is the firstName,", firstName)

    // check if phone number already exist
    const existingUserByMobile = await db.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });

    if (existingUserByMobile) {
      return NextResponse.json(
        {
          user: null,
          message: "An User with this mobile already exists",
        },
        { status: 409 },
      );
    }

    // changed to argon hashing
    console.log("its being called from the register page")
    const salt = Buffer.from("this_is_static_salt");
    const hashedPassword = await argon2.hash(password, { salt });

    const newUser = await db.user.create({
      data: {
        phoneNumber,
        firstName,
        userid: "id" + Math.random().toString(16).slice(2),
        lastName,
        role,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "The user has been created",
      },
      { status: 201 },
    );
  } catch (error) {
    NextResponse.json(
      {
        message: "something went wrong while doing this operation",
      },
      { status: 500 },
    );
  }
}
