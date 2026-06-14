"use client";

import { Select, SelectItem } from "@heroui/select";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import BlogItem from "./BlogItem";

import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import {
  IBaseResponse,
  IPaginatedResponse,
  SortByEnum,
} from "@/lib/types/base";
import { IBlog } from "@/lib/types/blog";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { sortOptions } from "@/lib/config/sort";

export default function BlogsList() {
  const [selected, setSelected] = useState<SortByEnum>(SortByEnum.NEWEST);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [blogsRoutes.getAll(), selected],
      queryFn: ({ pageParam = 1 }) =>
        getData<IBaseResponse<IPaginatedResponse<IBlog>>>(
          blogsRoutes.getAll({
            page: pageParam,
            limit: 6,
            asc: selected === SortByEnum.NEWEST ? false : true,
            sort: "createdAt",
          }),
        ),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPageParam < Number(allPages[0]?.data?.totalPages)) {
          return lastPageParam + 1;
        }

        return undefined;
      },
    });

  // console.log("data",data)

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="relative  dark:bg-dark bg-white lg:pb-24  md:pb-20 sm:pt-10 sm:pb-16 pb-12">
      <div className="container flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="dark:text-white font-medium sm:text-2xl text-xl  text-dark">
              لیست مقالات
            </span>
          </div>
          <div className="w-60">
            <Select
              fullWidth
              aria-label="fdsf"
              classNames={{
                trigger: "dark:bg-gray-darker bg-white dark:text-white",
                innerWrapper: "text-white",
                listboxWrapper: "dark:bg-gray-darker dark:text-white",
                base: "border-1 rounded-lg",
              }}
              defaultSelectedKeys={[SortByEnum.NEWEST]}
              dir="rtl"
              selectedKeys={[selected]}
              onChange={(e) => {
                if (e.target.value) {
                  setSelected(e?.target.value as SortByEnum);
                }
              }}
            >
              {sortOptions.map((animal) => (
                <SelectItem key={animal.key} dir="rtl">
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {data?.pages
            ?.flatMap((page) => page?.data?.result)
            ?.map((item) => <BlogItem key={item?.id} item={item as IBlog} />)}
        </div>
        <CustomWhen condition={hasNextPage}>
          <div ref={loadMoreRef} className="w-full h-20" />
        </CustomWhen>
      </div>
      <div className="absolute bottom-0 left-0 lg:h-80 h-40 bg-gradient-to-t from-primary via-primary/30 z-0 to-transparent w-full" />
    </section>
  );
}
