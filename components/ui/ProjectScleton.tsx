import { Skeleton } from "@heroui/skeleton";

const ProjectSclton = () => {
  return (
    <div className="w-full aspect-[403/572] relative">
      <Skeleton className="h-full" />
      <div className="size-full absolute left-0 top-0 z-10 bg-transparent flex py-10 px-6 flex-col items-center justify-end text-primary ">
        <Skeleton className="w-3/4">
          <div className="w-full h-10" />
        </Skeleton>
      </div>
    </div>
  );
};

export default ProjectSclton;
