
import { Pagination } from "@heroui/pagination";
import ProjectItem from "../../ProjectItem";

const Container = () => {
  return (
    <section className="py-20 px-24 gap-20 flex flex-col items-center bg-black">
      <div className="container grid grid-cols-6 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item) => (
          <div key={item} className="col-span-2">
            <ProjectItem/>
          </div>
        ))}
      </div>
      <div>
        <Pagination dir="ltr" showControls initialPage={1} total={10} />
      </div>
    </section>
  );
};

export default Container;
