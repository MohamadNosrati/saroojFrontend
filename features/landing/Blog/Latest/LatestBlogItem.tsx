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
      className="aspect-video relative"
      href={persianRoutes.singleBlogPage(`${slugify(item?.title)}`)}
    >
      <div className="size-full absolute left-0 top-0 z-10 bg-gradient-to-t from-dark via-dark/10 to-transparent flex lg:py-10 lg:px-6 p-4 flex-col items-center justify-end text-primary ">
        <div className="flex flex-col w-full sm:gap-3 gap-2">
          <span className="text-white-gray sm:text-2xl text-lg max-w-full truncate">
            {item?.title}
          </span>
          <div className="flex items-center gap-2.5">
            <span>
              <WriterIcon className="text-primary" height={20} width={20} />
            </span>
            <span className="text-sm text-white-gray">Mohammad Nosrati</span>
          </div>
        </div>
      </div>
      <div className="relative size-full">
        <Image
          fill
          alt="test"
          className="absolute"
          src={uploadUrl(item?.pictureId?.image)}
        />
      </div>
    </Link>
  );
}
