"use client";
import { useDisclosure } from "@heroui/modal";
import { useRef, useState } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/categories/CategoryFormContainer";
import {
  useDeleteCategory,
  useGetCategories,
  useGetCategory,
} from "@/lib/hooks/categories";
import {
  ITranslatedCategoryPayload,
  TCategoryTranslatePayload,
} from "@/lib/types/categories";
import { useTranslate } from "@/lib/hooks/translate";
import TranslateCategoryFormContainer from "@/features/dashboard/categories/TranslateCategoryFormContainer";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "عنوان", uid: "title" },
  { name: "توضیحات عکس", uid: "alt" },
  { name: "وضعیت", uid: "isActive" },
  { name: "عنوان انگلیسی", uid: "titleEn" },
  { name: "توضیحات انگلیسی", uid: "descriptionEn" },
  { name: "توضیحات عکس انگلیسی", uid: "altEn" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "عملیات", uid: "actions" },
];

const CategoriesPage = () => {
  const { data, isLoading } = useGetCategories();
  const translateIdRef = useRef<string>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteCategory } = useDeleteCategory();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetCategory(editId);
  const {
    isOpen: isTranslatorOpen,
    onOpen: onOpenTranslator,
    onOpenChange: onOpenChangeTranslator,
  } = useDisclosure();
  const {
    mutate: translateMutate,
    isPending: isTranslatePending,
    data: translateData,
  } = useTranslate();

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
  const handleTranlateModalClose = () => {
    setEditId(undefined);
    onOpenChangeTranslator();
  };

  const translateHandler = (data: TCategoryTranslatePayload) => {
    onOpenChange();
    onOpenChangeTranslator();
    translateMutate(data);
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
          buttonTitle="افزودن دسته بندی"
          isOpen={isOpen}
          modalTitle={
            editId
              ? `ویرایش دسته بندی ${editData?.data?.title}`
              : "ساخت دسته بندی"
          }
          onClose={handleModalClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        >
          <FormContainer
            category={editData?.data}
            translateHandler={translateHandler}
            translateIdRef={translateIdRef}
          />
        </CustomModal>
        <CustomModal
          buttonTitle="ترجمه اسلایدر"
          hiddenButton={true}
          isOpen={isTranslatorOpen}
          modalTitle={
            editData
              ? `ترجمه دسته بندی ${editData?.data?.title}`
              : "ترجمه دسته بندی"
          }
          onClose={handleTranlateModalClose}
          onOpen={onOpenTranslator}
          onOpenChange={onOpenChangeTranslator}
        >
          <TranslateCategoryFormContainer
            editId={editId as string}
            isPending={isTranslatePending}
            setEditId={setEditId}
            translateIdRef={translateIdRef}
            traslatedCategoryPayload={
              translateData?.data?.data as ITranslatedCategoryPayload
            }
            onOpenChangeTranslator={onOpenChangeTranslator}
          />
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

export default CategoriesPage;
