// lib/hooks/useAuthSuccess.ts

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/stores/auth";
import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";
import { IUser } from "../types/user";

type AuthResult = {
  success?: boolean;
  user?: IUser;
  errors?: {
    _form?: string[];
  };
};

export function useAuthResult(result: AuthResult, successMessage: string) {
  const router = useRouter();
  const setUser = useAuthStore((store) => store.setUser);

  useEffect(() => {
    if (result.success) {
      if (result.user) {
        setUser(result.user);
      }
      responseHandler.success(successMessage);

      router.push(dashboardRoutes.dashboard());

      return;
    }

    if (result.errors?._form?.length) {
      responseHandler.fail(result.errors._form[0]);
    }
  }, [
    result.success,
    result.user,
    result.errors?._form,
    successMessage,
    setUser,
    router,
  ]);
}
