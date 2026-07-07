"use client";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalProps,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { yekanBakh } from "@/lib/config/fonts";
import { CustomWhen } from "./CustomWhen";

interface ICustomMoalProps extends ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  buttonTitle: string;
  modalTitle: string;
  children: React.ReactNode;
  hiddenButton?: boolean;
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
  hiddenButton,
}) => {
  return (
    <>
      <CustomWhen condition={!hiddenButton}>
        <Button
          className=" bg-primary text-sm font-bold "
          size="lg"
          onPress={onOpen}
        >
          {buttonTitle}
        </Button>
      </CustomWhen>
      <Modal
        backdrop="blur" // Native HeroUI frosted glass background overlay
        classNames={{
          base: "bg-slate-900/95 border border-slate-800 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/80 font-yekan text-slate-100 max-h-[90vh] sm:max-h-[85vh]",
          header:
            "text-slate-100 font-extrabold text-xl pt-6 pb-4 px-6 border-b border-slate-800/60",
          body: "py-6 px-6 flex flex-col gap-y-6 overflow-y-auto scroll-smooth custom-scrollbar",
          closeButton:
            "hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors duration-200 left-4 right-auto", // Fixed position for RTL
        }}
        dir="rtl"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            },
            exit: {
              y: 10,
              opacity: 0,
              transition: { duration: 0.15, ease: "easeIn" },
            },
          },
        }}
        size="5xl"
        style={
          { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
        }
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex items-center gap-2">
                {modalTitle}
              </ModalHeader>
              {/* Removed standard <Divider /> because the subtle border-b in the header class looks cleaner */}
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
