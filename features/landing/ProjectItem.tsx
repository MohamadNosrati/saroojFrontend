import Image from "next/image";
import ServiceImage from "@/public/images/serviceImage.png";
import Link from "next/link";
import { persianRoutes } from "@/lib/routes/navigationRoutes";

const ProjectItem = () => {
  return (
    <Link href={persianRoutes.singleProjectPage("fdsfds")}>
      <div className="relative w-full aspect-[403/572]">
        <div className="size-full absolute left-0 top-0 z-10 bg-gradient-to-t from-dark via-dark/10 to-transparent flex py-10 px-6 flex-col items-center justify-end text-primary ">
          <span className="lg:text-3xl max-w-full truncate font-extrabold text-primary">
            پروژه پدرام fsdfsd gvdfsdfwef sefwewe
          </span>
        </div>
        <Image src={ServiceImage} className="size-full" fill alt="" />
      </div>
    </Link>
  );
};

export default ProjectItem;
