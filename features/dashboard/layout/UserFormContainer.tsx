import { Modal, ModalContent, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Controller, useForm } from "react-hook-form";

import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useUpdateUser } from "@/lib/hooks/user";
import { IUser } from "@/lib/types/user";
import { useAuthStore } from "@/lib/stores/auth";

type TFormValues = {
  pictureId: string;
};

interface IProps {
  user: IUser | undefined;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserFormContainer({
  isOpen,
  onOpenChange,
  user,
}: IProps) {
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateUser();
  const setUser = useAuthStore((store) => store.setUser);
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
          if (user) {
            setUser({
              ...user,
              pictureId: data?.data?.pictureId,
            });
          }

          responseHandler.success("اطلاعات کاریر با موفقیت ویرایش شد.");
          onOpenChange();
        },
      },
    );
  };

  return (
    <Modal
      classNames={{
        base: "bg-gray font-yekan py-10",
      }}
      dir="rtl"
      isOpen={isOpen}
      size="lg"
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
                    changeImageHandler={onChange}
                    htmlFor="userProfile"
                    value={value}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                className="font-bold"
                color="warning"
                isLoading={isUpdatePending}
                type="submit"
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
