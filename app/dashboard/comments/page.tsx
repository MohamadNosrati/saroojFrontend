"use client";
import CustomCard from "@/components/ui/CustomCard";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomLoader from "@/components/ui/CustomLoader";
import CustomModal from "@/components/ui/CustomModal";
import FormContainer from "@/features/dashboard/comments/CommentFormContainer";
import { useGetComments } from "@/lib/hooks/comments";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

const CommentsPage = () => {
  const { data, isLoading } = useGetComments();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editData, setEditData] = useState<IComment | undefined>(undefined);
  return (
    <CustomContainer className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <div></div>
        <CustomModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          buttonTitle="افزودن نظر"
          modalTitle={
            editData ? `ویرایش نظر ${editData?.fullName}` : "ساخت نظر"
          }
        >
          <FormContainer comment={editData} />
        </CustomModal>
      </div>
      <div className="bg-component-base-2 p-8 rounded-2xl">
        <CustomLoader isLoading={isLoading}>
          <div className="grid grid-cols-2 gap-8">
            {data?.data?.map((item) => (
              <CustomCard
                entity="comment"
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

export default CommentsPage;
