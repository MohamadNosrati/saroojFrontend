"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { motion } from "framer-motion";

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
    console.log(formData);
    try {
      setIsPending(true);
      commentServices.create({
        email: formData?.email,
        fullName: formData?.fullname,
        text: formData?.text,
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
      className="flex-col bg-cover gap-y-14 lg:py-20 md:py-14 py-10 flex items-center dark:bg-dark bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      style={{
        backgroundImage: `url(${FormBg?.src})`,
      }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl -z-10"
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Title */}
      <motion.p
        className="dark:text-white text-dark text-center lg:text-xl font-bold text-base"
        initial={{
          opacity: 0,
          y: 25,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
      >
        اگر سوالی دارید <br />
        لطفا در ارسال پیام به ما تردید نکنید !
      </motion.p>

      <form
        className="container flex justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.div
          className="flex lg:w-2/3 sm:w-3/5 w-full flex-col items-center gap-5"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div className="w-full" variants={itemVariants}>
            <Controller
              control={control}
              name="fullname"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  fullWidth
                  classNames={{
                    inputWrapper:
                      "dark:bg-gray-darker rounded-none data-[hover=true]:dark:bg-gray-darker bg-gray-lighter data-[hover=true]:bg-gray-lighter text-gray-lighter font-medium",
                  }}
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  placeholder="نام و نام خانوادگی"
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </motion.div>

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
                      "dark:bg-gray-darker rounded-none data-[hover=true]:dark:bg-gray-darker bg-gray-lighter data-[hover=true]:bg-gray-lighter text-gray-lighter font-medium",
                  }}
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  placeholder="ایمیل"
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </motion.div>

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
                      "dark:bg-gray-darker rounded-none data-[hover=true]:dark:bg-gray-darker bg-gray-lighter data-[hover=true]:bg-gray-lighter text-gray-lighter font-medium",
                  }}
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  placeholder="متن پیام"
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <Button
              className="rounded-none font-bold max-sm:w-full"
              color="primary"
              isLoading={isPending}
              type="submit"
            >
              ارسال پیام
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Form;
