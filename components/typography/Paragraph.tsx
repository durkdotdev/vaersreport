import classNames from "classnames";
import { HTMLProps, ReactNode } from "react";

interface ParagraphProps extends HTMLProps<HTMLParagraphElement> {
  children?: ReactNode;
  className?: string;
}

const Paragraph = ({ children, className, ...rest }: ParagraphProps) => {
  const classes = classNames(
    "font-light text-center text-lg max-w-xl",
    className
  );
  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
};

export default Paragraph;
