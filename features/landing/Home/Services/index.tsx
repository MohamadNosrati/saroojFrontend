import Image from "next/image";
import ServiceItem from "./ServiceItem";
import ServiceImage from "@/public/images/serviceImage.png";

const Services = () => {
  return (
    <section className="px-24 pt-20 pb-40 bg-gray-darker">
      <h5 className="text-center text-white text-2xl font-bold">دسته بندی</h5>
      <div className=" container mt-12 flex gap-12">
        <div className="basis-1/3 aspect-square relative">
          <Image alt="" fill src={ServiceImage} />
        </div>
        <div className="flex flex-col gap-11 justify-between basis-2/3">
          <div className="">
            <h4 className="text-3xl font-bold">چه خدماتی به مشتریان ارایه می دهیم؟</h4>
          </div>
          <div className="basis-2/3 grid grid-cols-2 gap-14">
            {[1, 2, 3, 4]?.map((item) => (
              <ServiceItem item={item} key={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
