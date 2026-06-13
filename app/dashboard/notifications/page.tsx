"use client";
import { useDisclosure } from "@heroui/modal";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomTable from "@/components/ui/CustomTable";
import FormContainer from "@/features/dashboard/notification/NotificationFormContainer";
import { useGetNotifications } from "@/lib/hooks/notications";

const columns = [
  { name: "عنوان", uid: "title" },
  { name: "لینک", uid: "url" },
  { name: "توضیحات", uid: "description" },
];

const SlidersPage = () => {
  const { data, isLoading } = useGetNotifications();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleModalClose = () => {
    onOpenChange();
  };

  return (
    <CustomContainer className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-gray">
            لیست نوتیفیکیشن ها
          </h1>
        </div>
        <CustomModal
          buttonTitle="ارسال نوتیفیکشن"
          isOpen={isOpen}
          modalTitle={`ساخت نوتیفیکیشن`}
          onClose={handleModalClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        >
          <FormContainer onOpenChage={onOpenChange} />
        </CustomModal>
      </div>
      <div className="bg-component-base-2 rounded-2xl">
        <CustomTable
          columns={columns}
          isLoading={isLoading}
          items={data?.data || []}
        />
      </div>
    </CustomContainer>
  );
};

export default SlidersPage;
