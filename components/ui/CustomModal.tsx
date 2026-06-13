"use client";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalProps,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

import { yekanBakh } from "@/lib/config/fonts";

interface ICustomMoalProps extends ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  buttonTitle: string;
  modalTitle: string;
  children: React.ReactNode;
  // setEditId: Dispatch<SetStateAction<string | undefined>>;
}

const CustomModal: React.FC<ICustomMoalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  buttonTitle,
  modalTitle,
  children,
  onClose,
}) => {
  return (
    <>
      <Button
        className=" bg-primary text-sm font-bold "
        size="lg"
        onPress={onOpen}
      >
        {buttonTitle}
      </Button>
      <Modal
        classNames={{
          header: "text-white-gray font-bold text-xl ",
          base: "bg-gray font-yekan ",
          body: "py-10  flex flex-col gap-y-12 !overflow-visible !overflow-y-auto max-h-[80vh] sm:max-h-[75vh]",
        }}
        dir="rtl"
        isOpen={isOpen}
        size="5xl"
        style={
          { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
        }
        onClose={onClose}
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
