import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";


// interface ICustomContainerProps {
//     props?:React.HTMLAttributes<HTMLDivElement>;
// }

const CustomContainer : React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className={`rounded-2xl p-6 bg-charade-950 ${props?.className}`}>
        {props.children}
    </div>
  );
};

export default CustomContainer;