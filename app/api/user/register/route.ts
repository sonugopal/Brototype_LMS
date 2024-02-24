import { db } from "@/lib/db";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

// for creating the user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      phoneNumber,
      firstName,
      lastName,
      email,
      qualification,
      password,
      role,
    } = body;

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
        { status: 409 }
      );
    }

    // changed to argon hashing
    const salt = Buffer.from("this_is_static_salt");
    const hashedPassword = await argon2.hash(password, { salt });
    const bdeUser = await db.student.findUnique({
      where: {
        phoneNumber,
      },
    });
    const newUser = await db.user.create({
      data: {
        phoneNumber,
        firstName,
        lastName,
        email,
        qualification,
        role,
        password: hashedPassword,
        userid: "id" + Math.random().toString(16).slice(2),
        createdById: bdeUser?.createdBy,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    //Delete user from student table added by BDE
    if (bdeUser) {
      const deleteBDEUser = await db.student.delete({
        where: {
          phoneNumber: phoneNumber,
        },
      });
    }
    return NextResponse.json(
      {
        user: rest,
        message: "The user has been created",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        message: "something went wrong while doing this operation",
      },
      { status: 500 }
    );
  }
}
