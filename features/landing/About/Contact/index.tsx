import Link from "next/link";

import ContactItem from "./ContactItem";

import { EnvelopeIcon, CallIcon, LocationIcon } from "@/components/icons";
import { phones, saroojAddress, saroojEmail } from "@/lib/constants/info";

const Contact = () => {
  return (
    <section className="sm:pt-5 sm:pb-12 dark:bg-dark bg-white flex flex-col md:gap-11 gap-7 items-center">
      <div>
        <h5 className="sm:text-4xl text-2xl font-bold  dark:text-white text-dark">
          با ما در ارتباط باشید
        </h5>
      </div>
      <div className="flex container md:divide-x-2 max-md:divide-y-2 divide-primary max-md:flex-col justify-between">
        <ContactItem icon={EnvelopeIcon} title="ایمیل">
          <div className="flex flex-col gap-2.5">
            <Link
              className="dark:text-gray-lighter text-dark font-medium"
              href={`mailto:${saroojEmail}`}
            >
              {saroojEmail}
            </Link>
          </div>
        </ContactItem>
        <ContactItem icon={LocationIcon} title="ایمیل">
          <div className="flex flex-col items-center gap-2.5">
            <p className="max-sm:text-sm font-medium text-dark text-center dark:text-gray-lighter">
              {saroojAddress}
            </p>
          </div>
        </ContactItem>
        <ContactItem icon={CallIcon} title="ایمیل">
          <div className="flex flex-col gap-2.5">
            {phones?.map((item) => (
              <Link
                key={item}
                className="dark:text-gray-lighter text-dark font-medium"
                href={`tel:${item}`}
              >
                {item}
              </Link>
            ))}
          </div>
        </ContactItem>
      </div>
    </section>
  );
};

export default Contact;
