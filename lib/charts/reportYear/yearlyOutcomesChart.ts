import data from "../../../data/data.json";
import { divergingColors } from "../../colors";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { getTense, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const yearlyOutcomesChart: ChartType = {
  title: ([year]: any[]) => `VAERS Outcomes, Injuries vs. Death, ${year}`,
  description: ([year]: any[]) =>
    `${dynamicTextSpanOpen}${numberFormatter(
      100 -
        (data[year as keyof typeof data] as DataYearType).outcomes
          .fatality_percentage
    )}%${dynamicTextSpanClose} of reports ${getTense(
      year
    )} non-fatal injuries.`,
  data: ([year]: any[]) => [
    (data[year as keyof typeof data] as DataYearType).outcomes
  ],
  props: {
    type: "bar",
    layout: "vertical",
    barSize: 25,
    xAxis: {
      type: "number"
    },
    yAxis: {
      domain: [0],
      tickFormatter: () => "Total",
      type: "category",
      width: 30
    },
    legend: {},
    tooltip: {
      formatter: numberFormatter,
      labelFormatter: () => "Outcomes"
    },
    components: [
      {
        type: "bar",
        dataKey: "total_injuries",
        fill: divergingColors[0],
        name: "Injuries",
        stackId: "outcomes"
      },
      {
        type: "bar",
        dataKey: "total_hospitilizations",
        fill: divergingColors[7],
        name: "Hospitilizations",
        stackId: "outcomes"
      },
      {
        type: "bar",
        dataKey: "total_deaths",
        fill: divergingColors[8],
        name: "Deaths",
        stackId: "outcomes"
      }
    ]
  }
};

export default yearlyOutcomesChart;
