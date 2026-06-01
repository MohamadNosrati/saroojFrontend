import Image from "next/image";
import ServiceImage from "@/public/images/serviceImage.png";
import Link from "next/link";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { IProject } from "@/lib/types/project";
import { slugify } from "@/lib/tools/slugify";
import { uploadUrl } from "@/lib/tools/upload";

interface IProps {
  item: IProject;
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
        <Image
          src={uploadUrl(item?.pictureId?.image)}
          className="size-full"
          fill
          alt={item?.alt}
        />
      </div>
    </Link>
  );
};

export default ProjectItem;
