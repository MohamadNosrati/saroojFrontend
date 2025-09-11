"use client";
import { useState } from "react";
import { Button } from "@heroui/button";
import CustomInput from "@/components/ui/CustomInput";
import CustomContainer from "@/components/ui/CustomContainer";
import { useForm } from "react-hook-form";
import { authServices } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";

type TFormValues = {
  email: string;
  password: string;
};

const SiginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<TFormValues>();
  const onSubmit = async (data: TFormValues) => {
    try {
      setIsLoading(true);
      const res = await authServices.signin(data);
      if (res?.data?.data?.token) {
        localStorage.setItem("token", res?.data?.data?.token);
      }
      responseHandler.success(res.data?.message);
      router.push(dashboardRoutes.dashboard());
    } catch (error) {
      responseHandler.fail(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <CustomContainer>
        <h1 className="mb-10 text-center text-2xl font-black text-woodSmoke-950 dark:text-slate-300">
          ورود
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-96">
            <CustomInput
              {...register("email", {
                required: true,
              })}
              type="Email"
              placeholder="Email ..."
            />
          </div>
          <div className="w-96">
            <CustomInput
              {...register("password", {
                required: true,
              })}
              type="password"
              placeholder="Password ..."
            />
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            className="!mt-10 bg-sky-400 font-bold"
          >
            ورود
          </Button>
        </form>
      </CustomContainer>
    </div>
  );
};

export default SiginPage;
