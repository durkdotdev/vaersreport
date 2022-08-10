import classNames from "classnames";
import { ReactNode } from "react";

interface LinkTagProps {
  children: ReactNode;
  className?: string;
}

const LinkTag = ({ children, className }: LinkTagProps) => {
  const classes = classNames(
    "font-bold text-blue-500 underline hover:text-blue-600",
    className
  );
  return <span className={classes}>{children}</span>;
};

export default LinkTag;
