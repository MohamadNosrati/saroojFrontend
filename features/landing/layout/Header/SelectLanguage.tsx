"use client";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ArrowIcon, WorldIcon } from "@/components/icons";
import {
  arabicRoutes,
  englishRoutes,
  persianRoutes,
} from "@/lib/routes/navigationRoutes";

const items = [
  {
    key: persianRoutes.homePage(),
    label: "فارسی",
    locale: "/fa",
  },
  {
    key: englishRoutes.homePage(),
    label: "English",
    locale: "/en",
  },
  {
    key: arabicRoutes.homePage(),
    label: "عربی",
    locale: "/ar",
  },
];

export default function SelectLanguage() {
  const [selectedKeys, setSelectedKeys] = useState<string>("Persian");
  const router = useRouter();
  const pathName = usePathname();

  const handleAction = (label: any) => {
    setSelectedKeys(label);
    router.push(items?.find((item) => item?.label === label)?.key as string);
  };

  useEffect(() => {
    console.log("pathName", pathName);
    const currentItem = items?.find((item) => pathName.startsWith(item.locale));

    console.log("ci", currentItem);

    if (currentItem) {
      setSelectedKeys(currentItem.label);
    }
  }, [pathName]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="!border-primary text-white dark:text-dark min-w-0 flex gap-2 items-center"
          color="primary"
        >
          <span className="max-lg:hidden">
            <ArrowIcon
              className="rotate-90 dark:text-white text-black"
              height={10}
              width={12}
            />
          </span>
          <span className="text-black max-lg:hidden capitalize dark:text-white text-sm font-bold">
            {selectedKeys}
          </span>
          <span>
            <WorldIcon
              className="text-black dark:text-white"
              height={24}
              width={24}
            />
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(label) => handleAction(label as any)}
      >
        {items?.map((item) => (
          <DropdownItem key={item?.label}>{item?.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
