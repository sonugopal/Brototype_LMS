import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedCourse = await db.course.update({
      where: {
        id: params.courseId
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}