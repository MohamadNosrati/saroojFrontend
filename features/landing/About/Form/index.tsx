"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import FormBg from "@/public/images/formBg.png";
import { responseHandler } from "@/lib/tools/responseHandler";
import { commentServices } from "@/lib/services/comments";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const commentSchema = z.object({
  email: z
    .email("لطفا فرمت صحیح ایمیل را وارد کنید.")
    .min(1, "ایمیل اجباری است."),
  fullname: z
    .string("نام و نام خانوادگی اجباری است.")
    .min(1, "نام و نام خانوادگی اجباری است."),
  text: z.string("پر کردن پیام اجباری است.").min(1, "پر کردن پیام اجباری است."),
});

type TFormValues = {
  fullname: string;
  text: string;
  email: string;
};

const Form = () => {
  const t = useTranslations("About.form");
  const [isPending, setIsPending] = useState(false);
  const { control, handleSubmit, reset } = useForm<TFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      email: "",
      fullname: "",
      text: "",
    },
  });

  const onSubmit = async (formData: TFormValues) => {
    try {
      setIsPending(true);
      commentServices.create({
        email: formData?.email,
        fullName: formData?.fullname,
        text: formData?.text,
        type: "persian",
      });
      responseHandler.success("پیام با موفقیت ارسال شد.");
      reset();
    } catch (error) {
      console.log(error);
      responseHandler.fail("مشکلی پیش آمده است.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <motion.div
      className="flex-col bg-cover bg-center gap-y-14 lg:py-24 md:py-16 py-12 flex items-center dark:bg-dark bg-slate-50 relative overflow-hidden border-y border-gray-100 dark:border-white/[0.03]"
      initial={{ opacity: 0 }}
      style={{
        backgroundImage: `url(${FormBg?.src})`,
      }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      {/* Background Dark/Light Overlay for better readability over the image */}
      <div className="absolute inset-0 bg-white/40 dark:bg-dark/60 pointer-events-none mix-blend-multiply" />

      {/* Enhanced Animated Ambient Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Title & Underline */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        <motion.p
          className="dark:text-white text-dark text-center lg:text-2xl md:text-xl font-black text-base leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t("firstTitle")}
          <br />
          {t("secondTitle")}
        </motion.p>

        {/* Sleek Decorative Line Under Title */}
        <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
      </div>

      <form
        className="container flex justify-center relative z-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.div
          className="flex lg:w-2/3 sm:w-3/5 w-full flex-col items-center gap-6 max-w-xl"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {/* Full Name Input */}
          <motion.div className="w-full" variants={itemVariants}>
            <Controller
              control={control}
              name="fullname"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  // dir={locale === "fa" ? "rtl" : "ltr"}
                  fullWidth
                  classNames={{
                    inputWrapper:
                      "dark:bg-gray-darker/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 data-[hover=true]:border-primary/50 focus-within:!border-primary shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] bg-white text-gray-800 dark:text-white font-medium transition-all duration-300 h-14 px-5",
                    input:
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm",
                  }}
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  placeholder={t("fullName")}
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </motion.div>

          {/* Email Input */}
          <motion.div className="w-full" variants={itemVariants}>
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  fullWidth
                  classNames={{
                    inputWrapper:
                      "dark:bg-gray-darker/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 data-[hover=true]:border-primary/50 focus-within:!border-primary shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] bg-white text-gray-800 dark:text-white font-medium transition-all duration-300 h-14 px-5",
                    input:
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm ltr",
                  }}
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  placeholder={t("email")}
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </motion.div>

          {/* Message Text Input */}
          <motion.div className="w-full" variants={itemVariants}>
            <Controller
              control={control}
              name="text"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  fullWidth
                  classNames={{
                    inputWrapper:
                      "dark:bg-gray-darker/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 data-[hover=true]:border-primary/50 focus-within:!border-primary shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] bg-white text-gray-800 dark:text-white font-medium transition-all duration-300 h-14 px-5",
                    input:
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm",
                  }}
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  placeholder={t("text")}
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="w-full sm:w-auto mt-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="rounded-xl font-extrabold px-12 h-13 shadow-lg shadow-primary/20 dark:shadow-primary/10 hover:shadow-primary/30 text-sm tracking-wider w-full sm:w-auto bg-primary text-white transition-all duration-300"
              isLoading={isPending}
              type="submit"
            >
              {t("Button")}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Form;
