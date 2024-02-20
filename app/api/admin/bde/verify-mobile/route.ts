import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/actions/get-isadmin";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { authOption } from "../../../auth/[...nextauth]/route";

export async function POST(
  req: Request,
) {
  try {
    const {mobile} = await req.json();
    const bde= await db.bDE.findFirst({
      where:{
        phoneNumber:mobile
      }
    })
     return NextResponse.json(bde);
  } catch (error) {
    console.log("[ADMIN CREATE]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

