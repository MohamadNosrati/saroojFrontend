import { InstagramIcon } from "@/components/icons";

const Socials = () => {
  return (
    <div className="gap-14 flex bg-black flex-col items-center pb-16">
      <span className="text-white text-2xl font-extrabold">Connect with us</span>
      <div className="flex items-center gap-6">
        {[1, 2, 3, 4]?.map((item) => (
          <div className="w-12 h-12 flex justify-center items-center rounded-full bg-primary" key={item}>
            <InstagramIcon width={36} height={36} className="text-black "/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Socials;
