import data from "../../../data/data.json";
import { getHighestYearlyReportsYear } from "../../calculations";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { getYears, numberFormatter } from "../../helpers";
import { ChartType } from "../../types";

const totalReportsChart: ChartType = {
  title: () => "VAERS Reports, Per Year",
  description: () => {
    const highestYear = getHighestYearlyReportsYear();
    return `Adverse events have steadily increased since 1990. Reports for a single year peaked in ${dynamicTextSpanOpen}${highestYear.year}${dynamicTextSpanClose} with ${dynamicTextSpanOpen}${highestYear.total}${dynamicTextSpanClose} total reports.`;
  },
  data: () => getYears().map((year) => data[year as keyof typeof data].totals),
  props: {
    type: "bar",
    xAxis: {
      dataKey: "abbreviation"
    },
    yAxis: {
      width: 55
    },
    legend: {},
    tooltip: {
      formatter: numberFormatter,
      labelFormatter: (value: number, payload: any) =>
        payload[0] ? payload[0].payload.year : ""
    },
    components: [
      {
        type: "bar",
        dataKey: "d_total",
        // fill: color,
        name: "Domestic",
        stackId: "total"
      },
      {
        type: "bar",
        dataKey: "nd_total",
        // fill: color,
        name: "Nondomestic",
        stackId: "total"
      }
    ]
  }
};

export default totalReportsChart;
