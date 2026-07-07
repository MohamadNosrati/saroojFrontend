"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-default-50">
      <div className="max-w-xl w-full text-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error Code */}
          <motion.h1
            animate={{ scale: 1 }}
            className="text-8xl md:text-9xl font-black text-primary/15"
            initial={{ scale: 0.8 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 120,
            }}
          >
            500
          </motion.h1>

          {/* Floating Circle */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            className="mx-auto -mt-10 mb-8 w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! Something went wrong
          </h2>

          <p className="text-default-500 text-lg leading-relaxed max-w-md mx-auto">
            An unexpected error occurred while loading this page. Please try
            again or return to the homepage.
          </p>

          <motion.div
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              className="font-medium px-8"
              color="primary"
              radius="full"
              size="lg"
              onPress={() => {
                window.location.reload();
              }}
            >
              Try Again
            </Button>

            <Button
              as="a"
              className="font-medium"
              href="/"
              radius="full"
              size="lg"
              variant="bordered"
            >
              Back to Home
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Blurs */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 blur-3xl rounded-full" />
        </div>
      </div>
    </div>
  );
}
