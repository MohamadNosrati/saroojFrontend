import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import ProjectItem from "../../ProjectItem";
import { Button } from "@heroui/button";
import { IProject } from "@/lib/types/project";

const Container = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + ProjectsRoute.getAll(),
  );
  const data = await res.json();
  return (
    <section className="py-20 gap-20 flex flex-col items-center bg-black">
      <div className="container grid lg:grid-cols-3 grid-cols-2 gap-5">
        {data?.data?.map((item: IProject) => (
          <ProjectItem item={item} key={item?.id} />
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
