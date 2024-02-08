"use client";

import { BarChart, Compass, Layout, List, User } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Courses",
    href: "/",
  },
  {
    icon: Compass,
    label: "My Learning",
    href: "/dashboard",
  },
];

const adminRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: User,
    label: "Users",
    href: "/admin/users",
  }
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isAdmin = pathname?.includes("/admin");

  const routes = isAdmin ? adminRoutes : guestRoutes;

  return (
    <div className="flex text-white flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
