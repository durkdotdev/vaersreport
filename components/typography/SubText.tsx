import classNames from "classnames";
import { HTMLProps, ReactNode } from "react";

interface SubTextProps extends HTMLProps<HTMLParagraphElement> {
  children?: ReactNode;
  className?: string;
}

const SubText = ({ children, className, ...rest }: SubTextProps) => {
  const classes = classNames(
    "block font-light text-sm text-gray-700 w-full max-w-3xl",
    className
  );
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

export default SubText;
