import { Input, InputProps } from "@heroui/input";




const CustomInput : React.FC<InputProps> = (props) => {
  return <Input {...props}  classNames={{
    inputWrapper:"bg-white",
    label:"text-white font-bold",
    input:"!text-woodSmoke-500 font-bold placehoder:font-bold",
    errorMessage:"capitalize"
  }} fullWidth />;
};

export default CustomInput;
