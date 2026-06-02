import { TextAreaProps, Textarea } from "@heroui/input";

const CustomTextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <Textarea
      classNames={{
        label: "text-white font-bold",
        inputWrapper:
          "bg-white data-[hover=true]:bg-white dark:bg-white group-data-[focus=true]:!bg-white p-2.5",
        input: "font-bold placehoder:font-bold !text-dark",
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
