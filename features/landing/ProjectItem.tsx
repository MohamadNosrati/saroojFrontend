import Image from "next/image";
import ProjectImage from "@/public/images/projectImage.png";

const ProjectItem = () => {
  return (
    <div className="w-full ">
      <Image src={ProjectImage} alt="" />
    </div>
  );
};

export default ProjectItem;
