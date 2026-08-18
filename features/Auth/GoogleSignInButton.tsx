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
  const handleSuccess = async (
    credentialResponse: { credential?: string },
    provider: AuthIdentityProvider,
  ) => {
    if (!credentialResponse.credential) {
      console.error("Google did not return a credential");

      return;
    }

    const result = await loginWithProvider(
      credentialResponse.credential,
      provider,
    );

    if (result.user) {
      setUser(result.user);

      responseHandler.success(
        provider === AuthIdentityProvider.GOOGLE
          ? "ورود با گوگل با موفقیت انجام شد"
          : "ورود با فیس بوک با موفقیت انجام شد",
      );

      router.push(dashboardRoutes.dashboard());
    } else {
      responseHandler.fail("There is a proplem with the server. try later!");
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-medium bg-white font-phone">
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
          handleSuccess(
            {
              credential: credentialResponse.credential,
            },
            AuthIdentityProvider.GOOGLE,
          );
        }}
      />
    </div>
  );
}
