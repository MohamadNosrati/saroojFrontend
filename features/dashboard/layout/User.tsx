import Image from "next/image";
import { useDisclosure } from "@heroui/modal";

import UserFormContainer from "./UserFormContainer";

import { uploadUrl } from "@/lib/tools/upload";
import { useAuthStore } from "@/lib/stores/auth";

export default function User() {
  const user = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-full size-24  bg-dark">
        <button className="size-full relative rounded-full" onClick={onOpen}>
          {user?.pictureId?.image ? (
            <Image
              fill
              alt=""
              className="rounded-full size-full"
              src={uploadUrl(user?.pictureId?.image)}
            />
          ) : (
            <div className="size-full rounded-full flex justify-center items-center">
              <span className="text-primary font-bold">آپلود عکس</span>
            </div>
          )}
        </button>
        <UserFormContainer
          isOpen={isOpen}
          user={user}
          onOpenChange={onOpenChange}
        />
      </div>
      <div>
        <span className="text-white font-bold">{user?.userName}</span>
      </div>
    </div>
  );
}
