import { sliderRoutes } from "@/lib/routes/apiRoutes";
import SwiperContainer from "./SwiperContainer";

const HomeCarousel = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + sliderRoutes.getAll());
  const data = await res.json();
  return (
    <section className="">
      <SwiperContainer data={data?.data} />
    </section>
  );
};

export default HomeCarousel;
