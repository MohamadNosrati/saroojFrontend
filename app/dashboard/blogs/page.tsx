"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/blog/blogFormContainer";
import { useDeleteBlog, useGetBlog, useGetBlogs } from "@/lib/hooks/blog";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "عنوان", uid: "title" },
  { name: "توضیحات عکس", uid: "alt" },
  { name: "وضعیت", uid: "isActive" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "عملیات", uid: "actions" },
];

const BlogsPage = () => {
  const { data, isLoading } = useGetBlogs();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteCategory } = useDeleteBlog();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetBlog(editId);

  const deleteHandler = (id: string) => {
    deleteCategory(id);
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
          <h1 className="text-2xl font-bold text-white-gray">لیست مقالات</h1>
        </div>
        <CustomModal
          onClose={handleModalClose}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن مقاله"
          modalTitle={
            editId ? `ویرایش مقاله ${editData?.data?.title}` : "ساخت مقاله"
          }
        >
          <FormContainer onOpenChage={onOpenChange} blog={editData?.data} />
        </CustomModal>
      </div>
      <div className="bg-component-base-2 rounded-2xl">
        <CustomTable
          isLoading={isLoading}
          isPending={isPending}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          items={data?.data?.result || []}
          columns={columns}
        />
      </div>
    </CustomContainer>
  );
};

export default BlogsPage;
