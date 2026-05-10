"use client";

import { ArrowIcon, WorldIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

export default function SelectLanguage() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button  color="primary" className="!border-primary  min-w-0 flex gap-2 items-center">
          <span className="max-lg:hidden">
            <ArrowIcon
              className="rotate-90 dark:text-white text-black"
              width={12}
              height={10}
            />
          </span>
          <span className="text-black max-lg:hidden capitalize dark:text-white text-sm font-bold">
            english
          </span>
          <span>
            <WorldIcon
              width={24}
              height={24}
              className="text-black dark:text-white"
            />
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
