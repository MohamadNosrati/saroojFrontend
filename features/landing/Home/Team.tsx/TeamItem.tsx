import Image from "next/image";
import TeamImage from "@/public/images/team.png";
import { InstagramIcon } from "@/components/icons";
import Link from "next/link";

interface IProps {
  item: number;
}

const TeamItem: React.FC<IProps> = ({ item }) => {
  return (
    <div className="col-span-2 flex flex-col items-center" key={item}>
      <Image
        width={160}
        height={160}
        className="w-40 object-cover aspect-square rounded-full"
        src={TeamImage}
        alt=""
      />
      <span className="block mt-6 text-2xl text-white-gray font-medium">
        Sahra Rostami
      </span>
      <span className="mt-2 block font-medium text-lg text-primary">
        Product Designer
      </span>
      <p className="text-sm text-center text-gray-lighter font-medium">
        User interface designer and user experience designer,User interface
        designer and user experience designer
      </p>
      <div className="flex items-center mt-6 gap-2.5">
        {[1, 2, 3, 4]?.map((item) => (
          <Link href={""} key={item}>
            <InstagramIcon width={24} height={24} className="text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamItem;
