import { NextResponse } from "next/server";
import { Userid } from "@/interfaces/UserInterface";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOption } from "../../auth/[...nextauth]/route";


export async function DELETE(
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
        id: params.courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session: Userid | null = await getServerSession(authOption);
    const userId = await session?.user.userid;
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}