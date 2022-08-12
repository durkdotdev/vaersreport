import type { SectionType } from "../../lib/types";
import Divider from "../miscellaneous/Divider";
import SubText from "../typography/SubText";
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
      {section.subText && (
        <SubText
          className="!-mb-4 text-center"
          dangerouslySetInnerHTML={{
            __html: section.subText()
          }}
        />
      )}
      {section.charts.map((chart, index) => (
        <ReChart args={args} chart={chart} key={index} />
      ))}
    </>
  );
};

export default ChartsSection;
