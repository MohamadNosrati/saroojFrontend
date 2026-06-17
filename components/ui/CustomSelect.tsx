// import { Select, SelectItem } from "@heroui/select";
// import { SharedSelection } from "@heroui/system";

// interface IOption {
//   label: string;
//   key: string;
// }

// interface ICustomSelectProps {
//   selectLabel: string;
//   options: IOption[];
//   value: string;
//   onSelectionChange: (value: SharedSelection) => void;
// }

// const CustomSelect: React.FC<ICustomSelectProps> = ({
//   options,
//   selectLabel,
//   value,
//   onSelectionChange,
// }) => {
//   return (
//     <div className="w-full">
//       <Select
//         dir="rtl"
//         fullWidth
//         value={value}
//         size="sm"
//         onSelectionChange={onSelectionChange}
//         label={selectLabel}
//         labelPlacement="outside-top"
//         classNames={{
//           trigger:
//             "bg-white data-[hover=true]:bg-white dark:bg-white group-data-[focus=true]:!bg-white",
//         }}
//       >
//         {options?.map((option) => (
//           <SelectItem dir="rtl" key={option.key}>{option.label}</SelectItem>
//         ))}
//       </Select>
//     </div>
//   );
// };

// export default CustomSelect;

import React, { useState, useRef, useEffect } from "react";

interface IOption {
  label: string;
  key: string;
}

interface ICustomSelectProps {
  selectLabel: string;
  options: IOption[];
  value: string;
  onSelectionChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  options,
  selectLabel,
  value,
  onSelectionChange,
  placeholder = "انتخاب کنید",
  disabled = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.key === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current && selectRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();

      dropdownRef.current.style.top = `${selectRect.height + 4}px`;
      dropdownRef.current.style.left = "0";
      dropdownRef.current.style.width = `${selectRect.width}px`;
    }
  }, [isOpen]);

  const handleSelect = (key: string) => {
    onSelectionChange(key);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div ref={selectRef} className="w-full relative">
      {/* Label */}
      {selectLabel && (
        <label className="block text-sm font-medium text-white mb-1.5">
          {selectLabel}
        </label>
      )}

      {/* Trigger Button */}
      <button
        className={`
          relative w-full min-h-[40px] px-3 py-2 
          bg-white rounded-lg 
          border 
          ${isFocused || isOpen ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "cursor-pointer hover:border-gray-400"}
          ${error ? "border-red-500" : ""}
          transition-all duration-200
        `}
        type="button"
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            setIsFocused(true);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-sm ${selectedOption ? "text-gray-900" : "text-gray-400"}`}
          >
            {selectedOption?.label || placeholder}
          </span>

          {/* Chevron Icon */}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </button>

      {/* Error Message */}
      {error && <p className="mt-1 text-xs text-red-500 capitalize">{error}</p>}

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999999] mt-1 w-full min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400 text-center">
                گزینه‌ای موجود نیست
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {options.map((option) => (
                  <button
                    key={option.key}
                    className={`
                    px-3 py-2 w-full text-sm text-right cursor-pointer transition-colors duration-150
                    ${option.key === value ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}
                  `}
                    type="button"
                    onClick={() => handleSelect(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
