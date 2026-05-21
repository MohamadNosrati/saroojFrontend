"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/categories/CategoryFormContainer";
import { useDeleteCategory, useGetCategories } from "@/lib/hooks/categories";
import { ICategory } from "@/lib/types/categories";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

const columns = [
  { name: "عکس", uid: "image" },
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
  const [editData, setEditData] = useState<ICategory | undefined>(undefined);
  const { isPending, mutate: deleteCategory } = useDeleteCategory();
  const deleteHandler = (id: string) => {
    deleteCategory(id);
  };
  return (
    <CustomContainer className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-gray">
            لیست دسته بندی ها
          </h1>
        </div>
        <CustomModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن دسته بندی"
          modalTitle={
            editData ? `ویرایش دسته بندی ${editData?.title}` : "ساخت دسته بندی"
          }
        >
          <FormContainer category={editData} />
        </CustomModal>
      </div>
      <div className="bg-component-base-2 rounded-2xl">
        <CustomTable
          isPending={isPending}
          deleteHandler={deleteHandler}
          items={data?.data || []}
          columns={columns}
        />
      </div>
    </CustomContainer>
  );
};

export default CategoriesPage;
