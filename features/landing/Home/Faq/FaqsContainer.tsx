"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState } from "react";
import clsx from "clsx";

import { ArrowIcon } from "@/components/icons";

import AccordionTitle from "./AccordionTitle";

const data = [
  {
    question: "مراحل بازسازی توسط شرکت ساروج به چه شکلی است؟",
    answer:
      "در پروژه های بازسازی،ابتدا برداشت پلان واحد شما توسط مهندسین انجام می شود.بعد از آن به سراغ طراحی با توجه به سلیقه شما و سبک انتخابی شما خواهیم رفت.در این مرحله شما 3 بار فرصت ایجاد تغییرات دارید.هم چنان در این مرحله می توانید با عینک های واقعیت مجازی، قبل از انجام هر کاری در واحد بازسازی خود قدم بزنید تا بهتر بتوانید از طراحی و سبک خانه خود مطلع شوید.سپس به اجرای طرح نهایی خواهیم پرداخت و تا روز تحویل کلید واحد در کنار شما خواهیم بود.",
  },
  {
    question: "هزينه بازسازي يك ساختمان چقدر است؟",
    answer:
      "براي اين سوال نميتوان جواب مشخصي ارائه داد زيرا بسته به طرح ،نوع متريال ، ميزان تغييرات و عدم ثبات در قيمت ها بسيار متفاوت است. براي اطلاعات دقيق با مشاورين شركت تماس حاصل بفرماييد.",
  },
];

const FaqsContainer = () => {
  const [openedItem, setOpenedItem] = useState<Number>(0);

  return (
    <Accordion
      fullWidth
      className="divide-y  divide-secondary"
      showDivider={false}
    >
      {data?.map((item, index) => (
        <AccordionItem
          key={index}
          aria-label={item?.question}
          classNames={{
            base: "",
            trigger: clsx([
              "sm:!p-6 !px-4",
              openedItem === index + 1 ? "bg-gray" : "bg-gray-darker ",
            ]),
            content: clsx([
              "sm:!px-6 !px-4 pb-4",
              openedItem === index + 1 ? "bg-gray" : "bg-gray-darker ",
            ]),
            indicator: "text-primary",
          }}
          indicator={
            <ArrowIcon
              className={clsx([
                "sm:size-6 size-4 sm:ml-4 ml-2",
                openedItem === index + 1 ? "" : "-rotate-90",
              ])}
            />
          }
          title={<AccordionTitle question={item?.question} />}
          onPress={() =>
            setOpenedItem((prv) => (prv === index + 1 ? 0 : index + 1))
          }
        >
          <p className="text-gray-lighter text-justify text-base font-medium">
            {item?.answer}
          </p>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqsContainer;
