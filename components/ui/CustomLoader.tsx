import { Spinner } from "@heroui/spinner";

interface ICustomLoader extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

const CustomLoader: React.FC<ICustomLoader> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <>{isLoading ? <Spinner size="lg" /> : <div {...props}>{children}</div>}</>
  );
};

export default CustomLoader;
