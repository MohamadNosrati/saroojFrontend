import CustomLoader from "@/components/ui/CustomLoader";
import CategoryItem from "./CategoryItem";
import LinesImage from "@/public/images/lines.png";
import { categoriesRoute } from "@/lib/routes/apiRoutes";

const Categories = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + categoriesRoute.getAll(),
  );
  const data = await res.json();
  return (
    <section
      style={{
        backgroundImage: `url(${LinesImage.src})`,
      }}
      className="lg:pt-20 dark:bg-dark bg-white lg:pb-48 md:pt-14 md:pb-24 sm:pt-10 sm:pb-14 pt-6 pb-10 bg-cover bg-no-repeat"
    >
      <h5 className="text-center text-primary text-2xl font-bold">دسته بندی</h5>
      <div className="grid container lg:mt-12 sm:mt-8 mt-4 grid-cols-12 gap-y-5 gap-x-5">
        {data?.data?.map((item) => (
          <CategoryItem item={item} key={item} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
