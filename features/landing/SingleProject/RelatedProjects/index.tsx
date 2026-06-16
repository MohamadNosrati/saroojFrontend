"use client";

import { IProject } from "@/lib/types/project";
import RelatedProjectsContainer from "./Container";
import { motion } from "framer-motion";

interface IProps {
  suggsetions: IProject[];
}

export default function RelatedProjects({ suggsetions }: IProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b dark:bg-dark bg-white from-primary/20 via-primary/10 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
      {/* Background glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
      </motion.div>

      <div className="container relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <motion.span
            whileInView={{ scale: [0.95, 1.05, 1] }}
            transition={{ duration: 0.6 }}
            className="sm:text-2xl text-lg font-bold inline-block"
          >
            پروژه های پیشنهادی
          </motion.span>

          {/* underline animation */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-primary mt-2 rounded-full"
          />
        </motion.div>

        {/* Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="hover:scale-[1.01] transition-transform duration-300"
        >
          <RelatedProjectsContainer suggsetions={suggsetions} />
        </motion.div>
      </div>
    </section>
  );
}
