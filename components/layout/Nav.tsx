import { Menu } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { getYears } from "../../lib/helpers";
import Dropdown from "../miscellaneous/Dropdown";
import DropdownLink from "../miscellaneous/DropdownLink";

const navLinks = [{ href: "/project/about", label: "About" }];
const menuLinks = [
  { href: "/project/about", label: "About" },
  { href: "/project/contact", label: "Contact" },
  { href: "/project/faq", label: "FAQ" },
  { href: "/education/resources", label: "Resources" }
];

const Nav = () => {
  const router = useRouter();
  const { year } = router.query;
  return (
    <nav className="sticky top-0 z-[999] flex w-full items-center justify-center bg-white px-6 py-3 shadow-sm">
      <div className="flex w-full items-center justify-between">
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/">
              <a className="font-extrabold">VAERS Report</a>
            </Link>
          </li>
          {navLinks.map((link) => (
            <li className="hidden sm:inline-block" key={link.label}>
              <Link href={link.href}>
                <a className="text-sm font-medium text-gray-700 hover:underline">
                  {link.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center	 space-x-3 md:flex-row-reverse md:space-x-6">
          <li>
            <Dropdown
              buttonClassName={year ? "!font-extrabold !text-black" : ""}
              label={
                year ? (
                  <span>{year as string}</span>
                ) : (
                  <span>
                    <span className="mr-[0.1875rem] hidden md:inline-block">
                      Select a
                    </span>
                    Year
                  </span>
                )
              }
            >
              <ul className="flex max-h-[16rem] flex-col overflow-y-auto">
                {getYears()
                  .reverse()
                  .map((value: any, index: number) => (
                    <Menu.Item key={value}>
                      {({ active }) => (
                        <DropdownLink
                          href={`/${value}`}
                          className={classNames(
                            index === 0
                              ? "rounded-t"
                              : index === getYears().length - 1
                              ? "rounded-b"
                              : "rounded-none",
                            year === value
                              ? "bg-blue-500 text-white font-bold"
                              : active
                              ? "bg-gray-50"
                              : "text-gray-700",
                            "block px-4 py-2.5"
                          )}
                        >
                          {value}
                        </DropdownLink>
                      )}
                    </Menu.Item>
                  ))}
              </ul>
            </Dropdown>
          </li>
          <li>
            <Dropdown
              buttonClassName="!p-1 !border-none !shadow-none !bg-white h-[1.875rem]"
              className="md:hidden"
              label={<MenuIcon className="h-5 w-5 !text-black" />}
              showIcon={false}
            >
              <ul className="flex max-h-[16rem] flex-col overflow-y-auto">
                {menuLinks.map((link, index: number) => (
                  <Menu.Item key={link.label}>
                    {({ active }) => (
                      <DropdownLink
                        href={link.href}
                        className={classNames(
                          index === 0
                            ? "rounded-t"
                            : index === getYears().length - 1
                            ? "rounded-b"
                            : "rounded-none",
                          router.pathname === link.href
                            ? "bg-blue-500 text-white font-bold"
                            : active
                            ? "bg-gray-50"
                            : "text-gray-700",
                          "block px-4 py-2.5"
                        )}
                      >
                        {link.label}
                      </DropdownLink>
                    )}
                  </Menu.Item>
                ))}
              </ul>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
