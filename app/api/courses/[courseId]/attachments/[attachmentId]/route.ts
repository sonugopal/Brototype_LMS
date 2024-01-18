import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

