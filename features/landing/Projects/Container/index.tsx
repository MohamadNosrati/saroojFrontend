"use client";

import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import ProjectItem from "../../ProjectItem";
import { Button } from "@heroui/button";
import { IProject } from "@/lib/types/project";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "@/lib/services/projects";
import { getData } from "@/lib/services/data";
import { IBaseResponse, IPaginatedResponse } from "@/lib/types/base";

const Container = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
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
        return lastPageParam + 1;
      },
    });
  return (
    <section className="py-20 gap-20 flex flex-col items-center bg-black">
      <div className="container grid lg:grid-cols-3 grid-cols-2 gap-5">
        {data?.pages
          ?.flatMap((page) => page?.data?.result)
          ?.map((item) => (
            <ProjectItem item={item as IProject} key={item?.id} />
          ))}
      </div>
      <div className="flex items-center">
        <Button className="font-bold" size="lg" color="primary">
          مشاهده بیشتر
        </Button>
      </div>
    </section>
  );
};

export default Container;
