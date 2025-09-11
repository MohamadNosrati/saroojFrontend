"use client";
import CustomCard from "@/components/ui/CustomCard";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomLoader from "@/components/ui/CustomLoader";
import CustomModal from "@/components/ui/CustomModal";
import FormContainer from "@/features/dashboard/teamates/TeamateFormContainer";
import { useGetTemates } from "@/lib/hooks/temates";
import { ITeamate } from "@/lib/types/teamate";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

const TeamatesPage = () => {
  const { data, isLoading } = useGetTemates();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editData, setEditData] = useState<ITeamate | undefined >(undefined);
  return (
    <CustomContainer className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <div></div>
        <CustomModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن هم تیمی"
          modalTitle={
            editData ? `ویرایش هم تیمی ${editData?.title}` : "ساخت هم تیمی"
          }
        >
          <FormContainer teamate={editData} />
        </CustomModal>
      </div>
      <div className="bg-component-base-2 p-8 rounded-2xl">
        <CustomLoader isLoading={isLoading}>
          <div className="grid grid-cols-2 gap-8">
            {data?.data?.map((item) => (
              <CustomCard
                entity="teamate"
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

export default TeamatesPage;
