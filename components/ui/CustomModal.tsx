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

interface ICustomMoalProps {
    buttonTitle:string;
    modalTitle:string;
    children:React.ReactNode;
}

const CustomModal : React.FC<ICustomMoalProps> = ({buttonTitle,modalTitle,children}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        isOpen={true}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <Divider />
              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;