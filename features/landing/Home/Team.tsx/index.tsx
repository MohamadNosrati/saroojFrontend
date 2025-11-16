import TeamItem from "./TeamItem";

const Team = () => {
  return (
    <section className="px-24 pt-20 pb-48 bg-black">
      <h5 className="text-center text-white text-2xl font-bold">دسته بندی</h5>
      <div className="grid container mt-12 grid-cols-6 gap-28">
        {[1, 2, 3]?.map((item) => (
          <TeamItem item={item} key={item} />
        ))}
      </div>
    </section>
  );
};

export default Team;
