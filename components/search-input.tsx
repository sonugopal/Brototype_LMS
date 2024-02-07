"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname])

  return (
    <>
      {
        !pathname.includes('/dashboard') && !pathname.includes('/admin') ?
          <div className="relative mx-2 md:mx-0 flex lg:ml-5">
            <Input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="lg:min-w-[400px] w-full text-white md:w-[250px] 5xl:w-[900px] relative bg-black pl-5 rounded-md  dark:focus:border-[#6100FF]/80"
              placeholder="Search for a course"
            />
            <Search
              className="h-4 w-4 absolute right-0 items-center m-3 text-white/80"
            />
          </div>: null
      }
    </>
  )
}