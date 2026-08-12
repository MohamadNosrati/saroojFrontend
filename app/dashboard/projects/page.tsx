"use client";
import { useDisclosure } from "@heroui/modal";
import { useRef, useState } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/projects/ProjectsFormContainer";
import {
  useDeleteProject,
  useGetProject,
  useGetProjects,
} from "@/lib/hooks/projects";
import { useTranslate } from "@/lib/hooks/translate";
import {
  IProject,
  ITranslatedProjectPayload,
  TProjectTranslatePayload,
} from "@/lib/types/project";
import TranslateProjectFormContainer from "@/features/dashboard/projects/TranslateProjectFormConainer";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "عنوان", uid: "title" },
  { name: "توضیحات عکس", uid: "alt" },
  { name: "وضعیت", uid: "isActive" },
  { name: "وضعیت", uid: "isActive" },
  { name: "عنوان انگلیسی", uid: "titleEn" },
  { name: "توضیحات انگلیسی", uid: "descriptionEn" },
  { name: "توضیحات عکس انگلیسی", uid: "altEn" },
  { name: "مساحت", uid: "area" },
  { name: "عنوان عربی", uid: "titleAr" },
  { name: "توضیحات عربی", uid: "descriptionAr" },
  { name: "توضیحات عکس عربی", uid: "altAr" },
  { name: "دسته بندی", uid: "categoryId" },
  { name: "تاریخ شروع", uid: "startDate" },
  { name: "تاریخ پایان", uid: "endDate" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "استایل معماری", uid: "artitectureStyle" },
  { name: "استایل انگلیسی", uid: "artitectureStyleEn" },
  { name: "استایل عربی", uid: "artitectureStyleAr" },
  { name: "عملیات", uid: "actions" },
];

const ProjectsPage = () => {
  const { data, isLoading } = useGetProjects();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const translateIdRef = useRef<string>();
  const {
    isOpen: isTranslatorOpen,
    onOpen: onOpenTranslator,
    onOpenChange: onOpenChangeTranslator,
  } = useDisclosure();
  const { isPending, mutate: deleteProject } = useDeleteProject();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetProject(editId);
  const {
    mutate: translateMutate,
    isPending: isTranslatePending,
    data: translateData,
  } = useTranslate();

  const deleteHandler = (id: string) => {
    deleteProject(id);
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

  const translateHandler = (data: TProjectTranslatePayload) => {
    onOpenChange();
    onOpenChangeTranslator();
    translateMutate(data);
  };

  return (
    <CustomContainer className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-gray">لیست پروژه ها</h1>
        </div>
        <CustomModal
          buttonTitle="افزودن پروژه"
          isOpen={isOpen}
          modalTitle={
            editId ? `ویرایش پروژه ${editData?.data?.title}` : "ساخت پروژه"
          }
          onClose={handleModalClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        >
          <FormContainer
            project={editData?.data}
            translateHandler={translateHandler}
            translateIdRef={translateIdRef}
          />
        </CustomModal>
        <CustomModal
          buttonTitle="ترجمه پروژه"
          hiddenButton={true}
          isOpen={isTranslatorOpen}
          modalTitle={
            editData ? `ترجمه پروژه ${editData?.data?.title}` : "ترجمه پروژه"
          }
          onClose={handleTranlateModalClose}
          onOpen={onOpenTranslator}
          onOpenChange={onOpenChangeTranslator}
        >
          <TranslateProjectFormContainer
            editId={editId as string}
            isPending={isTranslatePending}
            project={editData?.data as IProject}
            setEditId={setEditId}
            translateIdRef={translateIdRef}
            traslatedProjectPayload={
              translateData?.data?.data as ITranslatedProjectPayload
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

export default ProjectsPage;
