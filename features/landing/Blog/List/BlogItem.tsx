import Image from "next/image";
import Link from "next/link";

import { CalandarIcon } from "@/components/icons";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { dateConvertor } from "@/lib/tools/dateConvertor";
import { IBlog } from "@/lib/types/blog";
import { uploadUrl } from "@/lib/tools/upload";

interface IProps {
  item: IBlog;
}

export default function BlogItem({ item }: IProps) {
  return (
    <Link href={persianRoutes.singleBlogPage("fdsfsdg")}>
      <div className="aspect-video relative">
        <Image
          fill
          alt={item?.alt}
          className="absolute"
          src={uploadUrl(item?.pictureId?.image)}
        />
      </div>
      <div className="sm:p-6 p-4 text-dark bg-primary flex flex-col gap-1.5">
        <div>
          <span className="font-bold block sm:text-xl max-w-full truncate">
            {item?.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <CalandarIcon height={20} width={20} />
          </span>
          <span className="font-bold">{dateConvertor(item?.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
