import Image from "next/image";
import { motion } from "framer-motion";

import CommentImage from "@/public/images/commentImage.png";
import { DobleQuatesIcon } from "@/components/icons";

interface IProps {
  item: IComment;
}

const CommentItem: React.FC<IProps> = ({ item }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        relative
        flex
        flex-col
        items-center
        px-6
        pt-16
        pb-10
        rounded-2xl
bg-gradient-to-b
from-gray-darker
to-gray-darker/80
        border
        border-white/5
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Avatar */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-12 left-0 right-0 mx-auto w-24 h-24 rounded-full"
      >
        <Image alt="" src={CommentImage} />
      </motion.div>

      <span className="text-base font-bold text-white-gray">
        {item.fullName}
      </span>

      <span className="mt-1 text-sm font-medium text-gray-lighter">
        {item.email}
      </span>

      <motion.div
        animate={{
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="mt-5"
      >
        <DobleQuatesIcon className="text-primary" height={14} width={18} />
      </motion.div>

      <p className="mt-5 text-center leading-8 text-gray-lighter">
        {item.text}
      </p>
    </motion.div>
  );
};

export default CommentItem;
