import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";

const Form = () => {
  return (
    <div className="py-24 flex-col flex items-center bg-black">
      <p className="text-white text-center font-medium text-base">
        IF YOU GOT ANY QUESTION
        <br />
        PLEAS DO NOT HESITATE TO SEND US A MESSAGE
      </p>
      <form className="mt-14 w-1/2">
        <div className="flex w-full flex-col items-center gap-5">
          <Input
            type="email"
            placeholder="Your Name"
            classNames={{
              inputWrapper: "rounded-none",

              input: "bg-gray-darker text-gray-lighter font-medium",
            }}
            fullWidth
          />
          <Input
            placeholder="Your Name"
            classNames={{
              inputWrapper: "rounded-none",

              input: "bg-gray-darker text-gray-lighter font-medium",
            }}
            fullWidth
          />
          <Textarea placeholder="Message" classNames={{
            inputWrapper:"rounded-none",
            input:"bg-gray-darker text-gray-lighter font-medium"
          }}/>
          <Button type="submit" className="rounded-none w-fit bg-primary py-4 px-6 text-black">SEND MESSAGE</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
