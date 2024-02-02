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
        "flex items-center gap-x-2 text-slate-500 font-[500] pl-6 text-sm transition-all text-left",
        isActive &&
          "text-sky-700 bg-white/20 ",
        isCompleted && "text-white/70 hover:text-white",
        isCompleted && isActive && "bg-[#FFFFFF]/20 "
      )}
    >
      <div className="flex items-center gap-x-2 text-white/70 py-4">
        <Icon
          size={22}
          className={cn(
            "text-white/70  shrink-0",
            isActive && "text-white",
            isCompleted && "text-white"
          )}
        />
        <p className="hover:text-white">{label}</p>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100 border-[#6100FF]",
          isCompleted && "border-emerald-700"
        )}
      />
    </button>
  );
};
