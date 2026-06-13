"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Spinner } from "@heroui/spinner";

import ProjectItem from "../../ProjectItem";

import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { IProject } from "@/lib/types/project";
import { getData } from "@/lib/services/data";
import { IBaseResponse, IPaginatedResponse } from "@/lib/types/base";
import { CustomWhen } from "@/components/ui/CustomWhen";

const Container = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [ProjectsRoute.getAll()],
      queryFn: ({ pageParam = 1 }) =>
        getData<IBaseResponse<IPaginatedResponse<IProject>>>(
          ProjectsRoute.getAll({
            page: pageParam,
            limit: 9,
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

  return (
    <section className="py-20 items-center bg-black">
      <div className="container grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
        {data?.pages
          ?.flatMap((page) => page?.data?.result)
          ?.map((item) => (
            <ProjectItem key={item?.id} item={item as IProject} />
          ))}
      </div>
      <CustomWhen condition={hasNextPage}>
        <div ref={loadMoreRef} className="w-full h-20" />
      </CustomWhen>
      {isFetchingNextPage && <Spinner color="primary" />}
    </section>
  );
};

export default Container;
