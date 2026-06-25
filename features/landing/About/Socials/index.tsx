import Link from "next/link";

import { InstagramIcon } from "@/components/icons";
import { saroojInstagram } from "@/lib/constants/info";

const Socials = () => {
  return (
    <div className="lg:gap-10 gap-6 flex dark:bg-dark bg-white flex-col items-center py-10 px-6 relative overflow-hidden border border-gray-100 dark:border-white/[0.02] shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      {/* Subtle Ambient Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Glowing Underline */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        <span className="dark:text-white text-dark text-2xl lg:text-3xl font-black tracking-wide">
          با ما در تماس باشید
        </span>
        <div className="w-10 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
      </div>

      {/* Social Links Container */}
      <div className="flex items-center gap-6 relative z-10">
        <Link
          className="group sm:size-14 size-12 flex justify-center items-center rounded-full bg-gradient-to-br from-primary to-primary/90 shadow-[0_4px_20px_rgba(var(--primary-rgb),0.3)] dark:shadow-[0_4px_20px_rgba(var(--primary-rgb),0.15)] hover:shadow-[0_8px_25px_rgba(var(--primary-rgb),0.5)] border border-white/20 transition-all duration-500 ease-out hover:-translate-y-1"
          href={saroojInstagram}
        >
          {/* Internal reflective ring */}
          <div className="absolute inset-0.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <InstagramIcon className="text-dark dark:text-white sm:size-7 size-6 group-hover:scale-110 transition-transform duration-500 ease-out" />
        </Link>
      </div>
    </div>
  );
};

export default Socials;
