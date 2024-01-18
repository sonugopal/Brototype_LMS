import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from '@/interfaces/UserInterface'

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session: Userid | null = await getServerSession(authOption);

    if (!session?.user || !session?.user.userid ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session?.user.userid,
          courseId: params.courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }
    await db.purchase.create({
      data: {
        id: uuidv4(),
        userId: session?.user?.userid,
        courseId: params.courseId
      }
    }); 

    return NextResponse.json({ url: `${process.env.BASE_URL}/courses/${course.id}?success=1` });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}