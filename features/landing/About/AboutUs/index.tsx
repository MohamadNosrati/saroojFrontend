// "use client";

import Image from "next/image";
// import { motion } from "framer-motion";
import StaticImage from "@/public/images/serviceImage.png";
import { saroojDescription } from "@/lib/constants/info";

const AboutUs = () => {
  return (
    <section className="bg-gray-darker py-12 sm:py-20 overflow-hidden">
      <div className="container flex md:flex-row flex-col items-center gap-8 md:gap-14">
        <div className="relative md:flex-2/5 lg:flex-1/3">
          <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl">
            <div>
              <Image
                alt="Sarooj Architecture"
                src={StaticImage}
                className="aspect-square object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 w-full md:flex-3/5 lg:flex-2/3">
          <h1 className="text-white text-2xl md:text-4xl font-bold max-md:text-center">
            درباره شرکت معماری
            <span className="text-primary mx-1 inline-block">ساروج</span>
          </h1>
          <p className="text-gray-lighter text-justify md:text-xl font-medium leading-9">
            {saroojDescription}
          </p>
          <div className="h-1 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
