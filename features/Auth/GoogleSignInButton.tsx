"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import { loginWithProvider } from "@/lib/actions/auth";
import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import { useAuthStore } from "@/lib/stores/auth";
import { responseHandler } from "@/lib/tools/responseHandler";
import { AuthIdentityProvider } from "@/lib/types/auth";

export default function GoogleSignInButton() {
  const router = useRouter();
  const setUser = useAuthStore((store) => store.setUser);
  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) {
      console.error("Google did not return a credential");

      return;
    }

    const result = await loginWithProvider(
      credentialResponse.credential,
      AuthIdentityProvider.GOOGLE,
    );

    if (result.user) {
      setUser(result.user);

      responseHandler.success("ورود با گوگل با موفقیت انجام شد");

      router.push(dashboardRoutes.dashboard());
    } else {
      responseHandler.fail("There is a proplem with the server. try later!");
    }
  };

  return (
    <GoogleLogin
      shape="rectangular"
      size="large"
      text="continue_with"
      theme="outline"
      width="100%"
      onError={() => {
        responseHandler.fail("Google login failed");
      }}
      onSuccess={(credentialResponse) => {
        if (!credentialResponse.credential) {
          return;
        }
        handleSuccess({
          credential: credentialResponse.credential,
        });
      }}
    />
  );
}
