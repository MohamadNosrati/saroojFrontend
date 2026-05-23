import { sliderRoutes } from "@/lib/routes/apiRoutes";
import SwiperContainer from "./SwiperContainer";
import { IBaseResponse } from "@/lib/types/base";
import { ISliderPayload } from "@/lib/types/slider";

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
