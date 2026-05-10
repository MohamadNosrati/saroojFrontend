
import ProjectItem from "../../ProjectItem";
import { Button } from "@heroui/button";

const Container = () => {
  return (
    <section className="py-20 gap-20 flex flex-col items-center bg-black">
      <div className="container grid lg:grid-cols-3 grid-cols-2 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item) => (
          <ProjectItem key={item} />
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
