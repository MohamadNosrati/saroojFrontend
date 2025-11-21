import Container from "./Container";

const LatestProjects = () => {
  return (
    <section className="pt-12 pb-24 bg-primary">
      <div className="flex flex-col gap-6 container">
        <span>آخرین پروژه ها</span>
        <div>
          <Container />
        </div>
      </div>
    </section>
  );
};

export default LatestProjects;
