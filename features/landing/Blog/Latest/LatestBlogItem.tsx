import Image from "next/image";
import Link from "next/link";

import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { WriterIcon } from "@/components/icons";
import { IBlog } from "@/lib/types/blog";
import { uploadUrl } from "@/lib/tools/upload";
import { slugify } from "@/lib/tools/slugify";

interface IProps {
  item: IBlog;
}

export default function LatestBlogItem({ item }: IProps) {
  return (
    <Link
      className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 shadow-lg group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 bg-gray-900"
      href={persianRoutes.singleBlogPage(`${slugify(item?.title)}`)}
    >
      {/* IMAGE WRAPPER LAYER (Handles smooth micro-zoom on card hover) */}
      <div className="absolute inset-0 size-full z-0 overflow-hidden">
        <Image
          fill
          alt={item?.title || "Sarooj Blog Cover"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-w-7xl) 50vw, 100vw"
          src={uploadUrl(item?.pictureId?.image)}
        />
      </div>

      {/* DYNAMIC METALLIC SCROLL SHROUD OVERLAY */}
      {/* Deepens on hover to push text contrast forward effortlessly */}
      <div className="absolute inset-0 size-full z-10 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:via-black/50" />

      {/* FIXED METRICS DATA PANEL (RTL-Aligned) */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 w-full flex flex-col items-start justify-end lg:p-8 sm:p-6 p-4 text-right select-none"
        dir="rtl"
      >
        <div className="flex flex-col w-full gap-2.5 sm:gap-3.5">
          {/* BLOG CATEGORY TAG BADGE */}
          <span className="w-fit bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-1 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
            مقاله ویژه
          </span>

          {/* ARTICLE TITLE WITH HOVER UNDERLINE EFFECTS */}
          <h3 className="text-white sm:text-2xl text-lg font-black tracking-wide leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:text-primary line-clamp-2">
            {item?.title}
          </h3>

          {/* BOTTOM SEPARATOR METRIC LINE */}
          <span className="w-12 h-[2px] bg-gray-400/30 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-primary/60" />

          {/* AUTHOR/META FOOTER BLOCK */}
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center justify-center p-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-gray-darker group-hover:border-primary">
              <WriterIcon height={14} width={14} />
            </span>
            <span className="text-xs sm:text-sm text-gray-300 font-bold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {item?.userId?.userName || "ساروج نیوز"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
