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
import { isTeacher } from "@/lib/teacher";
import { ModeToggle } from "./ui/toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogIn } from 'lucide-react'
import { signIn, signOut, useSession } from "next-auth/react";



export const NavbarRoutes = () => {

  const {data: session} : any = useSession()

  const userId = session?.user.userid;
  const pathname = usePathname();
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    isTeacher(userId).then((data: any) => {
      setTeacher(data);
    });
  });

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  // const isTeacher = getIsteacher(userId as string);
  return (
    <>
      <div className="hidden md:block">
        <SearchInput />
      </div>
      <div className="flex gap-x-2 items-center ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        ) : teacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Admin mode
            </Button>
          </Link>
        ) : null}
        <ModeToggle />
        {
          session?.user ?
          <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="h-10">
              <AvatarImage
                className="h-10 rounded-full"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>CN</AvatarFallback>

              <DropdownMenuContent>
                <DropdownMenuLabel>{session?.user ? session?.user.firstName : 'Please Login'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => session?.user ? signOut() : signIn()} className="text-red-500">{session?.user ? 'Log-out' : 'Login'}</DropdownMenuItem>
              </DropdownMenuContent>
            </Avatar>
          </DropdownMenuTrigger>
        </DropdownMenu> : <LogIn onClick={() => signIn()} className='h-5 w-4 cursor-pointer mr-2 hover:text-red-400'/>
        }
      </div>
    </>
  );
};
