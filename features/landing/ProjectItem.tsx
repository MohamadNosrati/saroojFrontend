import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { IProject } from "@/lib/types/project";
import { slugify } from "@/lib/tools/slugify";
import { uploadUrl } from "@/lib/tools/upload";

interface IProps {
  item: IProject;
}

const ProjectItem: React.FC<IProps> = ({ item }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -10,
      }}
      className="group"
    >
      <Link href={persianRoutes.singleProjectPage(slugify(item?.title))}>
        <div className="relative w-full aspect-[403/572] overflow-hidden">
          <motion.div
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.7,
            }}
            className="absolute inset-0"
          >
            <Image
              fill
              alt={item?.alt}
              className="object-cover"
              src={uploadUrl(item?.pictureId?.image)}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/20 to-transparent flex py-10 px-6 flex-col justify-end"
            whileHover={{
              background:
                "linear-gradient(to top, rgba(0,0,0,.95), rgba(0,0,0,.2), transparent)",
            }}
          >
            <motion.span
              className="lg:text-3xl text-xl font-extrabold text-primary max-w-full truncate"
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              {item?.title}
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectItem;
