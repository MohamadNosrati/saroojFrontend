import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { logout } from "@/lib/actions/auth";
import { frontAuthRoutes } from "@/lib/routes/navigationRoutes";
import { useAuthStore } from "@/lib/stores/auth";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const clearUser = useAuthStore((store) => store.clearUser);

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout();

      if (result.success) {
        clearUser();
        router.push(frontAuthRoutes.signIn());
      }
    });
  };

  return (
    <Button color="danger" isLoading={isPending} onPress={handleLogout}>
      خروج
    </Button>
  );
}
