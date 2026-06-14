"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "@heroui/spinner";

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
    <section className="py-20 items-center bg-black">
      <div className="flex container items-center justify-between">
        <div>
          <span className="dark:text-white font-medium sm:text-2xl text-xl  text-white">
            لیست مقالات
          </span>
        </div>
        <Filtering
          data={categoriesData?.data || []}
          filtering={{
            groupSelected: groupSelected,
            setGroupSelected: setGroupSelected,
          }}
          isLoading={isLoadingCategories}
          sort={{
            selected: selected,
            setSelected: setSelected,
          }}
        />
      </div>
      <div className="container mt-10 grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
        {isLoading ? (
          [1, 2, 3]?.map((item) => <ProjectSclton key={item} />)
        ) : (
          <>
            {filteredProjects?.map((item) => (
              <ProjectItem key={item?.id} item={item as IProject} />
            ))}
          </>
        )}
      </div>
      <CustomWhen condition={hasNextPage}>
        <div ref={loadMoreRef} className="w-full h-20" />
      </CustomWhen>
      {isFetchingNextPage && <Spinner color="primary" />}
    </section>
  );
};

export default Container;
