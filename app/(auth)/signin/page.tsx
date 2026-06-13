"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/button";
import CustomInput from "@/components/ui/CustomInput";
import CustomContainer from "@/components/ui/CustomContainer";
import { useRouter } from "next/navigation";
import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useFormStatus } from "react-dom";
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
    <div className="min-h-screen flex justify-center items-center">
      <CustomContainer>
        <h1 className="mb-10 text-center text-2xl font-black text-woodSmoke-950 dark:text-slate-300">
          ورود
        </h1>
        <form action={formAction} className="space-y-4">
          <div className="w-96">
            <CustomInput
              isInvalid={Boolean(state?.errors?.email)}
              errorMessage={state?.errors?.email ? state.errors.email[0] : ""}
              name="email"
              placeholder="Email ..."
            />
          </div>
          <div className="w-96">
            <CustomInput
              isInvalid={Boolean(state?.errors?.password)}
              errorMessage={
                state?.errors?.password ? state.errors.password[0] : ""
              }
              name="password"
              type="password"
              placeholder="Password ..."
            />
          </div>
          <Button
            type="submit"
            isLoading={pending}
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
