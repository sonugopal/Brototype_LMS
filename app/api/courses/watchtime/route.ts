import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

      const body = await req.json();
      const { userid, watchTime } = body;
  
      // check if user already exists
      const existingUser = await db.user.findUnique({
        where: { userid: userid },
      });
  
      if (!existingUser) {
        return NextResponse.json(
          {
            user: null,
            message: "There is no user with the userid in your database",
          },
          { status: 401 },
        );
      }

      const time = await db.user.findFirst({
        where: {userid: userid}
      })
  
      // update the watchtime
      await db.user.update({
        where: { userid: userid },
        data: { watchTime: time?.watchTime + watchTime},
      });
  
      return NextResponse.json(
        {
          message: "The watch time has been updated",
        },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Something went wrong while updating the watchtime",
        },
        { status: 500 },
      );
    }
  };
  