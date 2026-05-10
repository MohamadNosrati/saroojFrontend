import { EnvelopeIcon,CallIcon,LocationIcon } from "@/components/icons";
import Link from "next/link";
import ContactItem from "./ContactItem";

const Contact = () => {
  return (
    <section className="sm:pt-5 sm:pb-12 dark:bg-dark bg-white flex flex-col md:gap-11 gap-7 items-center">
      <div>
        <h5 className="sm:text-4xl text-2xl font-bold  dark:text-white text-dark">با ما در ارتباط باشید</h5>
      </div>
      <div className="flex container md:divide-x-2 max-md:divide-y-2 divide-primary max-md:flex-col justify-between">
        <ContactItem title="ایمیل" icon={EnvelopeIcon}>
        <div className="flex flex-col gap-2.5">
            <Link className="dark:text-gray-lighter text-dark font-medium" href={`mailto:mohamadnosratidev@gmail.com`}>
              Example@gmail.com
            </Link>
            <Link className="dark:text-gray-lighter text-dark font-medium" href={`mailto:mohamadnosratidev@gmail.com`}>
              Example@gmail.com
            </Link>
          </div>
        </ContactItem>
        <ContactItem title="ایمیل" icon={LocationIcon}>
        <div className="flex flex-col items-center gap-2.5">
          <p className="max-sm:text-sm font-medium text-dark text-center dark:text-gray-lighter">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor atque vero delectus saepe animi sint ad debitis aspernatur cupiditate a! Amet quam doloremque tempora nam. Accusamus quas neque atque suscipit.
          </p>
          </div>
        </ContactItem>
        <ContactItem title="ایمیل" icon={CallIcon}>
        <div className="flex flex-col gap-2.5">
            <Link className="dark:text-gray-lighter text-dark font-medium" href={"tel:09120958305"}>
            09120958305
            </Link>
            <Link className="dark:text-gray-lighter text-dark font-medium" href={"tel:09120958305"}>
            09120958305
            </Link>
          </div>
        </ContactItem>
        {/* <div className="flex flex-col items-center flex-1/3 pb-12 px-12 pt-2.5">
          <span>
            <EnvelopeIcon className="text-primary" width={60} height={48} />
          </span>
          <span className="text-primary block text-2xl  mt-6 mb-4  font-semibold">
            Email
          </span>
          <div className="flex flex-col gap-2.5">
            <Link className="text-gray-lighter font-medium" href={""}>
              Example@gmail.com
            </Link>
            <Link className="text-gray-lighter font-medium" href={""}>
              Example@gmail.com
            </Link>
          </div>
        </div>
        <div className="flex flex-col border-x-2 border-primary items-center flex-1/3 pb-12 px-12 pt-2.5">
          <span>
            <EnvelopeIcon className="text-primary" width={60} height={48} />
          </span>
          <span className="text-primary block text-2xl  mt-6 mb-4  font-semibold">
            Address
          </span>
          <div className="flex flex-col gap-2.5">
            <p className="text-gray-lighter line-clamp-2 font-medium text-center">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Aenean{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center flex-1/3 pb-12 px-12 pt-2.5">
          <span>
            <EnvelopeIcon className="text-primary" width={60} height={48} />
          </span>
          <span className="text-primary block text-2xl  mt-6 mb-4  font-semibold">
            Email
          </span>
          <div className="flex flex-col gap-2.5">
            <Link className="text-gray-lighter font-medium" href={""}>
              00123456789{" "}
            </Link>
            <Link className="text-gray-lighter font-medium" href={""}>
              00123456789{" "}
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
