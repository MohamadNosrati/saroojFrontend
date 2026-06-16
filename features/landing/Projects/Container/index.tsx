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
      className="lg:pb-20 sm:pb-14 pb-10 dark:bg-dark bg-white overflow-hidden lg:mt-12 mt-6"
      initial="hidden"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.15 }}
      whileInView="visible"
    >
      <div className="container flex max-lg:flex-col gap-2.5 items-center justify-between">
        <motion.div variants={itemVariants}>
          <span className="font-bold sm:text-4xl text-2xl dark:text-white">
            پروژه های ساروج
          </span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Filtering
            data={categoriesData?.data || []}
            filtering={{
              groupSelected,
              setGroupSelected,
            }}
            isLoading={isLoadingCategories}
            sort={{
              selected,
              setSelected,
            }}
          />
        </motion.div>
      </div>
      <motion.div
        className="container mt-10 grid lg:grid-cols-3 grid-cols-2 gap-5"
        variants={itemVariants}
      >
        {isLoading
          ? [1, 2, 3].map((item) => <ProjectSclton key={item} />)
          : filteredProjects?.map((item) => (
              <ProjectItem key={item?.id} item={item as IProject} />
            ))}
      </motion.div>
      <CustomWhen condition={hasNextPage}>
        <div ref={loadMoreRef} className="w-full h-20" />
      </CustomWhen>
      {isFetchingNextPage && <Spinner color="primary" />}
    </motion.section>
  );
};

export default Container;
