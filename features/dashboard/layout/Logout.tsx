import { logout } from "@/lib/actions/auth";
import { frontAuthRoutes } from "@/lib/routes/navigationRoutes";
import { useAuthStore } from "@/lib/stores/auth";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
    <Button onPress={handleLogout} color="danger" isLoading={isPending}>
      خروج
    </Button>
  );
}
