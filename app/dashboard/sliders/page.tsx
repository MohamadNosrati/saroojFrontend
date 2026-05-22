"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/sliders/SlidersFormContainer";
import {
  useDeleteSlider,
  useGetSlider,
  useGetSliders,
} from "@/lib/hooks/sliders";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "عنوان", uid: "title" },
  { name: "توضیحات عکس", uid: "alt" },
  { name: "لینک", uid: "link" },
  { name: "توضیحات", uid: "description" },
  { name: "وضعیت", uid: "isActive" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "عملیات", uid: "actions" },
];

const SlidersPage = () => {
  const { data, isLoading } = useGetSliders();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, mutate: deleteCategory } = useDeleteSlider();
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { data: editData } = useGetSlider(editId);

  const deleteHandler = (id: string) => {
    deleteCategory(id);
  };
  const editHandler = (id: string) => {
    onOpenChange();
    setEditId(id);
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
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن اسلایدر"
          modalTitle={
            editId
              ? `ویرایش اسلایدر ${editData?.data?.title}`
              : "ساخت اسلایدر"
          }
        >
          <FormContainer onOpenChage={onOpenChange} slider={editData?.data} />
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

export default SlidersPage;
