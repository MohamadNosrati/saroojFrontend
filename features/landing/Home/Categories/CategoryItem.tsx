import Image from "next/image";
import StaticImage from "@/public/images/categroyStaticImage.png";

interface IProps {
  item: number;
}

const CategoryItem: React.FC<IProps> = ({ item }) => {
  return (
    <div className="col-span-2" key={item}>
      <Image width={400} height={570} src={StaticImage} alt="" />
    </div>
  );
};

export default CategoryItem;
