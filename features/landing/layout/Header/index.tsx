"use client";

import Image from "next/image";
import Logo from "@/public/images/logo.png";
import Link from "next/link";
import { Button } from "@heroui/button";
import { MoonIcon, WorldIcon } from "@/components/icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

const data = [
  {
    href: "fewtwe",
    label: "fd",
  },
  {
    href: "fewwe",
    label: "fgwe",
  },
  {
    href: "fewtgwetwee",
    label: "",
  },
];

const Header = () => {
  return (
    <section className="h-28  bg-[#959595]/47 backdrop-blur-md  w-full top-0 z-10 flex items-center">
      <div className="container  flex items-center justify-between">
        <div className="flex items-center  gap-24">
          <Image src={Logo} alt="ساروج" />
          <div className="flex items-center gap-12">
            {data?.map((item) => (
              <Link
                key={item?.href}
                className="text-black font-bold"
                href={item?.href}
              >
                {item?.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-16">
          <Button className="bg-transparent min-w-0">
            <span>
              <MoonIcon width={40} height={40} className="text-black" />
            </span>
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-transparent min-w-0 flex gap-2">
                <span className="text-black text-sm">English</span>
                <span>
                  <WorldIcon width={20} height={20} className="text-black" />
                </span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </section>
  );
};

export default Header;
