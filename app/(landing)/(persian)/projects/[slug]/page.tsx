import Carousel from "@/features/landing/SingleProject/Carousel";
import Info from "@/features/landing/SingleProject/Info";
import LatestProjects from "@/features/landing/SingleProject/LatestProjects";
import Video from "@/features/landing/SingleProject/Video";

const SingleProjectPage = () => {
  return (
    <section className="bg-black">
      <Carousel />
      <Info />
      <Video/>
      <LatestProjects />
    </section>
  );
};

export default SingleProjectPage;
