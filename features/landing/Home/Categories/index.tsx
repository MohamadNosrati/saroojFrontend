import CustomLoader from "@/components/ui/CustomLoader";
import CategoryItem from "./CategoryItem";
import LinesImage from "@/public/images/lines.png";

const Categories = () => {
  return (
    <section style={{
      backgroundImage: `url(${LinesImage.src})`
    }} className="lg:pt-20 lg:pb-48 md:pt-14 md:pb-24 sm:pt-10 sm:pb-14 pt-6 pb-10 bg-cover bg-no-repeat">
      <h5 className="text-center text-primary text-2xl font-bold">دسته بندی</h5>
      <div className="grid container lg:mt-12 sm:mt-8 mt-4 grid-cols-12 gap-y-5 gap-x-5">
        {[1, 2, 3, 4, 5, 6]?.map((item) => (
          <CategoryItem item={item} key={item} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
