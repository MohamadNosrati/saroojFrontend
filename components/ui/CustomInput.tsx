import { Input, InputProps } from "@heroui/input";




const CustomInput : React.FC<InputProps> = (props) => {
  return <Input {...props}  classNames={{
    inputWrapper:"bg-white data-[hover=true]:bg-white dark:bg-white group-data-[focus=true]:!bg-white",
    label:"text-white font-bold",
    input:"font-bold placehoder:font-bold  !text-dark dark:text-dark  custom-input",
    errorMessage:"capitalize"
  }} fullWidth />;
};

export default CustomInput;
