import Image from "next/image";
import Link from "next/link";

import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { ICategory } from "@/lib/types/categories";
import { uploadUrl } from "@/lib/tools/upload";
import { slugify } from "@/lib/tools/slugify";

interface IProps {
  item: ICategory;
}

const CategoryItem: React.FC<IProps> = ({ item }) => {
  return (
    <Link
      className="lg:col-span-4 col-span-6 aspect-[403/572] relative overflow-hidden rounded-2xl group shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-primary/10 border border-black/5 dark:border-white/5"
      href={persianRoutes.categoryProjectsPage(`${slugify(item?.title)}`)}
    >
      {/* LAYERED CINEMATIC OVERLAY */}
      <div className="size-full absolute left-0 top-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent flex py-8 px-5 flex-col items-center justify-end text-primary transition-all duration-300 group-hover:bg-black/50">
        {/* TITLE WRAPPER WITH HOVER GLOW EFFECT */}
        <div className="w-full flex flex-col items-center gap-2 text-center">
          <span className="text-2xl sm:text-3xl lg:text-4xl max-w-full truncate font-black text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-300">
            {item?.title}
          </span>

          {/* Dynamic hover accent line per item */}
          <span className="w-0 h-[2px] bg-primary/80 rounded-full transition-all duration-300 group-hover:w-16" />
        </div>
      </div>

      {/* BACKDROP IMAGE WITH SMOOTH SCALE ENHANCEMENT */}
      <Image
        fill
        alt={item?.alt || ""}
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        src={uploadUrl(item?.pictureId?.image)}
      />
    </Link>
  );
};

export default CategoryItem;
