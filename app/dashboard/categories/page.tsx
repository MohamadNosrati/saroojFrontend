"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/categories/CategoryFormContainer";
import {
  useDeleteCategory,
  useGetCategories,
  useGetCategory,
} from "@/lib/hooks/categories";
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

const CategoriesPage = () => {
  const { data, isLoading } = useGetCategories();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteCategory } = useDeleteCategory();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetCategory(editId);

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
          <h1 className="text-2xl font-bold text-white-gray">
            لیست دسته بندی ها
          </h1>
        </div>
        <CustomModal
          isOpen={isOpen}
          onClose={handleModalClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن دسته بندی"
          modalTitle={
            editId
              ? `ویرایش دسته بندی ${editData?.data?.title}`
              : "ساخت دسته بندی"
          }
        >
          <FormContainer onOpenChage={onOpenChange} category={editData?.data} />
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

export default CategoriesPage;
