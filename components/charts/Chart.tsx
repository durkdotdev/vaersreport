import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  Treemap,
  XAxis,
  YAxis
} from "recharts";

import type { ChartType } from "../../lib/types";
import ChartTitle from "../typography/ChartTitle";
import Paragraph from "../typography/Paragraph";
import SubText from "../typography/SubText";
import TreemapCustomContent from "./utils/TreemapCustomContent";

const componentTypes = {
  bar: Bar,
  line: Line
};

const chartTypes = {
  bar: BarChart,
  line: LineChart,
  treemap: Treemap
};

interface ChartProps {
  args?: any[];
  chart: ChartType;
}

const Chart = ({ args = [], chart }: ChartProps) => {
  const ChartPropsType =
    chartTypes[chart.props.type as keyof typeof chartTypes];
  return (
    <div className="!mt-16 !mb-28 flex w-full flex-col items-center space-y-8">
      <div className="flex w-full max-w-3xl flex-col items-center space-y-16">
        <Paragraph
          className="max-w-xl"
          dangerouslySetInnerHTML={{
            __html: chart.description(args)
          }}
        />
        <ChartTitle className="w-full">{chart.title(args)}</ChartTitle>
      </div>
      <div className="flex min-h-[12rem] w-full max-w-3xl justify-center sm:min-h-[16rem]">
        <ResponsiveContainer width="99.9%" {...chart.containerProps}>
          <ChartPropsType
            content={
              chart.props.type === "treemap" ? (
                <TreemapCustomContent />
              ) : undefined
            }
            data={chart.data(args)}
            {...(chart.props as unknown as typeof chartTypes[keyof typeof chartTypes])}
          >
            {chart.props.type !== "treemap" && (
              <CartesianGrid strokeDasharray="2 2" />
            )}
            <XAxis
              stroke="#000000"
              tick={{ fontSize: 12 }}
              {...chart.props.xAxis}
            />
            <YAxis
              stroke="#000000"
              tick={{ fontSize: 12 }}
              {...chart.props.yAxis}
            />
            {chart.props.components?.map((component: any) => {
              const ComponentType =
                componentTypes[component.type as keyof typeof componentTypes];
              // @ts-ignore
              return <ComponentType key={component.dataKey} {...component} />;
            })}
            {chart.props.tooltip && (
              <Tooltip
                cursor={{ fill: "transparent" }}
                wrapperStyle={{ fontSize: "12px" }}
                {...chart.props.tooltip}
              />
            )}
            {chart.props.legend && (
              <Legend
                wrapperStyle={{ fontSize: "12px" }}
                {...chart.props.legend}
              />
            )}
          </ChartPropsType>
        </ResponsiveContainer>
      </div>
      {chart.subText && (
        <SubText
          dangerouslySetInnerHTML={{
            __html: chart.subText(args)
          }}
        />
      )}
    </div>
  );
};

export default Chart;
