import LinesImage from "@/public/images/lines.png";
import { categoriesRoute } from "@/lib/routes/apiRoutes";
import { ICategory } from "@/lib/types/categories";
import { IBaseResponse } from "@/lib/types/base";
import { getData } from "@/lib/services/data";

import CategoryItem from "./CategoryItem";

const Categories = async () => {
  const data = await getData<IBaseResponse<ICategory[]>>(
    categoriesRoute.getAll(),
  );

  return (
    <section
      className="lg:pt-16 dark:bg-dark bg-white lg:pb-20 md:pt-14 md:pb-24 sm:pt-12 sm:pb-10 pt-6 pb-8 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${LinesImage.src})`,
      }}
    >
      {/* ENHANCED HEADER WITH ACCENT LINE */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <h5 className="text-center text-primary text-2xl font-extrabold tracking-wide drop-shadow-sm">
          دسته بندی
        </h5>
        <span className="w-12 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
      </div>

      <div className="grid container lg:mt-12 sm:mt-8 mt-4 grid-cols-12 gap-y-5 gap-x-5 px-4">
        {data?.data?.map((item) => <CategoryItem key={item?.id} item={item} />)}
      </div>
    </section>
  );
};

export default Categories;
