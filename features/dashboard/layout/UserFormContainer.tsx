import { Modal, ModalContent, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "@/lib/hooks/user";
import { IUser } from "@/lib/types/user";
import { Dispatch, SetStateAction } from "react";

type TFormValues = {
  pictureId: string;
};

interface IProps {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserFormContainer({
  isOpen,
  onOpenChange,
  user,
  setUser,
}: IProps) {
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateUser();
  const { handleSubmit, control } = useForm<TFormValues>({
    defaultValues: {
      pictureId: "",
    },
    values: {
      pictureId: user?.pictureId?.id || "",
    },
  });
  const onSubmit = async (data: TFormValues) => {
    updateMutate(
      {
        id: user?.id as string,
        pictureId: data?.pictureId,
      },
      {
        onSuccess: ({ data }) => {
          console.log(data?.data?.pictureId);
          if (user !== null)
            [
              setUser({
                ...user,
                pictureId: data?.data?.pictureId,
              }),
              localStorage.setItem(
                String(process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY),
                JSON.stringify({
                  ...user,
                  pictureId: data?.data?.pictureId,
                }),
              ),
            ];
          responseHandler.success("اطلاعات کاریر با موفقیت ویرایش شد.");
          onOpenChange();
        },
      },
    );
  };
  return (
    <Modal
      dir="rtl"
      classNames={{
        base: "bg-gray font-yekan py-10",
      }}
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Controller
                control={control}
                name="pictureId"
                render={({ field: { value, onChange } }) => (
                  <CustomImageLoader
                    aspect={1}
                    htmlFor="userProfile"
                    value={value}
                    changeImageHandler={onChange}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                isLoading={isUpdatePending}
                fullWidth
                color="warning"
                className="font-bold"
                onPress={onClose}
              >
                ثبت
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
