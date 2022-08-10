import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { Fragment, ReactNode } from "react";

interface DropdownProps {
  buttonClassName?: string;
  children: ReactNode;
  label: string;
}

const Dropdown = ({ buttonClassName, children, label }: DropdownProps) => {
  const buttonClasses = classNames(
    "inline-flex w-full justify-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 focus:outline-none",
    buttonClassName
  );
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={buttonClasses}>
          {label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded border border-gray-300 bg-white shadow">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
