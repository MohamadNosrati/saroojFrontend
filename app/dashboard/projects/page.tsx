"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/projects/ProjectsFormContainer";
import {
  useDeleteProject,
  useGetProject,
  useGetProjects,
} from "@/lib/hooks/projects";
import { useDisclosure } from "@heroui/modal";
import { useEffect, useState } from "react";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "عنوان", uid: "title" },
  { name: "توضیحات عکس", uid: "alt" },
  { name: "وضعیت", uid: "isActive" },
  { name: "دسته بندی", uid: "categoryId" },
  { name: "تاریخ شروع", uid: "startDate" },
  { name: "تاریخ پایان", uid: "endDate" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "استایل معماری", uid: "artitectureStyle" },
  { name: "عملیات", uid: "actions" },
];

const ProjectsPage = () => {
  const { data, isLoading } = useGetProjects();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteCategory } = useDeleteProject();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetProject(editId);

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
          <h1 className="text-2xl font-bold text-white-gray">لیست پروژه ها</h1>
        </div>
        <CustomModal
          onClose={handleModalClose}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن پروژه"
          modalTitle={
            editId ? `ویرایش پروژه ${editData?.data?.title}` : "ساخت پروژه"
          }
        >
          <FormContainer project={editData?.data} />
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

export default ProjectsPage;
