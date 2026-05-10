import { Spinner } from "@heroui/spinner";
import clsx from "clsx";

interface ICustomLoader extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

const CustomLoader: React.FC<ICustomLoader> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <div className={clsx([
      "w-full flex justify-center",
      props?.className
    ])}>{isLoading ? <Spinner size="lg" /> : <div {...props}>{children}</div>}</div>
  );
};

export default CustomLoader;
