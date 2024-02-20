import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/actions/get-isadmin";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { authOption } from "../../../auth/[...nextauth]/route";
const jwt = require("jsonwebtoken");
export async function POST(
  req: Request,
) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;
    const { firstName,lastName,mobile } = await req.json();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const adminExists= await db.bDE.findFirst({
      where:{ 
        phoneNumber:mobile
      }
    })
   
    if(adminExists){
      return new NextResponse("The admin is already exists",{status:400});
    }
    const admin = await db.bDE.create({
      data: {
        firstName,
        lastName,
        phoneNumber:mobile
      }
    });
    console.log(admin)
    return NextResponse.json(admin);
  } catch (error) {
    console.log("[ADMIN CREATE]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

