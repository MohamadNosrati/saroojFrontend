import FaqsContainer from "./FaqsContainer";

const Faqs = () => {
  return (
    <section className="px-24 pt-28 pb-52 flex gap-11 flex-col items-center  bg-black">
      <div className="flex items-center flex-col">
        <h4 className="text-center text-primary text-2xl leading-16 font-bold">
          سوالات متداول
        </h4>
        <h6 className="text-lg text-white leading-14">
          پرسش و پاسخ های متداول
        </h6>
      </div>
      <div className="flex flex-col w-2/3 gap-2.5">
        <FaqsContainer />
      </div>
    </section>
  );
};

export default Faqs;
