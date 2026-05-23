"use client";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

interface ICustomMoalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  buttonTitle: string;
  modalTitle: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<ICustomMoalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  buttonTitle,
  modalTitle,
  children,
}) => {
  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        className=" bg-primary text-sm font-bold "
      >
        {buttonTitle}
      </Button>
      <Modal
        classNames={{
          header:"text-white-gray font-bold text-xl ",
          base:"bg-gray ove",
          body: "py-10 flex flex-col gap-y-12 !overflow-visible",
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
