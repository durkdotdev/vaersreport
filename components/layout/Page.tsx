import classNames from "classnames";
import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  const classes = classNames(
    "flex-1 px-6 py-16 w-full flex justify-center",
    className
  );
  return (
    <div className={classes}>
      <div className="flex w-full max-w-4xl flex-col items-center space-y-8">
        {children}
      </div>
    </div>
  );
};

export default Page;
