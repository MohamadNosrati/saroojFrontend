import Image from "next/image";

import BannerImage from "@/public/images/projectsBanner.png";

const Banner = () => {
  return (
    <section className="dark:bg-dark bg-white">
      <div className="container mt-8 relative">
        <Image
          alt=""
          className="h-full object-cover rounded-2xl  w-full"
          src={BannerImage}
        />
      </div>
    </section>
  );
};

export default Banner;
