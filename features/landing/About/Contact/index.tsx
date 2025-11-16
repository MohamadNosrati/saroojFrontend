import { EnvelopeIcon } from "@/components/icons";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="py-5 bg-black">
      <div className="flex container justify-between">
        <div className="flex flex-col items-center flex-1/3 pb-12 px-12 pt-2.5">
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
