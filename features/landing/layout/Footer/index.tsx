import { InstagramIcon } from "@/components/icons";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="bg-gray-darker py-16">
      <div className="container flex justify-between gap-24">
        <div className="flex-1/4 flex flex-col gap-3.5">
          <Image src={Logo} alt="ساروج" />

          <p className="text-sm">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و{" "}
          </p>
        </div>
        <div className="flex-1/4 flex flex-col gap-3.5">
          <span className="text-white-gray font-medium text-2xl">
            شبکه های اجتمایی
          </span>
          <div className="flex gap-2.5">
            {[1, 2, 3, 4]?.map((item) => (
              <Link href={""} key={item}>
                <InstagramIcon width={24} height={24} className="text-white" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1/4 flex flex-col gap-3.5">
          <span className="text-white-gray font-medium text-2xl">
            تماس با ما
          </span>
          <div className="flex gap-2.5  flex-col">
            {[1, 2, 3]?.map((item) => (
              <Link href={""} key={item}>
                00123456789
              </Link>
            ))}
            <Link className="" href={""}>
              Example@gmail.com
            </Link>
          </div>
        </div>
        <div className="flex-1/4 flex flex-col gap-3.5">
          <span className="text-white-gray font-medium text-2xl">آدرس </span>
          <p className="text-white-gray text-sm font-medium">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
