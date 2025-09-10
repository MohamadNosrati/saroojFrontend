import { Input, InputProps } from "@heroui/input";




const CustomInput : React.FC<InputProps> = (props) => {
  return <Input {...props}  classNames={{
    inputWrapper:"bg-shark-950 data-[hover=true]:bg-shark-950",
    input:"!text-woodSmoke-500 font-bold placehoder:font-bold",
  }} fullWidth />;
};

export default CustomInput;
