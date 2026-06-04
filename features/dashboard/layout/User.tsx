import { uploadUrl } from "@/lib/tools/upload";
import { IUser } from "@/lib/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "@/lib/hooks/user";
import UserFormContainer from "./UserFormContainer";



export default function User() {
  const [user, setUser] = useState<IUser | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(
        localStorage.getItem(
          String(process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY),
        ) as string,
      );
      setUser(data as IUser);
    }
  }, []);



  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-full size-24  bg-dark">
        <button onClick={onOpen} className="size-full relative rounded-full">
          {user?.pictureId?.image ? (
            <Image alt="" fill src={uploadUrl(user?.pictureId?.image)} className="rounded-full size-full" />
          ) : (
            <div className="size-full rounded-full flex justify-center items-center">
              <span className="text-primary font-bold">آپلود عکس</span>
            </div>
          )}
        </button>
        <UserFormContainer isOpen={isOpen} onOpenChange={onOpenChange} setUser={setUser} user={user}/>
      </div>
      <div>
        <span className="text-white font-bold">{user?.userName}</span>
      </div>
    </div>
  );
}
