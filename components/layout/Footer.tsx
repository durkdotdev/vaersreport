import { ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";

import SubText from "../typography/SubText";

const footerGroups = [
  {
    title: "Project",
    links: [
      { href: "/project/about", label: "About" },
      { href: "/project/contact", label: "Contact" },
      { href: "/project/faq", label: "FAQ" }
    ]
  },
  {
    title: "Education",
    links: [
      { href: "/education/resources", label: "Resources" },
      {
        href: "https://vaers.hhs.gov",
        isExternal: true,
        label: "VAERS Website"
      }
    ]
  },
  {
    title: "Contribute",
    links: [
      {
        href: "https://github.com/durkdotdev/vaersreport",
        isExternal: true,
        label: "GitHub"
      },
      { href: "/contribute/support", label: "Support" }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="flex justify-center px-6 py-12">
      <div className="flex w-full max-w-xl flex-col space-y-6">
        <button
          className="group -ml-1 flex w-[fit-content] items-center space-x-2 p-1"
          onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
        >
          <ChevronUpIcon className="h-4 w-4" />
          <SubText className="!text-xs group-hover:underline">
            Back to Top
          </SubText>
        </button>
        <div className="flex flex-col justify-between space-y-8 sm:flex-row sm:space-y-0">
          {footerGroups.map((group) => (
            <div className="flex flex-col space-y-2" key={group.title}>
              <span className="text-sm font-bold text-gray-700">
                {group.title}
              </span>
              <ul className="flex flex-col space-y-2 text-sm font-light">
                {group.links.map((link) => (
                  <Link href={link.href} key={link.label}>
                    <a
                      className="hover:underline"
                      target={link.isExternal ? "_blank" : "_self"}
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
