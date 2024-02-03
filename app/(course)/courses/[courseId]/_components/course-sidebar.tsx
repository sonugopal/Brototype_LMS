import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";
import { Button } from "@/components/ui/button";
import { CourseSidebarProgress } from "@/components/course-sidebar-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {

  const session: Userid | null = await getServerSession(authOption)
  const userId = await session?.user?.userid;

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  const Certificate = await db.certificate.findFirst({
    where: {
      courseId: course.id,
      userId
    }
  })

  const HaveQuiz = await db.quizAndOptions.findFirst({
    where: {
      courseId: course.id
    }
  })
  
  return (
    <div className="h-full border-r scrollbar-none flex flex-col overflow-y-auto shadow-sm ">
      <div className="p-8 flex flex-col border-b sticky top-0 bg-black">
        <div className="p-x-6 pb-3">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="flex flex-col">
            <div className="mt-4">
              <CourseSidebarProgress variant="success" value={progressCount} />
            </div>
            {
              HaveQuiz ?
                <div>
                  {progressCount === 100 && Certificate ?
                    <Button className="h-[30px] relative mt-3">Get Certificate</Button>
                    :
                    (progressCount === 100 ?
                      <Link href={`/courses/quizpage/?courseId=${course.id}`}>
                        <Button className="h-[30px] relative mt-3">Take Quiz</Button>
                      </Link>
                      :
                      null)}
                </div> : null
            }
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
