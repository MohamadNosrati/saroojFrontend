

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import FormBg from "@/public/images/formBg.png";

const Form = () => {
  return (
    <div style={{
      backgroundImage:`url(${FormBg?.src})`
    }} className="flex-col bg-cover gap-y-14 lg:py-20  md:py-14 py-10 flex items-center dark:bg-dark bg-white relative">
      <p className="dark:text-white text-dark text-center font-medium text-base">
        IF YOU GOT ANY QUESTION
        <br />
        PLEAS DO NOT HESITATE TO SEND US A MESSAGE
      </p>
      <form className="container flex justify-center">
        <div className="flex lg:w-2/3 sm:w-3/5  w-full flex-col items-center gap-5">
          <Input
            type="email"
            placeholder="Your Name"
            classNames={{
              inputWrapper: "dark:bg-gray-darker rounded-none data-[hover=true]:dark:bg-gray-darker bg-gray-lighter data-[hover=true]:bg-gray-lighter text-gray-lighter font-medium",
            }}
            fullWidth
          />
          <Input
            type="email"
            placeholder="Your Name"
            classNames={{
              inputWrapper: "dark:bg-gray-darker rounded-none data-[hover=true]:dark:bg-gray-darker text-gray-lighter bg-gray-lighter data-[hover=true]:bg-gray-lighter font-medium",
            }}
            fullWidth
          />
          <Textarea size="lg" placeholder="Message" classNames={{
            inputWrapper:"rounded-none dark:bg-gray-darker dark:hover:bg-gray-darker bg-gray-lighter data-[hover=true]:bg-gray-lighter",
            input:"dark:text-gray-lighter font-medium"
          }}/>
          <Button color="primary" type="submit" className="rounded-none max-sm:w-full">SEND MESSAGE</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
