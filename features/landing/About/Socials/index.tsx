import Link from "next/link";

import { InstagramIcon } from "@/components/icons";
import { saroojInstagram } from "@/lib/constants/info";

const Socials = () => {
  return (
    <div className="lg:gap-10 gap-6 flex dark:bg-dark bg-white  flex-col items-center ">
      <span className="dark:text-white text-dark text-2xl font-extrabold">
        با ما در تماس باشید
      </span>
      <div className="flex items-center gap-6">
        <Link
          className="sm:size-12 size-10 flex justify-center items-center rounded-full bg-primary"
          href={saroojInstagram}
        >
          <InstagramIcon className="text-dark sm:size-9 size-7 dark:text-white" />
        </Link>
      </div>
    </div>
  );
};

export default Socials;
