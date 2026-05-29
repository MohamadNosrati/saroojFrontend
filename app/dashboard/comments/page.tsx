"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/comments/CommentFormContainer";
import {
  useDeleteComment,
  useGetComment,
  useGetComments,
} from "@/lib/hooks/comments";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

const columns = [
  { name: "نام", uid: "fullName" },
  { name: "وضعیت", uid: "isActive" },
  { name: "متن", uid: "text" },
  { name: "ایمیل", uid: "email" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "عملیات", uid: "actions" },
];

const CommentsPage = () => {
  const { data, isLoading } = useGetComments();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteComment } = useDeleteComment();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetComment(editId);

  const deleteHandler = (id: string) => {
    deleteComment(id);
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
          <h1 className="text-2xl font-bold text-white-gray">لیست نظرات</h1>
        </div>
        <CustomModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={handleModalClose}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن نظر"
          modalTitle={
            editId ? `ویرایش نظر ${editData?.data?.title}` : "ساخت نظر"
          }
        >
          <></>
          <FormContainer onOpenChage={onOpenChange} comment={editData?.data} />
        </CustomModal>
      </div>
      <div className="bg-component-base-2 rounded-2xl">
        <CustomTable
          isLoading={isLoading}
          isPending={isPending}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          items={data?.data || []}
          columns={columns}
        />
      </div>
    </CustomContainer>
  );
};

export default CommentsPage;
