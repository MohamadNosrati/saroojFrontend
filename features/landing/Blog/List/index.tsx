"use client";

import { Select, SelectItem } from "@heroui/select";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

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

import BlogItem from "./BlogItem";

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function BlogsList() {
  const t = useTranslations("Blogs");
  const locale = useLocale();
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

  const condition = locale === "fa" ? "title" : "titleEn";

  return (
    <motion.section
      className="relative dark:bg-dark bg-white lg:pb-32 md:pb-24 sm:pb-20 pb-16 overflow-hidden border-t border-black/[0.03] dark:border-white/[0.03]"
      initial="hidden"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.15 }}
      whileInView="visible"
    >
      <div className="container flex flex-col gap-8 px-4 relative z-10">
        {/* HEADER ACTIONS ROW (Title & Dropdown) */}
        <motion.div
          className="flex sm:flex-row flex-col sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-6"
          variants={itemVariants}
        >
          <div className="flex flex-col gap-1.5 max-sm:items-center">
            <h2 className="dark:text-white font-black sm:text-3xl text-xl text-gray-900 tracking-tight">
              {t("lastTitle")}
            </h2>
            <span className="w-12 h-[2.5px] bg-primary rounded-full" />
          </div>

          {/* ARCHITECTURAL SELECT COMPONENT */}
          <div className="w-full sm:w-60">
            <Select
              fullWidth
              aria-label="مرتب‌سازی مقالات"
              classNames={{
                trigger:
                  "bg-white dark:bg-gray-darker/50 backdrop-blur-md text-gray-800 dark:text-white border border-black/10 dark:border-white/10 rounded-xl shadow-sm hover:border-primary/40 transition-all duration-200 h-11",
                innerWrapper: "text-gray-800 dark:text-white font-bold text-sm",
                listboxWrapper:
                  "dark:bg-gray-darker bg-white dark:text-white rounded-xl shadow-xl border border-black/5 dark:border-white/5",
                base: "!font-yekan",
              }}
              defaultSelectedKeys={[SortByEnum.NEWEST]}
              selectedKeys={[selected]}
              onChange={(e) => {
                if (e.target.value) {
                  setSelected(e.target.value as SortByEnum);
                }
              }}
            >
              {sortOptions.map((option) => (
                <SelectItem
                  key={option.key}
                  className="font-bold text-sm hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
                >
                  {option[locale === "fa" ? "label" : "labelEn"]}
                </SelectItem>
              ))}
            </Select>
          </div>
        </motion.div>

        {/* SUBORDINATE ARTICLE GRID */}
        <motion.div
          className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-2"
          variants={itemVariants}
        >
          {data?.pages
            ?.flatMap((page) => page?.data?.result)
            ?.filter((item) => item && item[condition])
            ?.map((item) => (
              <BlogItem
                key={item?.id}
                item={item as IBlog}
                itemVariants={itemVariants}
              />
            ))}
        </motion.div>

        {/* INFINITE SCROLL SYSTEM ELEMENT */}
        <CustomWhen condition={hasNextPage}>
          <div
            ref={loadMoreRef}
            className="w-full h-24 flex items-center justify-center"
          />
        </CustomWhen>
      </div>

      {/* AMBIENT FLOOR GLOW (Muted down to a sophisticated breathe animation) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        className="absolute bottom-0 left-0 lg:h-96 h-48 bg-gradient-to-t from-primary/[0.07] via-primary/[0.01] to-transparent w-full pointer-events-none z-0 origin-bottom"
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.section>
  );
}
