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
        onPress={onOpen}
        size="lg"
        className=" bg-primary text-sm font-bold "
      >
        {buttonTitle}
      </Button>
      <Modal
        style={
          { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
        }
        classNames={{
          header: "text-white-gray font-bold text-xl ",
          base: "bg-gray font-yekan ",
          body: "py-10  flex flex-col gap-y-12 !overflow-visible !overflow-y-auto max-h-[80vh] sm:max-h-[75vh]",
        }}
        onClose={onClose}
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
