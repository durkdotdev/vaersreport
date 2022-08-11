import Link from "next/link";

import type { SectionType } from "../../lib/types";
import Divider from "../miscellaneous/Divider";
import LinkTag from "../typography/LinkTag";
import Paragraph from "../typography/Paragraph";
import ReChart from "./Chart";

interface ChartsSectionProps {
  args: any[];
  index: number;
  section: SectionType;
}

const ChartsSection = ({ args, index, section }: ChartsSectionProps) => {
  return (
    <>
      <Divider className="max-w-3xl items-center">
        Part {index + 1}: {section.title}
      </Divider>
      {index + 1 === 3 && (
        <Paragraph>
          <b>*</b>For vaccine codes and descriptions, see{" "}
          <Link href="https://vaers.hhs.gov/docs/VAERSDataUseGuide_en_September2021.pdf#page=9">
            <a target="_blank">
              <LinkTag>the VAERS{"'"} Data Use Guide</LinkTag>
            </a>
          </Link>
          .
        </Paragraph>
      )}
      {section.charts.map((chart, index) => (
        <ReChart args={args} chart={chart} key={index} />
      ))}
    </>
  );
};

export default ChartsSection;
