"use client";
import CustomCard from "@/components/ui/CustomCard";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomLoader from "@/components/ui/CustomLoader";
import CustomModal from "@/components/ui/CustomModal";
import FormContainer from "@/features/dashboard/categories/CategoryFormContainer";
import { useGetCategories } from "@/lib/hooks/categories";
import { ICategory } from "@/lib/types/categories";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

const CategoriesPage = () => {
  const { data, isLoading } = useGetCategories();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editData, setEditData] = useState<ICategory | undefined>(undefined);
  return (
    <CustomContainer className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <div></div>
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
      <div className="bg-component-base-2 p-8 rounded-2xl">
        <CustomLoader isLoading={isLoading}>
          <div className="grid grid-cols-2 gap-8">
            {data?.data?.map((item) => (
              <CustomCard
                entity="category"
                setEditData={setEditData}
                onOpen={onOpen}
                key={item?.id}
                item={item}
              />
            ))}
          </div>
        </CustomLoader>
      </div>
    </CustomContainer>
  );
};

export default CategoriesPage;
