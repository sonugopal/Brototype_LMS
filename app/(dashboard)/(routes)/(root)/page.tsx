import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "./_components/categories";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Userid } from '@/interfaces/UserInterface'

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}


const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session: Userid | null = await getServerSession(authOption);
  const userId = await session?.user.userid;
  if (!userId) {
    return redirect("/sign-in");
  }

  const courses = await getCourses({ userId, ...searchParams });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="py-6 space-y-4">
        <Categories items={categories} />
        <div className="px-6">
          <CoursesList items={courses} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
