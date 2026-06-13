import Image from "next/image";
import Link from "next/link";

import ServiceImage from "@/public/images/serviceImage.png";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { ICategory } from "@/lib/types/categories";

interface IProps {
  item: ICategory;
}

const CategoryItem: React.FC<IProps> = ({ item }) => {
  return (
    <Link
      className="lg:col-span-4 col-span-6 aspect-[403/572] relative"
      href={persianRoutes.categoryProjectsPage(item?.title)}
    >
      <div className="size-full absolute left-0 top-0 z-10 bg-gradient-to-t from-dark via-dark/10 to-transparent flex py-10 px-6 flex-col items-center justify-end text-primary ">
        <span className="lg:text-4xl max-w-full truncate font-extrabold text-primary">
          {item?.title}
        </span>
      </div>
      <Image
        fill
        alt=""
        className="size-full"
        placeholder="blur"
        src={ServiceImage}
      />
    </Link>
  );
};

export default CategoryItem;
