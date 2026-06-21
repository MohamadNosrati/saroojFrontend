import Image from "next/image";
import { motion } from "framer-motion";

import CommentImage from "@/public/images/commentImage.png";
import { DobleQuatesIcon } from "@/components/icons";

interface IProps {
  item: IComment;
}

const CommentItem: React.FC<IProps> = ({ item }) => {
  return (
    <div className="group relative flex flex-col items-center px-6 pt-16 pb-10 rounded-3xl bg-gradient-to-b from-gray-darker via-gray-dark to-gray-darker/90 border border-white/[0.06] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-primary/30 transition-all duration-500 ease-out text-center select-none backdrop-blur-sm">
      {/* GLOW OVERLAY ACCENT (Enhanced gradient intensity on hover) */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/[0.08] to-transparent rounded-t-3xl pointer-events-none group-hover:from-primary/[0.15] transition-all duration-500" />

      {/* FIXED METALLIC AVATAR CONTAINER */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full p-[3px] bg-gradient-to-b from-white/20 to-white/5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] group-hover:from-primary/40 group-hover:to-primary/10 transition-all duration-500">
        <div className="relative size-full rounded-full overflow-hidden bg-gray-darker border border-white/5">
          <Image
            alt={item.fullName || "کاربر ساروج"}
            src={CommentImage}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="96px"
          />
        </div>
      </div>

      {/* USER DESCRIPTION CREDENTIALS */}
      <span className="text-base font-black text-white tracking-wide mt-2">
        {item.fullName}
      </span>

      <span className="mt-1 text-xs font-bold text-gray-400/80 tracking-wider">
        {item.email}
      </span>

      {/* ACCENT UNDERLINE INDICATOR */}
      <div className="mt-3 w-8 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full group-hover:w-16 group-hover:via-primary transition-all duration-500" />

      {/* BRAND DECORATIVE DOUBLE QUOTES BLOCK */}
      <div className="mt-5 mb-1 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
        <DobleQuatesIcon height={16} width={20} />
      </div>

      {/* CORE COMMENT REVIEW CONTENT PARAGRAPH (RTL Text) */}
      <p
        className="mt-4 text-sm font-medium text-gray-300/90 leading-8 tracking-wide max-w-prose group-hover:text-white transition-colors duration-500"
        dir="rtl"
      >
        {item.text}
      </p>
    </div>
  );
};

export default CommentItem;
