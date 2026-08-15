"use client";

import { loginWithProvider, ProviderLoginState } from "@/lib/actions/auth";
import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import { useAuthStore } from "@/lib/stores/auth";
import { responseHandler } from "@/lib/tools/responseHandler";
import { AuthIdentityProvider } from "@/lib/types/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

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
    }

    responseHandler.success("ورود با گوگل با موفقیت انجام شد");

    router.push(dashboardRoutes.dashboard());
  };
  return (
    <GoogleLogin
      theme="outline"
      size="large"
      shape="rectangular"
      text="continue_with"
      width="100%"
      onSuccess={(credentialResponse) => {
        if (!credentialResponse.credential) {
          return;
        }
        handleSuccess({
          credential: credentialResponse.credential,
        });
      }}
      onError={() => {
        responseHandler.fail("Google login failed");
      }}
    />
  );
}
