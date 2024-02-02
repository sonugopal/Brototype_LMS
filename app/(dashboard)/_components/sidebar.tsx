import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

import Link from "next/link";
export const Sidebar = () => {
  return (
    <div className="h-full text-white relative md:w-full md:bg-[#101010] flex flex-col overflow-y-auto shadow-sm ">
      <div className="items-center justify-center p-6 mt-4">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col mt-5 w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
