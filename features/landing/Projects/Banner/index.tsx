import Image from "next/image";

import BannerImage from "@/public/images/banner.png";

const Banner = () => {
  return (
    <section>
      <Image alt="" className="object-cover w-full" src={BannerImage} />
    </section>
  );
};

export default Banner;
