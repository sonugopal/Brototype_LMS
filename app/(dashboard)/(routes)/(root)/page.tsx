import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { categories, card_items as courses } from "@/components/dummy/card-items";
const createUserEntry = async (userId: any) => {
  // const existingUser = await db.user.findFirst({
  //   where: {
  //     userid: userId as string,
  //   },
  // });
  // if (!existingUser) {
  //   const { createdAt, firstName, lastName, phoneNumbers } =
  //     await clerkClient.users.getUser(userId);

  //   const phoneNumber = phoneNumbers[0].phoneNumber;
  //   await db.user.create({
  //     data: {
  //       userid: userId,
  //       firstName: firstName as string,
  //       lastName: lastName as string,
  //       phoneNumber,
  //       role: 0,
  //     },
  //   });
  // }
};
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  // commented out the createuser entry as i am not fetching these data from the db instead using dummy data
  // await createUserEntry(userId);
  // const categories = await db.category.findMany({
  //   orderBy: {
  //     name: "asc",
  //   },
  // });

  // const courses = await getCourses({
  //   userId,
  //   ...searchParams,
  // });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
