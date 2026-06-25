import Image from "next/image";
import { useDisclosure } from "@heroui/modal";

import UserFormContainer from "./UserFormContainer";

import { uploadUrl } from "@/lib/tools/upload";
import { useAuthStore } from "@/lib/stores/auth";

export default function User() {
  const user = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center gap-4 group">
      <div className="relative rounded-full size-14 bg-slate-800 ring-2 ring-slate-700/50 hover:ring-primary/50 transition-all duration-300 shadow-md">
        <button
          className="size-full relative rounded-full overflow-hidden flex justify-center items-center group/avatar focus:outline-none"
          onClick={onOpen}
        >
          {user?.pictureId?.image ? (
            <>
              <Image
                fill
                alt={user?.userName || "User avatar"}
                className="rounded-full object-cover size-full group-hover/avatar:scale-110 transition-transform duration-300"
                src={uploadUrl(user?.pictureId?.image)}
              />
              {/* Subtle dark overlay on hover */}
              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-[10px] text-slate-200 font-medium">
                  تغییر
                </span>
              </div>
            </>
          ) : (
            <div className="size-full rounded-full flex justify-center items-center bg-slate-800 hover:bg-slate-700/80 transition-colors duration-200">
              <span className="text-primary text-xs font-bold">آپلود عکس</span>
            </div>
          )}
        </button>

        <UserFormContainer
          isOpen={isOpen}
          user={user}
          onOpenChange={onOpenChange}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-slate-100 font-bold text-sm tracking-wide group-hover:text-primary transition-colors duration-200">
          {user?.userName}
        </span>
        <span className="text-slate-400 text-xs font-medium">خوش آمدید</span>
      </div>
    </div>
  );
}
