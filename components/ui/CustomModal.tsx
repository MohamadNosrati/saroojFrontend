"use client";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalContent,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { ITeamate } from "@/lib/types/teamate";

interface ICustomMoalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  buttonTitle: string;
  modalTitle: string;
  children: React.ReactNode;
  editData?:ITeamate;
}

const CustomModal: React.FC<ICustomMoalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  buttonTitle,
  modalTitle,
  children,
  editData
}) => {
  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        className=" bg-sky-400 text-slate-50 text-sm font-bold"
      >
        {buttonTitle}
      </Button>
      <Modal
        classNames={{
          body: "py-10 flex flex-col gap-y-12",
        }}
        dir="rtl"
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <Divider />
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
