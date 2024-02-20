"use client";
import { Compass, Layout, List, User, User2 } from "lucide-react";
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
  },
  {
    icon: User2,
    label: "Admin Users",
    href: "/admin/admin_users",
  },
  {
    icon: List,
    label: "New BDE List",
    href: "/admin/bde",
  },
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
