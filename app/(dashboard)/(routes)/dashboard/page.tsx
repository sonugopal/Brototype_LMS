import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { card_items } from '@/components/dummy/card-items'

import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // const { completedCourses, coursesInProgress } = await getDashboardCourses(
  //   userId
  // );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={card_items.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={card_items.length}
          variant="success"
        />
      </div>
      {/* there will be an error on the items because it is expecting the image url as a string but here i have passed a static image making it give the error */}
      {/* temporary as we will be fetching the image from cloudinary or firebase and the refernce we will get will be a string */}
      <CoursesList items={[...card_items]} />
    </div>
  );
}