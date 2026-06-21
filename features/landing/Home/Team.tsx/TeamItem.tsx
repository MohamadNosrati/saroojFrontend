import Image from "next/image";
import Link from "next/link";

import TeamImage from "@/public/images/team.png";
import { InstagramIcon } from "@/components/icons";
import { ITeamate } from "@/lib/types/teamate";

interface IProps {
  item: ITeamate;
}

const TeamItem: React.FC<IProps> = ({ item }) => {
  return (
    <div className="lg:col-span-4 sm:col-span-6 col-span-12 flex flex-col items-center group bg-gray-50/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-darker shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-black/40 hover:-translate-y-1">
      {/* AVATAR WRAPPER WITH DOUBLE RING GLOW */}
      <div className="relative p-1.5 rounded-full border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors duration-500">
        <div className="overflow-hidden rounded-full aspect-square w-40 h-40 relative shadow-md">
          <Image
            alt={item?.title || ""}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            height={160}
            src={TeamImage}
            width={160}
          />
        </div>
      </div>

      {/* MEMBER NAME */}
      <span className="block mt-6 text-center text-2xl text-gray-800 dark:text-white font-extrabold tracking-wide transition-colors duration-300 group-hover:text-primary">
        {item?.title}
      </span>

      {/* MEMBER POSITION */}
      <span className="mt-1.5 block text-center font-bold text-base text-primary/90 bg-primary/10 px-3 py-0.5 rounded-full border border-primary/20">
        {item?.position}
      </span>

      {/* MEMBER BIO / DESCRIPTION */}
      <p className="text-sm text-center text-gray-500 dark:text-gray-lighter/80 font-medium mt-4 leading-relaxed max-w-[90%]">
        {item?.description}
      </p>

      {/* SOCIAL LINKS ROW */}
      <div className="flex items-center mt-6 gap-3">
        {[1, 2, 3, 4]?.map((socialId) => (
          <Link
            key={socialId}
            className="bg-black/5 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary border border-black/5 dark:border-white/10 rounded-xl flex items-center justify-center size-10 shadow-sm transition-all duration-300 hover:shadow-[0_4px_12px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-0.5 group/btn"
            href={""}
          >
            <InstagramIcon
              className="text-gray-600 dark:text-gray-300 group-hover/btn:text-gray-darker transition-colors duration-300"
              height={20}
              width={20}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamItem;
