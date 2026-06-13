import CategoryItem from "./CategoryItem";

import LinesImage from "@/public/images/lines.png";
import { categoriesRoute } from "@/lib/routes/apiRoutes";
import { ICategory } from "@/lib/types/categories";
import { IBaseResponse } from "@/lib/types/base";
import { getData } from "@/lib/services/data";

const Categories = async () => {
  const data = await getData<IBaseResponse<ICategory[]>>(
    categoriesRoute.getAll(),
  );

  return (
    <section
      className="lg:pt-20 dark:bg-dark bg-white lg:pb-48 md:pt-14 md:pb-24 sm:pt-10 sm:pb-14 pt-6 pb-10 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${LinesImage.src})`,
      }}
    >
      <h5 className="text-center text-primary text-2xl font-bold">دسته بندی</h5>
      <div className="grid container lg:mt-12 sm:mt-8 mt-4 grid-cols-12 gap-y-5 gap-x-5">
        {data?.data?.map((item) => <CategoryItem key={item?.id} item={item} />)}
      </div>
    </section>
  );
};

export default Categories;
