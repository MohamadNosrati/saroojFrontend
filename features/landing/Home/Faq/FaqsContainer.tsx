"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState } from "react";
import clsx from "clsx";
import { useLocale } from "next-intl";

import { ArrowIcon } from "@/components/icons";

import AccordionTitle from "./AccordionTitle";

const data = [
  {
    question: "مراحل بازسازی توسط شرکت ساروج به چه شکلی است؟",
    questionEn: "What are the renovation stages carried out by Sarooj Company?",
    answer:
      "در پروژه های بازسازی،ابتدا برداشت پلان واحد شما توسط مهندسین انجام می شود.بعد از آن به سراغ طراحی با توجه به سلیقه شما و سبک انتخابی شما خواهیم رفت.در این مرحله شما 3 بار فرصت ایجاد تغییرات دارید.هم چنان در این مرحله می توانید با عینک های واقعیت مجازی، قبل از انجام هر کاری در واحد بازسازی خود قدم بزنید تا بهتر بتوانید از طراحی و سبک خانه خود مطلع شوید.سپس به اجرای طرح نهایی خواهیم پرداخت و تا روز تحویل کلید واحد در کنار شما خواهیم بود.",
    answerEn:
      "For renovation projects, our engineers first survey and measure your property to prepare the layout. Next, we create a design based on your preferences and chosen style. During this stage, you have up to three opportunities to request design revisions. You can also explore your future renovated space using virtual reality (VR) headsets before any work begins, allowing you to better visualize the design and overall style of your home. Once the final design is approved, we begin the execution phase and remain by your side until the day your renovated property is completed and the keys are handed over.",
  },
  {
    question: "هزينه بازسازي يك ساختمان چقدر است؟",
    questionEn: "How much does it cost to renovate a building?",
    answer:
      "براي اين سوال نميتوان جواب مشخصي ارائه داد زيرا بسته به طرح ،نوع متريال ، ميزان تغييرات و عدم ثبات در قيمت ها بسيار متفاوت است. براي اطلاعات دقيق با مشاورين شركت تماس حاصل بفرماييد.",
    answerEn:
      "There is no fixed answer to this question, as the renovation cost depends on several factors, including the design, the type of materials used, the scope of the required changes, and fluctuations in market prices. For an accurate estimate, please contact our consultants.",
  },
];

const FaqsContainer = () => {
  const [openedItem, setOpenedItem] = useState<Number>(0);

  const locale = useLocale();

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
          title={
            <AccordionTitle
              question={locale === "fa" ? item?.question : item?.questionEn}
            />
          }
          onPress={() =>
            setOpenedItem((prv) => (prv === index + 1 ? 0 : index + 1))
          }
        >
          <p className="text-gray-lighter text-justify text-base font-medium">
            {locale === "fa" ? item?.answer : item?.answerEn}
          </p>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqsContainer;
