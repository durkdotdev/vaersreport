import data from "../../../data/data.json";
import { sequentialColors } from "../../colors";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { getYears, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const totalReportsChart: ChartType = {
  title: () => "VAERS Reports, Per Year",
  description: () =>
    `Adverse events have steadily increased since 1990. Reports for a single year peaked in ${dynamicTextSpanOpen}${
      data.highest_yearly_total.year
    }${dynamicTextSpanClose} with ${dynamicTextSpanOpen}${numberFormatter(
      data.highest_yearly_total.total
    )}${dynamicTextSpanClose} total reports.`,
  data: () =>
    getYears().map(
      (year) => (data[year as keyof typeof data] as DataYearType).totals
    ),
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
        fill: sequentialColors[0],
        name: "Domestic",
        stackId: "total"
      },
      {
        type: "bar",
        dataKey: "nd_total",
        fill: sequentialColors[1],
        name: "Nondomestic",
        stackId: "total"
      }
    ]
  }
};

export default totalReportsChart;
