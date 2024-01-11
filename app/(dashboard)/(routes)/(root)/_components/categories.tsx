"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 scrollbar-none mx-7">
      {items?.map((item) => (
        <span className="dark:hover:bg-[#53E59B]/10 hover:bg-[#46A9F5]/10 rounded-full">
          <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
        </span>
      ))}
    </div>
  )
}