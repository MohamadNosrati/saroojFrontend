import { uploadUrl } from "@/lib/tools/upload";
import Image from "next/image";
import { useDisclosure } from "@heroui/modal";
import UserFormContainer from "./UserFormContainer";
import { useAuthStore } from "@/lib/stores/auth";

export default function User() {
  const user = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-full size-24  bg-dark">
        <button onClick={onOpen} className="size-full relative rounded-full">
          {user?.pictureId?.image ? (
            <Image
              alt=""
              fill
              src={uploadUrl(user?.pictureId?.image)}
              className="rounded-full size-full"
            />
          ) : (
            <div className="size-full rounded-full flex justify-center items-center">
              <span className="text-primary font-bold">آپلود عکس</span>
            </div>
          )}
        </button>
        <UserFormContainer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          user={user}
        />
      </div>
      <div>
        <span className="text-white font-bold">{user?.userName}</span>
      </div>
    </div>
  );
}
