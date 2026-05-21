import { TextAreaProps, Textarea } from "@heroui/input";

const CustomTextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <Textarea
      classNames={{
        label: "text-white",
        inputWrapper: "bg-white data-[hover=true]:bg-shark-950 p-2.5",
        input: "font-bold placehoder:font-bold",
      }}
      {...props}
      fullWidth
      labelPlacement="outside-top"
      label="توضبحات"
      {...props}
    />
  );
};
export default CustomTextArea;
