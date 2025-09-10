import { TextAreaProps, Textarea } from "@heroui/input";

const CustomTextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <Textarea
      classNames={{
        inputWrapper: "bg-shark-950 data-[hover=true]:bg-shark-950 p-2.5",
        input: "!text-woodSmoke-500 font-bold placehoder:font-bold",
      }}
      {...props}
      fullWidth
      labelPlacement="outside-top"
      label="توضبحات"
    />
  );
};
export default CustomTextArea;
