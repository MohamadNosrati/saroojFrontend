import { ReactNode } from "react";

interface CustomWrapperProps {
  children: ReactNode;
}

export default function CustomWrapper({ children }: CustomWrapperProps) {
  return (
    <section className="bg-gradient-to-t dark:from-primary-dark dark:to-blue-400 dark:via-red-400 pb-24 pt-16">
      {children}
    </section>
  );
}
