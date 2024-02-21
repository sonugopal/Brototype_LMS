import { db } from "@/lib/db";
import { MobileIcon } from "@radix-ui/react-icons";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { phoneNumber } = body;
  
      // check if the phone number exists
      const existingUser = await db.user.findUnique({
        where: { phoneNumber: phoneNumber },
      });
      if (existingUser) {
        return NextResponse.json(
          {
            userExist:true
          },
          { status: 200 },
        );
      }
      const isBDE= await  db.bDE.findUnique({
        where:{
          phoneNumber:phoneNumber
        }
      })
      return NextResponse.json(
          {
            userExist:false,
            isBDE: isBDE?true:false
          },
          { status: 200 },
        );
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        {
          message: "Something went wrong while doing this operation",
        },
        { status: 500 },
      );
    }
  }