import data from "../../../data/data.json";
import { divergingColors } from "../../colors";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { numberFormatter } from "../../helpers";
import { ChartType } from "../../types";

const totalOutcomesChart: ChartType = {
  title: () => "VAERS Outcomes, Injuries vs. Death, All Years",
  description: () =>
    `${dynamicTextSpanOpen}${numberFormatter(
      100 - data.total_outcomes.fatality_percentage
    )}%${dynamicTextSpanClose} of reports have been non-fatal injuries.`,
  data: () => [data.total_outcomes],
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

export default totalOutcomesChart;
