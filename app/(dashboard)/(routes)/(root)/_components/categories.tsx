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
    <div className="sticky py-1 top-20 z-50 bg-black w-full">
      <div className="flex  items-center relative top-2 md:top-0 gap-x-2 overflow-x-auto pb-2 scrollbar-none mx-9">
        <span className=" text-white/80 bg-[#282828] rounded-md">
          <CategoryItem
            label={"All"}
            value={"All"}
          />
        </span>
        {items?.map((item) => (
          <span key={item.id} className=" text-white/80 bg-[#282828] rounded-md">
            <CategoryItem
              key={item.id}
              label={item.name}
              icon={iconMap[item.name]}
              value={item.id}
            />
          </span>
        ))}
      </div>
    </div>
  )
}