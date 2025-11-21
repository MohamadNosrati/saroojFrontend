import { HomeIcon } from "@/components/icons";

const Info = () => {
  return (
    <section className="container pb-32 mt-14 grid grid-cols-2 gap-14 ">
      <div className="col-span-2 flex items-center gap-3">
        <HomeIcon width={40} height={40} className="text-primary" />
        <span className="text-gray-lighter font-medium text-xl">{`نام پروژه : نام پروژه`}</span>
      </div>
      <div className="col-span-1 flex items-center gap-3">
        <HomeIcon width={40} height={40} className="text-primary" />
        <span className="text-gray-lighter font-medium text-xl">{`نام پروژه : نام پروژه`}</span>
      </div>
      <div className="col-span-1 flex items-center gap-3">
        <HomeIcon width={40} height={40} className="text-primary" />
        <span className="text-gray-lighter font-medium text-xl">{`نام پروژه : نام پروژه`}</span>
      </div>
      <div className="col-span-1 flex items-center gap-3">
        <HomeIcon width={40} height={40} className="text-primary" />
        <span className="text-gray-lighter font-medium text-xl">{`نام پروژه : نام پروژه`}</span>
      </div>
      <div className="col-span-1 flex items-center gap-3">
        <HomeIcon width={40} height={40} className="text-primary" />
        <span className="text-gray-lighter font-medium text-xl">{`نام پروژه : نام پروژه`}</span>
      </div>
      <div className="col-span-2 flex items-center gap-3">
        <HomeIcon width={40} height={40} className="text-primary min-h-fit min-w-fit" />
        <p className="text-gray-lighter font-medium text-xl">{`توضیحات : لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه ولورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان   `}</p>
      </div>
    </section>
  );
};

export default Info;
