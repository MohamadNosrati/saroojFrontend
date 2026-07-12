"use client";
import { useDisclosure } from "@heroui/modal";
import { useRef, useState } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/blog/blogFormContainer";
import { useDeleteBlog, useGetBlog, useGetBlogs } from "@/lib/hooks/blog";
import { useTranslate } from "@/lib/hooks/translate";
import {
  ITranslatedBlogPayload,
  TBlogTranslatePayload,
} from "@/lib/types/blog";
import TranslateBlogFormContainer from "@/features/dashboard/blog/TranslateBlogFormContainer";

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

const BlogsPage = () => {
  const { data, isLoading } = useGetBlogs();
  const translateIdRef = useRef<string>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteCategory } = useDeleteBlog();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetBlog(editId);
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

  const translateHandler = (data: TBlogTranslatePayload) => {
    onOpenChange();
    onOpenChangeTranslator();
    translateMutate({
      title: data?.title as string,
      alt: data?.alt as string,
      description: data?.description as string,
    });
  };

  return (
    <CustomContainer className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-gray">لیست مقالات</h1>
        </div>
        <CustomModal
          buttonTitle="افزودن مقاله"
          isOpen={isOpen}
          modalTitle={
            editId ? `ویرایش مقاله ${editData?.data?.title}` : "ساخت مقاله"
          }
          onClose={handleModalClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        >
          <FormContainer
            blog={editData?.data}
            translateHandler={translateHandler}
            translateIdRef={translateIdRef}
          />
        </CustomModal>
        <CustomModal
          buttonTitle="ترجمه مقاله"
          hiddenButton={true}
          isOpen={isTranslatorOpen}
          modalTitle={
            editData ? `ترجمه مقاله ${editData?.data?.title}` : "ترجمه مقاله"
          }
          onClose={handleTranlateModalClose}
          onOpen={onOpenTranslator}
          onOpenChange={onOpenChangeTranslator}
        >
          <TranslateBlogFormContainer
            editId={editId as string}
            isPending={isTranslatePending}
            translateIdRef={translateIdRef}
            traslatedBlogPayload={
              translateData?.data?.data as ITranslatedBlogPayload
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
          items={data?.data?.result || []}
        />
      </div>
    </CustomContainer>
  );
};

export default BlogsPage;
