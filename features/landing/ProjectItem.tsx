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
      className="group bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link href={persianRoutes.singleProjectPage(slugify(item?.title))}>
        {/* PORTFOLIO CARD BOX WITH SHADOW ELEVATION FRAME */}
        <div className="relative w-full aspect-[403/520] overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 shadow-md group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] dark:group-hover:shadow-black/60 transition-all duration-500">
          {/* ZOOM LAYER BACKGROUND IMAGE */}
          <motion.div
            className="absolute inset-0 z-0"
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
          >
            <Image
              fill
              alt={item?.alt || ""}
              className="object-cover w-full h-full"
              src={uploadUrl(item?.pictureId?.image)}
            />
          </motion.div>

          {/* DYNAMIC INDUSTRIAL SHROUD GRADIANT OVERLAY */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-all duration-500 group-hover:from-black group-hover:via-black/50" />

          {/* TEXT TITLE CONTAINER CONTENT BLOCK */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end py-8 px-6 text-right select-none">
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1">
                {item?.title}
              </span>

              {/* Decorative design line that expands outwards from 0 across the bottom on card hover */}
              <span className="w-0 h-[2px] bg-primary rounded-full transition-all duration-500 group-hover:w-16 shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectItem;
