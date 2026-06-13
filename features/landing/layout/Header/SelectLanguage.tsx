"use client";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import { ArrowIcon, WorldIcon } from "@/components/icons";

export default function SelectLanguage() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="!border-primary  min-w-0 flex gap-2 items-center"
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
            english
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
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
