import Link, { LinkProps } from "next/link";
import { forwardRef, HTMLProps } from "react";

const DropdownLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & HTMLProps<HTMLAnchorElement>
>(({ href, children, ...rest }, ref) => {
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

DropdownLink.displayName = "DropdownLink";

export default DropdownLink;
