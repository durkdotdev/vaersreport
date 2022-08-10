import classNames from "classnames";
import { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

const PageTitle = ({ children, className }: PageTitleProps) => {
  const classes = classNames("text-3xl text-center font-extralight", className);
  return <h2 className={classes}>{children}</h2>;
};

export default PageTitle;
