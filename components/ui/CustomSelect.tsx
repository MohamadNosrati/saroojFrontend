import { Select, SelectItem } from "@heroui/select";
import { Control, Controller } from "react-hook-form";

interface IOption {
  label: string;
  key: string;
}

interface ICustomSelectProps {
  selectLabel: string;
  name: string;
  control: Control<any,any,any>;
  options: IOption[];
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  name,
  control,
  options,
  selectLabel,
}) => {
  return (
    <Controller
      
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Select
          dir="rtl"
          fullWidth
          value={value}
          onSelectionChange={onChange}
          label={selectLabel}
          classNames={{
            base:"!h-10 ",
            trigger:"bg-shark-950 data-[hover=true]:bg-shark-950 h-10 !min-h-0 rtl",
          }}
        >
          {options?.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default CustomSelect;
