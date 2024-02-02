import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CourseSidebar } from "./_components/course-sidebar";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from "@/interfaces/UserInterface";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";


const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {

  const session: Userid | null = await getServerSession(authOption)

  const userId = await session?.user?.userid;

  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <ThemeProvider attribute='class' defaultTheme="system">
      <div className="h-full relative">
        <div className="h-[50px] flex right-10 justify-end items-center fixed inset-y-0 w-full z-50">
          <Link href={'/'}>
            <div className="hover:bg-[#292524] rounded-md p-1 flex items-center justify-center cursor-pointer">
              <ArrowBigLeft />
              <h1>Back to Course</h1>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar
            course={course}
            progressCount={progressCount}
          />
        </div>
        <main className="md:pl-80 pt-[50px] h-full">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default CourseLayout