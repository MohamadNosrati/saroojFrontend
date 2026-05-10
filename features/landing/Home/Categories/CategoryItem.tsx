import Image from "next/image";
import ServiceImage from "@/public/images/serviceImage.png";
import Link from "next/link";
import { persianRoutes } from "@/lib/routes/navigationRoutes";

interface IProps {
  item: number;
}

const CategoryItem: React.FC<IProps> = ({ item }) => {
  return (
    <Link href={persianRoutes.projectsPage()} className="lg:col-span-4 col-span-6   aspect-[403/572] relative" key={item}>
      <div className="size-full absolute left-0 top-0 z-10 bg-gradient-to-t from-dark via-dark/10 to-transparent flex py-10 px-6 flex-col items-center justify-end text-primary ">
         <span className="lg:text-4xl max-w-full truncate font-extrabold text-primary">
         پروژه پدرام fsdfsd gvdfsdfwef sefwewe
         </span>
      </div>
      <Image placeholder="blur" className="size-full" fill src={ServiceImage} alt="" />
    </Link>
  );
};

export default CategoryItem;
