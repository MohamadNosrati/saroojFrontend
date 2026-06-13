"use client";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/teamates/TeamateFormContainer";
import {
  useDeleteTeamate,
  useGetTeamate,
  useGetTemates,
} from "@/lib/hooks/temates";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "عنوان", uid: "title" },
  { name: "موقعیت", uid: "position" },
  { name: "توضیحات عکس", uid: "alt" },
  { name: "وضعیت", uid: "isActive" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "عملیات", uid: "actions" },
];

const TematesPage = () => {
  const { data, isLoading } = useGetTemates();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteTemate } = useDeleteTeamate();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetTeamate(editId);

  const deleteHandler = (id: string) => {
    deleteTemate(id);
  };
  const editHandler = (id: string) => {
    onOpenChange();
    setEditId(id);
  };

  const handleModalClose = () => {
    setEditId(undefined);
    onOpenChange();
  };

  return (
    <CustomContainer className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-gray">لیست اعضای تیم</h1>
        </div>
        <CustomModal
          buttonTitle="افزودن عضو تیم"
          isOpen={isOpen}
          modalTitle={
            editId ? `ویرایش عضو تیم ${editData?.data?.title}` : "ساخت عضو تیم"
          }
          onClose={handleModalClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        >
          <FormContainer teamate={editData?.data} onOpenChage={onOpenChange} />
        </CustomModal>
      </div>
      <div className="bg-component-base-2 rounded-2xl">
        <CustomTable
          columns={columns}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          isLoading={isLoading}
          isPending={isPending}
          items={data?.data || []}
        />
      </div>
    </CustomContainer>
  );
};

export default TematesPage;
