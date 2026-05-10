"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import AccordionTitle from "./AccordionTitle";
import { ArrowIcon, HomeIcon } from "@/components/icons";
import { useState } from "react";
import clsx from "clsx";

const FaqsContainer = () => {
  const [openedItem,setOpenedItem] = useState<Number>(0);
  return (
    <Accordion
      className="divide-y  divide-secondary"
      fullWidth
      showDivider={false}
    >
      {[1, 2, 3, 4]?.map((item,index) => (
        <AccordionItem
          onPress={()=>setOpenedItem(prv=> prv === index + 1 ? 0 : index + 1)}
          classNames={{
            base:"",
            trigger:clsx([
              "sm:!p-6 !px-4",
              openedItem  === index + 1 ? "bg-gray" : "bg-gray-darker "
            ]),
            content:clsx([
              "sm:!px-6 !px-4 pb-4",
              openedItem === index + 1  ? "bg-gray" : "bg-gray-darker "
            ]),
            indicator:"text-primary"
          }}
          key={item}
          aria-label="Accordion 1"
          title={<AccordionTitle  />}
          indicator={<ArrowIcon  className={clsx([
            "sm:size-6 size-4 sm:ml-4 ml-2",
      openedItem === index + 1  ? "" : "-rotate-90"

          ])}/>}
        >
            <p className="text-gray-lighter text-justify text-base font-medium">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و{" "}
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و{" "}
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و{" "}
            </p>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqsContainer;
