"use client";

import { LucideIcon, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { signOut, useSession } from "next-auth/react";

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

  const {data: session} : any = useSession()

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "flex items-center ms-2 me-2 rounded-sm relative top-10 h-[45px] gap-x-2 text-sm text-white/70 font-[500] pl-6 transition-all",
          isActive && "text-white bg-[#6100FF]/50 "
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "text-white",
              isActive && "text-white"
            )}
          />
          <h1 className="">{label}</h1>
        </div>
      </button>
      <div className="flex flex-col col-span-1 absolute bottom-5 items-start justify-start  w-full">
        <div className="ms-7">
          <div className="flex cursor-pointer justify-between relative right-3 items-center w-full h-full my-3">
            <ModeToggle />
            <h1 className="">Theme</h1>
          </div>
          <div onClick={() => session?.user ? signOut() : null} className="flex justify-between cursor-pointer hover:text-red-500 items-center w-full h-full">
            <LogOut className="h-5"/>
            <h1 className="">Logout</h1>
          </div>
        </div>
      </div>
    </>

  )
}