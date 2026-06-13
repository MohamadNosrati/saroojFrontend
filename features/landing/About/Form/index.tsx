import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";

import FormBg from "@/public/images/formBg.png";

const Form = () => {
  return (
    <div
      className="flex-col bg-cover gap-y-14 lg:py-20  md:py-14 py-10 flex items-center dark:bg-dark bg-white relative"
      style={{
        backgroundImage: `url(${FormBg?.src})`,
      }}
    >
      <p className="dark:text-white  text-dark text-center lg:text-xl font-bold text-base">
        اگر سوالی دارید <br />
        لطفا در ارسال پیام به ما تردید نکنید !
      </p>
      <form className="container flex justify-center">
        <div className="flex lg:w-2/3 sm:w-3/5  w-full flex-col items-center gap-5">
          <Input
            fullWidth
            classNames={{
              inputWrapper:
                "dark:bg-gray-darker rounded-none data-[hover=true]:dark:bg-gray-darker bg-gray-lighter data-[hover=true]:bg-gray-lighter text-gray-lighter font-medium",
            }}
            placeholder="Your Name"
            type="email"
          />
          <Input
            fullWidth
            classNames={{
              inputWrapper:
                "dark:bg-gray-darker rounded-none data-[hover=true]:dark:bg-gray-darker text-gray-lighter bg-gray-lighter data-[hover=true]:bg-gray-lighter font-medium",
            }}
            placeholder="Your Name"
            type="email"
          />
          <Textarea
            classNames={{
              inputWrapper:
                "rounded-none dark:bg-gray-darker dark:hover:bg-gray-darker bg-gray-lighter data-[hover=true]:bg-gray-lighter",
              input: "dark:text-gray-lighter font-medium",
            }}
            placeholder="Message"
            size="lg"
          />
          <Button
            className="rounded-none font-bold max-sm:w-full"
            color="primary"
            type="submit"
          >
            ارسال پیام
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
