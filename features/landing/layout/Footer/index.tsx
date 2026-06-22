import Link from "next/link";

import {
  CallIcon,
  EmailIcon,
  InstagramIcon,
  SaroojIcon,
} from "@/components/icons";
import {
  phones,
  saroojAddress,
  saroojDescription,
  saroojEmail,
  saroojInstagram,
} from "@/lib/constants/info";
import { persianRoutes } from "@/lib/routes/navigationRoutes";

const Footer = () => {
  return (
    <section className="bg-gray-darker border-t border-white/[0.04] lg:py-20 sm:py-14 py-10 relative overflow-hidden">
      {/* TOP DECORATIVE ACCENT PATTERN (Subtle hint of architecture line) */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none hidden lg:block" />

      <div className="container grid grid-cols-4 justify-between lg:gap-16 md:gap-12 sm:gap-10 gap-8 px-4 relative z-10">
        {/* COLUMN 1: BRAND LOGO & BIO */}
        <div className="flex flex-col gap-4 max-sm:items-center lg:col-span-1 sm:col-span-2 col-span-4">
          <Link
            className="transition-transform duration-300 hover:scale-[1.02] inline-block"
            href={persianRoutes.homePage()}
          >
            <SaroojIcon className="sm:w-28 h-12 text-white" />
          </Link>
          <p className="max-sm:text-center max-sm:text-sm text-gray-lighter/80 font-medium mt-2 text-justify text-sm leading-relaxed">
            {saroojDescription.substring(0, 98)}...
          </p>
        </div>

        {/* COLUMN 2: SOCIAL MEDIA */}
        <div className="flex flex-col gap-4 lg:col-span-1 sm:col-span-2 col-span-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-white font-extrabold text-lg tracking-wide">
              شبکه‌های اجتماعی
            </span>
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </div>
          <div className="flex gap-3 mt-1">
            <Link
              className="bg-white/[0.03] border border-white/10 hover:bg-primary rounded-xl flex items-center justify-center size-11 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-0.5 group"
              href={saroojInstagram}
            >
              <InstagramIcon
                className="text-gray-lighter group-hover:text-gray-darker transition-colors duration-300"
                height={22}
                width={22}
              />
            </Link>
          </div>
        </div>

        {/* COLUMN 3: CONTACT INFO */}
        <div className="flex flex-col gap-4 lg:col-span-1 sm:col-span-2 col-span-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-white font-extrabold text-lg tracking-wide">
              تماس با ما
            </span>
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </div>
          <div className="flex gap-3 flex-col mt-1">
            {phones?.map((item) => (
              <Link
                key={item}
                className="text-gray-lighter/80 hover:text-primary flex items-center gap-3 max-sm:text-sm font-semibold transition-colors duration-200 group w-fit"
                href={`tel:${item}`}
              >
                <span className="p-1.5 bg-white/[0.03] border border-white/5 rounded-lg group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-200">
                  <CallIcon
                    className="text-white group-hover:text-primary transition-colors duration-200"
                    height={16}
                    width={16}
                  />
                </span>
                <span className="direction-ltr tracking-wider font-mono">
                  {item}
                </span>
              </Link>
            ))}
            <Link
              className="max-sm:text-sm flex items-center gap-3 font-semibold text-gray-lighter/80 hover:text-primary transition-colors duration-200 group w-fit"
              href={`mailto:${saroojEmail}`}
            >
              <span className="p-1.5 bg-white/[0.03] border border-white/5 rounded-lg group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-200">
                <EmailIcon
                  className="text-white group-hover:text-primary transition-colors duration-200"
                  height={16}
                  width={16}
                />
              </span>
              <span className="truncate max-w-[180px] sm:max-w-full font-sans text-sm">
                {saroojEmail}
              </span>
            </Link>
          </div>
        </div>

        {/* COLUMN 4: ADDRESS */}
        <div className="flex flex-col gap-4 lg:col-span-1 sm:col-span-2 col-span-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-white font-extrabold text-lg tracking-wide">
              آدرس شرکت
            </span>
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </div>
          <p className="text-gray-lighter/80 max-sm:text-sm font-medium leading-relaxed text-sm text-justify mt-1">
            {saroojAddress}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
