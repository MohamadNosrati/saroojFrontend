import Image from "next/image";
import StaticImage from "@/public/images/serviceImage.png";
import { CalandarIcon } from "@/components/icons";
import Link from "next/link";
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
          src={uploadUrl(item?.pictureId?.image)}
          fill
          className="absolute"
          alt={item?.alt}
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
            <CalandarIcon width={20} height={20} />
          </span>
          <span className="font-bold">{dateConvertor(item?.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
