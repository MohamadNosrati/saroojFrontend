import Carousel from "@/features/landing/SingleProject/Carousel";
import Info from "@/features/landing/SingleProject/Info";
import RelatedProjects from "@/features/landing/SingleProject/RelatedProjects";
import Video from "@/features/landing/SingleProject/Video";

export default function SingleProjectPage() {
  return (
    <main>
      <section className="bg-gradient-to-b dark:bg-dark bg-white from-primary via-primary/25 to-transparent">
        <div className="container lg:pt-8 pt-6">
          <h1 className="text-center lg:text-4xl sm:text-2xl text-xl font-bold lg:mb-6 mb-2.5">fdsfsdfsdfdsfds</h1>
          <Carousel />
          <Info />
        </div>
      </section>
      <Video />
      <RelatedProjects />
    </main>
  );
};

