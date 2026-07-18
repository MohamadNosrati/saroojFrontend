import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";
import { useSearchParams } from "next/navigation";

import { sortOptions } from "@/lib/config/sort";
import { SortByEnum } from "@/lib/types/base";
import { ICategory } from "@/lib/types/categories";

interface IProps {
  sort: {
    selected: SortByEnum;
    setSelected: Dispatch<SetStateAction<SortByEnum>>;
  };
  filtering: {
    groupSelected: string[];
    setGroupSelected: Dispatch<SetStateAction<string[]>>;
  };
  data: ICategory[];
  isLoading: boolean;
}

export default function Filtering({
  filtering,
  sort,
  data,
  isLoading,
}: IProps) {
  const { selected, setSelected } = sort;
  const { groupSelected, setGroupSelected } = filtering;

  const searchParams = useSearchParams();

  const decodedSlug = searchParams.get("categoryTitle")
    ? decodeURIComponent(
        searchParams.get("categoryTitle") as string,
      ).replaceAll("-", " ")
    : null;

  useEffect(() => {
    if (!data.length) return;

    let nextSelection: string[];

    if (decodedSlug) {
      const selectedCategory = data.find((item) => item.title === decodedSlug);

      if (!selectedCategory) return;

      nextSelection = [selectedCategory.id];
    } else {
      nextSelection = data.map((item) => item.id);
    }

    setGroupSelected((prev) => {
      if (
        prev.length === nextSelection.length &&
        prev.every((id, i) => id === nextSelection[i])
      ) {
        return prev;
      }

      return nextSelection;
    });
  }, [data, decodedSlug]);

  const handleChangeCategories = (values: string[]) => {
    setGroupSelected(values);
    const cleanUrl = window.location.origin + window.location.pathname;

    window.history.replaceState(null, "", cleanUrl);
  };

  return (
    <motion.div
      className="flex items-center max-lg:flex-col gap-2.5"
      initial={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <motion.div
        className="min-w-60 max-lg:w-full"
        whileHover={{
          scale: 1.02,
        }}
      >
        <Select
          fullWidth
          classNames={{
            trigger: "bg-white dark:bg-dark dark:text-white",
            innerWrapper: "text-white",
            listboxWrapper: "dark:bg-gray-darker dark:text-white",
            base: "border-1 rounded-lg !font-yekan",
          }}
          defaultSelectedKeys={[SortByEnum.NEWEST]}
          dir="rtl"
          selectedKeys={[selected]}
          onChange={(e) => {
            if (e.target.value) {
              setSelected(e.target.value as SortByEnum);
            }
          }}
        >
          {sortOptions.map((animal) => (
            <SelectItem key={animal.key} dir="rtl">
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </motion.div>

      <CheckboxGroup
        isDisabled={isLoading}
        value={groupSelected}
        onValueChange={handleChangeCategories}
      >
        <div className="flex h-full sm:gap-4 min-h-48 gap-2.5 flex-wrap items-center justify-center">
          {data?.map((item, index) => (
            <motion.div
              key={item?.id}
              className="flex h-10 items-center rounded-xl bg-white dark:bg-gray-darker px-2.5"
              initial={{
                opacity: 0,
                y: 15,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -2,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
            >
              <Checkbox
                classNames={{
                  base: [
                    "inline-flex w-full !max-h-none !h-10 max-w-none text-no-wrap",
                    "justify-start",
                    "cursor-pointer rounded-lg data-[hover=true]:bg-transparent border-2 border-transparent",
                  ].join(" "),
                  label: "!h-full !min-w-fit",
                }}
                isDisabled={
                  groupSelected?.length === 1 && groupSelected[0] === item?.id
                }
                value={item?.id}
              >
                <span className="text-dark dark:text-white text-sm font-bold">
                  {item?.title}
                </span>
              </Checkbox>
            </motion.div>
          ))}
        </div>
      </CheckboxGroup>
    </motion.div>
  );
}
