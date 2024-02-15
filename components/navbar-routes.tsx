"use client";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { isAdmin } from "@/lib/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ContactUsForm } from "./contactus-navbar";

export const NavbarRoutes = () => {
  const { data: session }: any = useSession();

  const userId = session?.user.userid;
  const pathname = usePathname();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    isAdmin(userId).then((data: any) => {
      setAdmin(data);
    });
  });

  const isAdminPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  return (
    <div
      className={`${
        isAdminPage ? "flex w-full" : "5xl:mx-[28rem] flex w-full"
      }`}
    >
      <div className="hidden md:block ">
        <SearchInput />
      </div>
      <div className="flex gap-x-2 items-center  ml-auto">
        {isAdminPage || isCoursePage ? (
          <Link href="/">
            <Button className="relative right-8" size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        ) : admin ? (
          <Link href="/admin/courses">
            <Button
              className="text-white/80 relative right-8 hover:bg-none border-1 "
              size="sm"
              variant="ghost"
            >
              Admin mode
            </Button>
          </Link>
        ) : null}
        <ContactUsForm />
        {session?.user ? (
          <div className="relative right-7">
            <Avatar className="h-10">
              <AvatarImage
                className="h-10 rounded-full"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <LogIn
            onClick={() => signIn()}
            className="h-5 w-4 cursor-pointer mr-2 hover:text-red-400"
          />
        )}
      </div>
    </div>
  );
};
