"use client";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/sliders/SlidersFormContainer";
import {
  useDeleteSlider,
  useGetSlider,
  useGetSliders,
} from "@/lib/hooks/sliders";
import TranslateSliderFormContainer from "@/features/dashboard/sliders/TranslateSliderFormContainer";
import {
  ITranslatedSliderPayload,
  TSliderTranslatePayload,
} from "@/lib/types/slider";
import { useTranslate } from "@/lib/hooks/translate";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "غکس موبایل", uid: "mobilePictureId" },
  { name: "عنوان", uid: "title" },
  { name: "توضیحات عکس", uid: "alt" },
  { name: "لینک", uid: "link" },
  { name: "لینک انگلیسی", uid: "linkEn" },
  { name: "توضیحات", uid: "description" },
  { name: "وضعیت", uid: "isActive" },
  { name: "عنوان انگلیسی", uid: "titleEn" },
  { name: "توضیحات انگلیسی", uid: "descriptionEn" },
  { name: "توضیحات عکس انگلیسی", uid: "altEn" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "عملیات", uid: "actions" },
];

const SlidersPage = () => {
  const { data, isLoading } = useGetSliders();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isTranslatorOpen,
    onOpen: onOpenTranslator,
    onOpenChange: onOpenChangeTranslator,
  } = useDisclosure();
  const { isPending, mutate: deleteSlider } = useDeleteSlider();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetSlider(editId);
  const {
    mutate: translateMutate,
    isPending: isTranslatePending,
    data: translateData,
  } = useTranslate();

  const deleteHandler = (id: string) => {
    deleteSlider(id);
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

  const translateHandler = (data: TSliderTranslatePayload) => {
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
          <h1 className="text-2xl font-bold text-white-gray">
            لیست اسلایدر ها
          </h1>
        </div>
        <CustomModal
          buttonTitle="افزودن اسلایدر"
          isOpen={isOpen}
          modalTitle={
            editId ? `ویرایش اسلایدر ${editData?.data?.title}` : "ساخت اسلایدر"
          }
          onClose={handleModalClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        >
          <FormContainer
            translateHandler={translateHandler}
            slider={editData?.data}
          />
        </CustomModal>
        <CustomModal
          hiddenButton={true}
          buttonTitle="ترجمه اسلایدر"
          isOpen={isTranslatorOpen}
          modalTitle={
            editData
              ? `ترجمه اسلایدر ${editData?.data?.title}`
              : "ترجمه اسلایدر"
          }
          onClose={handleTranlateModalClose}
          onOpen={onOpenTranslator}
          onOpenChange={onOpenChangeTranslator}
        >
          <TranslateSliderFormContainer
            isPending={isTranslatePending}
            traslatedSliderPayload={
              translateData?.data?.data as ITranslatedSliderPayload
            }
            onOpenChangeTranslator={onOpenChangeTranslator}
            editId={editId as string}
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

export default SlidersPage;
