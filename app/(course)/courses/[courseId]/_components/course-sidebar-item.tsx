"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 dark:text-white/50 dark:hover:bg-[#3F3F3F]/20 font-[500] pl-6 text-sm transition-all text-left",
        isActive &&
          "dark:text-white/80 text-sky-700 bg-sky-300/20 dark:bg-[#3F3F3F]/40 dark:hover:bg-[#3F3F3F]/60 dark:hover:text-white",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20 "
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-white/50 shrink-0",
            isActive && "dark:text-white/80 text-sky-700",
            isCompleted && "text-emerald-700"
          )}
        />
        <p>{label}</p>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100 border-sky-700 dark:border-green-800",
          isCompleted && "border-emerald-700"
        )}
      />
    </button>
  );
};
