import { InstagramIcon } from "@/components/icons";

const Socials = () => {
  return (
    <div className="lg:gap-10 gap-6 flex dark:bg-dark bg-white  flex-col items-center ">
      <span className="dark:text-white text-dark text-2xl font-extrabold">Connect with us</span>
      <div className="flex items-center gap-6">
        {[1, 2, 3, 4]?.map((item) => (
          <div className="sm:size-12 size-10 flex justify-center items-center rounded-full bg-primary" key={item}>
            <InstagramIcon className="text-dark sm:size-9 size-7 dark:text-white"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Socials;
