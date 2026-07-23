import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { sortOptions } from "@/lib/config/sort";
import { LocaleEnum, SortByEnum } from "@/lib/types/base";
import { ICategory } from "@/lib/types/categories";
import FilteringItem from "./FilteringItem";

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
  const locale = useLocale();
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

  const condition = locale === "fa" ? "title" : "titleEn";

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
          selectedKeys={[selected]}
          onChange={(e) => {
            if (e.target.value) {
              setSelected(e.target.value as SortByEnum);
            }
          }}
        >
          {sortOptions.map((animal) => (
            <SelectItem key={animal.key}>
              {animal[locale === "fa" ? "label" : "labelEn"]}
            </SelectItem>
          ))}
        </Select>
      </motion.div>

      <CheckboxGroup
        isDisabled={isLoading}
        value={groupSelected}
        onValueChange={handleChangeCategories}
      >
        <div className="flex h-full sm:gap-4 gap-2.5 flex-wrap items-center justify-center">
          {data
            ?.filter((item) => item[condition])
            ?.map((item, index) => (
              <FilteringItem
                key={item?.id}
                index={index}
                item={item}
                groupSelected={groupSelected}
              />
            ))}
        </div>
      </CheckboxGroup>
    </motion.div>
  );
}
