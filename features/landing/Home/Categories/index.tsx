import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <section className="px-24 pt-20 pb-48 bg-black">
      <h5 className="text-center text-white text-2xl font-bold">دسته بندی</h5>
      <div className="grid container mt-12 grid-cols-6 gap-5">
        {[1, 2, 3, 4, 5, 6]?.map((item) => (
          <CategoryItem item={item} key={item} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
