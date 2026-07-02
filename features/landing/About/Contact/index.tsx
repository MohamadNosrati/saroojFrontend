import Link from "next/link";

import { EnvelopeIcon, CallIcon, LocationIcon } from "@/components/icons";
import { phones, saroojAddress, saroojEmail } from "@/lib/constants/info";

import ContactItem from "./ContactItem";

const Contact = () => {
  return (
    <section className="sm:py-16 py-10 dark:bg-dark bg-white flex flex-col md:gap-14 gap-8 items-center overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center gap-2">
        <h5 className="sm:text-3xl text-2xl font-black tracking-tight dark:text-white text-gray-900">
          با ما در ارتباط باشید
        </h5>
        <span className="w-12 h-[3px] bg-primary rounded-full" />
      </div>

      {/* CORE CONTACT MATRIX GRID */}
      {/* We use grid layouts but let individual children handle their own sharp architectural borders */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 border border-black/[0.06] dark:border-white/[0.06] rounded-3xl bg-gray-50/30 dark:bg-gray-darker/10 backdrop-blur-sm overflow-hidden">
        {/* EMAIL BLOCK (Left in RTL - has a right border on desktop) */}
        <div className="border-b md:border-b-0 md:border-l border-black/[0.08] dark:border-white/[0.08] w-full">
          <ContactItem icon={EnvelopeIcon} title="پست الکترونیکی">
            <Link
              className="text-gray-600 dark:text-gray-300 font-bold hover:text-primary dark:hover:text-primary transition-colors duration-300 text-sm sm:text-base tracking-wide"
              href={`mailto:${saroojEmail}`}
            >
              {saroojEmail}
            </Link>
          </ContactItem>
        </div>

        {/* LOCATION BLOCK (Center - has a right border on desktop) */}
        <div className="border-b md:border-b-0 md:border-l border-black/[0.08] dark:border-white/[0.08] w-full">
          <ContactItem icon={LocationIcon} title="دفتر مرکزی">
            <p
              className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 text-center leading-7 max-w-xs"
              dir="rtl"
            >
              {saroojAddress}
            </p>
          </ContactItem>
        </div>

        {/* PHONES BLOCK (Right in RTL - no ending border needed) */}
        <div className="w-full">
          <ContactItem icon={CallIcon} title="شماره‌های تماس">
            <div className="flex flex-col items-center gap-1.5">
              {phones?.map((phone) => (
                <Link
                  key={phone}
                  className="text-gray-600 dark:text-gray-300 font-bold hover:text-primary dark:hover:text-primary transition-colors duration-300 text-sm sm:text-base tracking-widest"
                  href={`tel:${phone}`}
                >
                  {phone}
                </Link>
              ))}
            </div>
          </ContactItem>
        </div>
      </div>
    </section>
  );
};

export default Contact;
