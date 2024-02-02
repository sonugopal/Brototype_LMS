import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { db } from "@/lib/db";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from '@/interfaces/UserInterface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Dashboard() {
  const session: Userid | null = await getServerSession(authOption)
  const userId = await session?.user.userid

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress }: any = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1  gap-4">
        <Tabs defaultValue="Enrolled" className="w-full">
          <TabsList>
            <TabsTrigger value="Enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="In-Progress">In Progress</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent className="h-full w-full" value="Enrolled">
            <CoursesList items={[...coursesInProgress, ...completedCourses]} />
          </TabsContent>
          <TabsContent value="In-Progress">
            <CoursesList items={[...coursesInProgress]} />
          </TabsContent>
          <TabsContent value="Completed">
            <CoursesList items={[...completedCourses]} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}