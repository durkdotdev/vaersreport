import classNames from "classnames";
import { ReactNode } from "react";

interface DividerProps {
  children?: ReactNode;
  className?: string;
}

const Divider = ({ children, className }: DividerProps) => {
  const classes = classNames(
    "w-full max-w-4xl min-h-[1px] flex-1 rounded bg-gray-300",
    !children ? className : ""
  );
  const containerClasses = classNames(
    "w-full flex flex-col space-y-4",
    children ? className : ""
  );
  if (!children) return <div className={classes} />;
  return (
    <div className={containerClasses}>
      <span className="text-sm font-extrabold">{children}</span>
      <div className={classes} />
    </div>
  );
};

export default Divider;
