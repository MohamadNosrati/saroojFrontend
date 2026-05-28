import Image from "next/image";
import ServiceImage from "@/public/images/serviceImage.png";
import Link from "next/link";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { IProject } from "@/lib/types/project";

interface IProps {
  item: IProject;
}

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // spaces -> -
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "") // remove invalid chars
    .replace(/-+/g, "-"); // remove duplicate -
}

const ProjectItem: React.FC<IProps> = ({ item }) => {
  return (
    <Link href={persianRoutes.singleProjectPage(`${slugify(item?.title)}`)}>
      <div className="relative w-full aspect-[403/572]">
        <div className="size-full absolute left-0 top-0 z-10 bg-gradient-to-t from-dark via-dark/10 to-transparent flex py-10 px-6 flex-col items-center justify-end text-primary ">
          <span className="lg:text-3xl max-w-full truncate font-extrabold text-primary">
            {item?.title}
          </span>
        </div>
        <Image src={ServiceImage} className="size-full" fill alt="" />
      </div>
    </Link>
  );
};

export default ProjectItem;
