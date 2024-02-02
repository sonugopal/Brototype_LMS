"use client"

import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { CourseProgress } from "@/components/course-progress";
import { useSession } from "next-auth/react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {

  const { data: session } = useSession()

  return (
    <Link href={session?.user ? `/courses/${id}` : '/sign-in'}>
      <div className="group  overflow-hidden rounded-lg p-3 h-full transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 ">
        <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
          <Image onLoad={(e) => setTimeout(() => (e.target as HTMLElement).classList.remove('blur'), 1000)} fill className="object-cover rounded-b-none blur transition duration-500" alt={title} src={imageUrl} />
        </div>
        {
          progress !== 100 ?
            <CourseProgress value={progress!} /> : null
        }
        <div className="flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 rounded-b-md bg-[#42526C] text-white w-full p-2  ">
            <IconBadge size="sm" icon={PlayCircle} />
            <span>
              {chaptersLength} {chaptersLength === 1 ? "Lesson" : "Lessons"}
            </span>
          </div>
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium text-white/80 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
        </div>
      </div>
    </Link>
  );
};
