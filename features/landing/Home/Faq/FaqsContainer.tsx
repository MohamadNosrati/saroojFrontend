"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import AccordtionTitle from "./AccordtionTitle";

const FaqsContainer = () => {
  return (
    <Accordion
      dividerProps={{
        hidden: true,
      }}
      fullWidth
      hideIndicator
    >
      {[1, 2, 3, 4]?.map((item) => (
        <AccordionItem
          classNames={{
            base: "mb-2.5",
            trigger: "py-0",
            content: "py-9 bg-gray",
          }}
          key={item}
          aria-label="Accordion 1"
          title={<AccordtionTitle />}
        >
          <div className="bg-gray px-6">
            <p className="text-gray-lighter text-base font-medium">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و{" "}
            </p>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqsContainer;
