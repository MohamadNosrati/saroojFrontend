import { QuestionIcon } from "@/components/icons";

interface IProps {
  question: string;
}

const AccordionTitle: React.FC<IProps> = ({ question }) => {
  return (
    <div className="flex sm:gap-4 gap-2.5 items-center">
      <div className="sm:size-10 sm:min-w-10 size-6 min-w-6 flex justify-center items-center rounded-full bg-primary">
        <span>
          <QuestionIcon className="text-gray-darker sm:size-7 size-5" />
        </span>
      </div>
      <p className="font-bold lg:text-lg sm:text-medium text-justify text-sm text-white">
        {question}
      </p>
    </div>
  );
};

export default AccordionTitle;
