"use client";

import { Checkbox } from "@heroui/checkbox";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { ICategory } from "@/lib/types/categories";
import { LocaleEnum } from "@/lib/types/base";

interface IProps {
  item: ICategory;
  index: number;
  groupSelected: string[];
}

export default function FilteringItem({ item, index, groupSelected }: IProps) {
  const locale = useLocale();
  const itemLang: Record<
    LocaleEnum,
    {
      title: string;
    }
  > = {
    fa: {
      title: item?.title,
    },
    en: {
      title: item?.titleEn,
    },
  };

  return (
    <motion.div
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
          {itemLang[locale as LocaleEnum]?.title}
        </span>
      </Checkbox>
    </motion.div>
  );
}
