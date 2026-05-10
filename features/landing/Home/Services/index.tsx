import Image from "next/image";
import ServiceItem from "./ServiceItem";
import ServiceImage from "@/public/images/serviceImage.png";

const Services = () => {
  return (
    <section className="lg:pt-20 md:pt-12 lg:pb-32 md:pb-24 sm:pt-10 sm:pb-20 pt-8 pb-12 bg-gray-darker">
      <h5 className="text-center text-white text-2xl font-bold">
        چه خدماتی به مشتریان ارایه می دهیم؟
      </h5>
      <div className="container max-lg:flex-col lg:mt-12 sm:mt-8 mt-4 flex gap-x-12">
        <div className="basis-1/3 max-lg:hidden aspect-square relative">
          <Image alt="" fill src={ServiceImage} />
        </div>
        <div className="basis-2/3 grid sm:grid-cols-2 lg:gap-14 md:gap-10 sm:gap-8 gap-6">
          {[1, 2, 3, 4]?.map((item) => <ServiceItem item={item} key={item} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;
