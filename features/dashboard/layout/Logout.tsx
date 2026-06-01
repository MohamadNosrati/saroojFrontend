import { logout } from "@/lib/actions/auth";
import { frontAuthRoutes } from "@/lib/routes/navigationRoutes";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout();

      if (result.success) {
        // Clear localStorage
        localStorage.removeItem(
          String(process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY),
        );

        // Redirect
        router.push(frontAuthRoutes.signIn());
      }
    });
  };
  return (
    <Button onPress={handleLogout} color="danger">
      خروج
    </Button>
  );
}
