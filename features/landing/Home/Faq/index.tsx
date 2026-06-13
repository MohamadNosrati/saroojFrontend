import FaqsContainer from "./FaqsContainer";

import HouseImage from "@/public/images/house.png";

const Faqs = () => {
  return (
    <section className="dark:bg-dark">
      <section
        className="bg-no-repeat max-lg:!bg-none bg-cover lg:pt-20 lg:pb-48 md:pt-14 md:pb-24 sm:pt-12 sm:pb-14 pt-6 pb-10 flex lg:gap-12 gap-8 flex-col items-center"
        style={{
          backgroundImage: `url(${HouseImage.src})`,
        }}
      >
        <h4 className="text-center text-primary text-2xl font-bold">
          سوالات متداول
        </h4>
        <div className="flex container flex-col lg:w-2/3  w-full">
          <FaqsContainer />
        </div>
      </section>
    </section>
  );
};

export default Faqs;
