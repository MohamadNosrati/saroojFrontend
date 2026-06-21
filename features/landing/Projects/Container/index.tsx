"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";

import ProjectItem from "../../ProjectItem";

import Filtering from "./Filtering";

import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { IProject } from "@/lib/types/project";
import { getData } from "@/lib/services/data";
import {
  IBaseResponse,
  IPaginatedResponse,
  SortByEnum,
} from "@/lib/types/base";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { useGetCategories } from "@/lib/hooks/categories";
import ProjectSclton from "@/components/ui/ProjectScleton";

const containerVariants = {
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

const Container = () => {
  const [selected, setSelected] = useState<SortByEnum>(SortByEnum.NEWEST);
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategories();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [ProjectsRoute.getAll(), selected],
      queryFn: ({ pageParam = 1 }) =>
        getData<IBaseResponse<IPaginatedResponse<IProject>>>(
          ProjectsRoute.getAll({
            page: pageParam,
            limit: 9,
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

  const filteredProjects = useMemo(() => {
    return data?.pages
      ?.flatMap((page) => page?.data?.result)
      ?.filter((elem) =>
        groupSelected?.includes(elem?.categoryId?.id as string),
      );
  }, [groupSelected, data]);

  return (
    <motion.section
      className="lg:pb-28 sm:pb-20 pb-14 dark:bg-dark bg-gray-50/50 overflow-hidden lg:mt-16 mt-8"
      initial="hidden"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.15 }}
      whileInView="visible"
    >
      {/* TITLE & HEADER BAR */}
      <div className="container flex max-lg:flex-col gap-6 items-center justify-between px-4">
        <motion.div
          variants={itemVariants}
          className="flex flex-col max-lg:items-center gap-2"
        >
          <span className="font-black sm:text-4xl text-2xl text-gray-900 dark:text-white tracking-tight">
            پروژه‌های ساروج
          </span>
          <span className="w-16 h-[3px] bg-primary rounded-full max-lg:mx-auto" />
        </motion.div>

        {/* FILTERING LAYER */}
        <motion.div variants={itemVariants} className="w-full lg:w-auto">
          <Filtering
            data={categoriesData?.data || []}
            filtering={{ groupSelected, setGroupSelected }}
            isLoading={isLoadingCategories}
            sort={{ selected, setSelected }}
          />
        </motion.div>
      </div>

      {/* THE PORTFOLIO GRID */}
      <motion.div
        className="container mt-12 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-4"
        variants={itemVariants}
      >
        {isLoading
          ? [1, 2, 3].map((item) => <ProjectSclton key={item} />)
          : filteredProjects?.map((item) => (
              <ProjectItem key={item?.id} item={item as IProject} />
            ))}
      </motion.div>

      {/* INFINITE SCROLL SYSTEM ELEMENT */}
      <CustomWhen condition={hasNextPage}>
        <div
          ref={loadMoreRef}
          className="w-full h-24 flex items-center justify-center mt-8"
        />
      </CustomWhen>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <Spinner color="primary" size="lg" />
        </div>
      )}
    </motion.section>
  );
};

export default Container;
