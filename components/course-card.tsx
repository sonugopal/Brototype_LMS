"use client"

import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { useEffect } from "react";

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
  return (
    <Link href={`/courses/${id}`}>
      <div className="group  overflow-hidden rounded-lg p-3 h-full transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 ">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image onLoad={(e) => setTimeout(() => (e.target as HTMLElement).classList.remove('blur'), 1000)} fill className="object-cover blur transition duration-500" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-black/80 dark:group-hover:text-slate-300 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={PlayCircle} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Lesson" : "Lessons"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700"></p>
          )}
        </div>
      </div>
    </Link>
  );
};
