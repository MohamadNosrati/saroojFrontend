"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

import CustomInput from "@/components/ui/CustomInput";
import CustomContainer from "@/components/ui/CustomContainer";
import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";
import { login, LoginState } from "@/lib/actions/auth";
import { useAuthStore } from "@/lib/stores/auth";

const SiginPage = () => {
  const router = useRouter();
  const { pending } = useFormStatus();
  const setUser = useAuthStore((store) => store.setUser);
  const [state, formAction] = useActionState<LoginState, FormData>(login, {
    errors: {},
  });

  useEffect(() => {
    if (state.success) {
      if (state.user) {
        setUser(state.user);
      }

      responseHandler.success("ورود با موفقیت انجام شد");
      router?.push(dashboardRoutes.dashboard());
    }
    if (state.errors?._form?.length) {
      responseHandler.fail(state.errors?._form[0]);
    }
  }, [router, setUser, state.errors?._form, state.success, state.user]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-950 antialiased select-none px-4">
      {/* Ambient background glow behind the card */}
      <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <CustomContainer className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl shadow-black/60">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-center text-2xl font-extrabold text-slate-100 tracking-wide">
            ورود به حساب کاربری
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            لطفاً اطلاعات خود را جهت ورود وارد نمایید
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {/* Email Input Field */}
          <div className="w-full">
            <CustomInput
              className="w-full text-left"
              dir="ltr"
              errorMessage={state?.errors?.email ? state.errors.email[0] : ""}
              isInvalid={Boolean(state?.errors?.email)}
              name="email"
              placeholder="Email Address"
              type="email"
            />
          </div>

          {/* Password Input Field */}
          <div className="w-full">
            <CustomInput
              className="w-full text-left"
              dir="ltr"
              errorMessage={
                state?.errors?.password ? state.errors.password[0] : ""
              }
              isInvalid={Boolean(state?.errors?.password)}
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>

          {/* Submit Action Button */}
          <Button
            fullWidth
            className="h-12 !mt-8 bg-primary text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] transition-all duration-200"
            isLoading={pending}
            type="submit"
          >
            ورود
          </Button>
        </form>
      </CustomContainer>
    </div>
  );
};

export default SiginPage;
