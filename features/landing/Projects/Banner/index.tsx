import Image from "next/image";
import BannerImage from "@/public/images/banner.png";

const Banner = () => {
  return (
    <section>
      <Image src={BannerImage} className="object-cover w-full" alt="" />
    </section>
  );
};

export default Banner;
