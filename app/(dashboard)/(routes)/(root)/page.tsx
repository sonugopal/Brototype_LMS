import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
const createUserEntry = async (userId: any) => {
  const existingUser = await db.user.findFirst({
    where: {
      userid: userId as string,
    },
  });
  if (!existingUser) {
    const { createdAt, firstName, lastName, phoneNumbers } =
      await clerkClient.users.getUser(userId);

    const phoneNumber = phoneNumbers[0].phoneNumber;
    await db.user.create({
      data: {
        userid: userId,
        firstName: firstName as string,
        lastName: lastName as string,
        phoneNumber,
        role: 0,
      },
    });
  }
};
export default async function Dashboard() {
  const { userId } = auth();
  await createUserEntry(userId);
  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
