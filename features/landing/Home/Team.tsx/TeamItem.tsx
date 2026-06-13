import Image from "next/image";
import Link from "next/link";

import TeamImage from "@/public/images/team.png";
import { InstagramIcon } from "@/components/icons";
import { ITeamate } from "@/lib/types/teamate";

interface IProps {
  item: ITeamate;
}

const TeamItem: React.FC<IProps> = ({ item }) => {
  return (
    <div className="lg:col-span-4 sm:col-span-6 col-span-12 flex flex-col items-center">
      <Image
        alt=""
        className="w-40 object-cover aspect-square rounded-full"
        height={160}
        src={TeamImage}
        width={160}
      />
      <span className="block mt-6 text-center text-2xl dark:text-white-gray font-medium">
        {item?.title}
      </span>
      <span className="mt-2 block text-center font-medium text-lg text-primary">
        {item?.position}
      </span>
      <p className="text-sm text-center dark:text-gray-lighter font-medium">
        {item?.description}
      </p>
      <div className="flex items-center mt-6 gap-2.5">
        {[1, 2, 3, 4]?.map((item) => (
          <Link
            key={item}
            className="bg-primary rounded-full flex items-center justify-center size-9"
            href={""}
          >
            <InstagramIcon
              className="dark:text-white text-dark"
              height={24}
              width={24}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamItem;
