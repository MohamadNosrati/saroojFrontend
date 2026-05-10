import { CallIcon, EmailIcon, InstagramIcon, PhoneIcon } from "@/components/icons";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="bg-gray-darker lg:py-16 sm:py-12 py-8">
      <div className="container grid grid-cols-4 justify-between lg:gap-24 sm:gap-16 gap-8">
        <div className="flex flex-col gap-3.5 max-sm:items-center lg:col-span-1 sm:col-span-2 col-span-4 ">
          <Link href={persianRoutes.homePage()}>
            <Image src={Logo} alt="ساروج" />
          </Link>
          <p className="max-sm:text-sm  text-gray-lighter font-bold mt-1.5">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و{" "}
          </p>
        </div>
        <div className="flex flex-col gap-3.5 lg:col-span-1 sm:col-span-2 col-span-2">
          <span className="text-white-gray font-medium text-2xl">
            شبکه های اجتمایی
          </span>
          <div className="flex gap-2.5">
            {[1, 2, 3, 4]?.map((item) => (
              <Link href={""} key={item}>
                <InstagramIcon width={24} height={24} className="text-gray-lighter" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3.5 lg:col-span-1 sm:col-span-2 col-span-2">
          <span className="text-white-gray font-medium text-2xl">
            تماس با ما
          </span>
          <div className="flex gap-4 flex-col">
            {[1, 2, 3]?.map((item) => (
              <Link className="text-gray-lighter flex items-center gap-3 max-sm:text-sm font-bold" href={`tel:09120958305`} key={item}>
                <span>
                  <CallIcon width={24} height={24} className="dark:text-white" />
                </span>
                <span>
                  00123456789
                </span>

              </Link>
            ))}
            <Link className="max-sm:text-sm flex items-center gap-2.5  font-bold text-gray-lighter" href={"mailto:mohamadnosrtidev@gmail.com"}>

              <EmailIcon width={24} height={24} className="dark:text-white" />
              Example@gmail.com
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 lg:col-span-1 sm:col-span-2 col-span-4">
          <span className="text-white-gray font-medium text-2xl">آدرس </span>
          <p className="text-gray-lighter max-sm:text-sm font-bold">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
