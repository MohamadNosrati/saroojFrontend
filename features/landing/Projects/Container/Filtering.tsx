import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import clsx from "clsx";
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
    if (data) {
      if (decodedSlug) {
        const selectedCategory = data?.find(
          (elem) => elem?.title === decodedSlug,
        );

        if (selectedCategory) {
          setGroupSelected([selectedCategory?.id]);
        }
      } else {
        setGroupSelected(data?.map((item) => item?.id));
      }
    }
  }, [data, decodedSlug]);

  const handleChangeCategories = (values: string[]) => {
    setGroupSelected(values);
    const cleanUrl = window.location.origin + window.location.pathname;

    window.history.replaceState(null, "", cleanUrl);
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-60">
        <Select
          fullWidth
          classNames={{
            trigger: "bg-white dark:!text-white",
            innerWrapper: "text-white",
            listboxWrapper: "dark:bg-gray-darker dark:text-white",
            base: "border-1 rounded-lg !font-yekan",
          }}
          defaultSelectedKeys={[SortByEnum.NEWEST]}
          dir="rtl"
          selectedKeys={[selected]}
          onChange={(e) => {
            if (e.target.value) {
              setSelected(e?.target.value as SortByEnum);
            }
          }}
        >
          {sortOptions.map((animal) => (
            <SelectItem key={animal.key} dir="rtl">
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <CheckboxGroup
        isDisabled={isLoading}
        value={groupSelected}
        onValueChange={handleChangeCategories}
      >
        <div className="flex h-full gap-4">
          {data?.map((item) => (
            <div
              key={item?.id}
              className="flex !h-10 items-center rounded-xl bg-white px-2.5"
            >
              <Checkbox
                classNames={{
                  base: clsx([
                    "inline-flex w-full !max-h-none !h-10 max-w-none text-no-wrap",
                    "justify-start",
                    "cursor-pointer rounded-lg data-[hover=true]:bg-transparent border-2 border-transparent",
                  ]),
                  label: "!h-full !min-w-fit",
                }}
                isDisabled={
                  groupSelected?.length === 1 && groupSelected[0] === item?.id
                }
                value={item?.id}
              >
                <span className="text-dark text-sm font-bold">
                  {item?.title}
                </span>
              </Checkbox>
            </div>
          ))}
        </div>
      </CheckboxGroup>
    </div>
  );
}
