import { ReactNode } from "react";

interface IProps {
  condition: boolean;
  children: ReactNode;
}

export const CustomWhen: React.FC<IProps> = ({ condition, children }) => {
  return <>{condition ? children : null}</>;
};
