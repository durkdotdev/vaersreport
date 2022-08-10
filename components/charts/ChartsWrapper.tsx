import charts from "../../lib/charts";
import ChartsIntroduction from "./ChartsIntroduction";
import ChartsSection from "./ChartsSection";

interface ChartsWrapperProps {
  args?: any[];
  chartsKey: string;
}

const ChartsWrapper = ({ args, chartsKey }: ChartsWrapperProps) => {
  const chartsData = charts[chartsKey as keyof typeof charts];
  return (
    <>
      <ChartsIntroduction
        points={chartsData.points(args || [])}
        title={chartsData.title(args || [])}
      />
      {chartsData.sections.map((section, index) => (
        <ChartsSection
          args={args || []}
          index={index}
          key={section.title}
          section={section}
        />
      ))}
    </>
  );
};

export default ChartsWrapper;
