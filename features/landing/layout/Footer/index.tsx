import Image from "next/image";
import Link from "next/link";

import { CallIcon, EmailIcon, InstagramIcon, SaroojIcon } from "@/components/icons";
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
    <section className="bg-gray-darker lg:py-16 sm:py-12 py-8">
      <div className="container grid grid-cols-4 justify-between lg:gap-24 sm:gap-16 gap-8">
        <div className="flex flex-col gap-3.5 max-sm:items-center lg:col-span-1 sm:col-span-2 col-span-4 ">
          <Link href={persianRoutes.homePage()}>
            <SaroojIcon className="sm:w-24 h-12 text-white" />
          </Link>
          <p className="max-sm:text-sm  text-gray-lighter font-bold mt-1.5">
            {saroojDescription.substring(0, 98)}
          </p>
        </div>
        <div className="flex flex-col gap-3.5 lg:col-span-1 sm:col-span-2 col-span-2">
          <span className="text-white-gray font-medium text-2xl">
            شبکه های اجتمایی
          </span>
          <div className="flex gap-2.5">
            <Link href={saroojInstagram}>
              <InstagramIcon
                className="text-gray-lighter"
                height={24}
                width={24}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 lg:col-span-1 sm:col-span-2 col-span-2">
          <span className="text-white-gray font-medium text-2xl">
            تماس با ما
          </span>
          <div className="flex gap-4 flex-col">
            {phones?.map((item) => (
              <Link
                key={item}
                className="text-gray-lighter flex items-center gap-3 max-sm:text-sm font-bold"
                href={`tel:${item}`}
              >
                <span>
                  <CallIcon
                    className="dark:text-white"
                    height={24}
                    width={24}
                  />
                </span>
                <span>{item}</span>
              </Link>
            ))}
            <Link
              className="max-sm:text-sm flex items-center gap-2.5  font-bold text-gray-lighter"
              href={`mailto:${saroojEmail}`}
            >
              <EmailIcon className="dark:text-white min-w-6" height={24} width={24} />
              {saroojEmail}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 lg:col-span-1 sm:col-span-2 col-span-4">
          <span className="text-white-gray font-medium text-2xl">آدرس </span>
          <p className="text-gray-lighter max-sm:text-sm font-bold">
            {saroojAddress}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
