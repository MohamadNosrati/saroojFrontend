import Image from "next/image";
import Link from "next/link";

import { CalandarIcon } from "@/components/icons";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { dateConvertor } from "@/lib/tools/dateConvertor";
import { IBlog } from "@/lib/types/blog";
import { uploadUrl } from "@/lib/tools/upload";
import { slugify } from "@/lib/tools/slugify";

interface IProps {
  item: IBlog;
  itemVariants?: {
    hidden: {
      opacity: number;
      y: number;
    };
    visible: {
      opacity: number;
      y: number;
      transition: {
        duration: number;
      };
    };
  };
}

export default function BlogItem({ item }: IProps) {
  return (
    <Link
      className="group block w-full overflow-hidden rounded-3xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-gray-darker/30 backdrop-blur-sm shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] dark:hover:shadow-black/40 hover:-translate-y-1.5 transition-all duration-500 ease-out"
      href={persianRoutes.singleBlogPage(`${slugify(item?.title)}`)}
    >
      {/* ASPECT-VIDEO IMAGE FRAME WITH SHARP MASK BOUNDS */}
      <div className="aspect-video relative w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* BACKGROUND SCALING PICTURE LAYER */}
        <Image
          fill
          alt={item?.alt || item?.title}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={uploadUrl(item?.pictureId?.image)}
          sizes="(max-w-7xl) 33vw, 100vw"
        />

        {/* MODERN CORNER DATE ACCENT TAG */}
        <div
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md select-none"
          dir="rtl"
        >
          <CalandarIcon height={14} width={14} className="text-primary" />
          <span>{dateConvertor(item?.createdAt)}</span>
        </div>

        {/* GRADIENT SHROUD TO CUSHION THE LOWER BOUNDARY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* DATA CONTAINER BLOCK (RTL-ALIGNED) */}
      <div
        className="sm:p-5 p-4 text-gray-900 dark:text-white flex flex-col gap-2.5 text-right select-none"
        dir="rtl"
      >
        {/* MINIMALIST INDUSTRY CLASSIFICATION LABEL */}
        <span className="text-[10px] font-black tracking-widest text-primary uppercase">
          نشریه فنی
        </span>

        {/* ARTICLE BLOCK HEADER WITH SMOOTH LINE CLAMP AND TRANSLATION MOVEMENT */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold block sm:text-lg text-base max-w-full truncate tracking-wide leading-snug text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
            {item?.title}
          </h3>

          {/* Architectural indicator graphic line that rolls out smoothly on mouse hover */}
          <span className="w-0 h-[2px] bg-primary rounded-full transition-all duration-500 group-hover:w-12 shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
        </div>
      </div>
    </Link>
  );
}
