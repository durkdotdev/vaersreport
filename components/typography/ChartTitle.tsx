import classNames from "classnames";
import { ReactNode } from "react";

interface ChartTitleProps {
  children: ReactNode;
  className?: string;
}

const ChartTitle = ({ children, className }: ChartTitleProps) => {
  const classes = classNames("font-extrabold", className);
  return <h2 className={classes}>{children}</h2>;
};

export default ChartTitle;
