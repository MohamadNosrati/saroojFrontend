import { IUser } from "@/lib/types/user";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem(String(process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY)) as string));
    }
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-full size-20 bg-red-400"></div>
      <div>
        <span>{user?.userName}</span>
      </div>
    </div>
  );
}
