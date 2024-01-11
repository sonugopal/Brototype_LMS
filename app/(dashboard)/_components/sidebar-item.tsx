"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 dark:text-white/50 text-sm font-[500] pl-6 transition-all hover:bg-sky-300/30 dark:hover:bg-[#3F3F3F]/20",
        isActive && "dark:text-white/80 text-sky-500 bg-sky-300/20 dark:bg-[#3F3F3F]/40 dark:hover:bg-[#3F3F3F]/60 dark:hover:text-white"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "dark:text-white/70 ",
            isActive && "dark:text-white/90 text-sky-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 dark:border-green-800 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}