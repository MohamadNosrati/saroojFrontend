"use client";

import { motion } from "framer-motion";

import { IProject } from "@/lib/types/project";

import RelatedProjectsContainer from "./Container";

interface IProps {
  suggsetions: IProject[];
}

export default function RelatedProjects({ suggsetions }: IProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b dark:bg-dark bg-white from-primary/20 via-primary/10 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
      {/* Background glow */}
      <motion.div
        aria-hidden
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        className="absolute inset-0 pointer-events-none"
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
          className="mb-4"
          initial={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.span
            className="sm:text-2xl text-lg font-bold inline-block"
            transition={{ duration: 0.6 }}
            whileInView={{ scale: [0.95, 1.05, 1] }}
          >
            پروژه های پیشنهادی
          </motion.span>

          {/* underline animation */}
          <motion.div
            className="h-1 bg-primary mt-2 rounded-full"
            initial={{ width: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ width: "120px" }}
          />
        </motion.div>

        {/* Container */}
        <motion.div
          className="hover:scale-[1.01] transition-transform duration-300"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <RelatedProjectsContainer suggsetions={suggsetions} />
        </motion.div>
      </div>
    </section>
  );
}
