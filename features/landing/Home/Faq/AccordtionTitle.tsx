import { QuestionIcon } from "@/components/icons";

const AccordtionTitle = () => {
  return (
    <div className="flex gap-4 items-center bg-gray-darker py-8 px-6 ">
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-primary">
        <span>
          <QuestionIcon width={19} height={27} className="text-gray-darker" />
        </span>
      </div>
      <p className="font-bold text-lg">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ ؟
      </p>
    </div>
  );
};

export default AccordtionTitle;
