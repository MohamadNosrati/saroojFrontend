import { sliderRoutes } from "@/lib/routes/apiRoutes";
import SwiperContainer from "./SwiperContainer";
import { getData } from "@/lib/services/data";
import { ISlider } from "@/lib/types/slider";
import { IBaseResponse } from "@/lib/types/base";

const HomeCarousel = async () => {
  const data = await getData<IBaseResponse<ISlider[]>>(sliderRoutes.getAll());
  return (
    <section className="">
      <SwiperContainer data={data?.data || []} />
    </section>
  );
};

export default HomeCarousel;
