import data from "../../../data/data.json";
import { sequentialColors } from "../../colors";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { getInYear, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const yearMonthlyTotalReportsChart: ChartType = {
  title: ([year]: any[]) => `VAERS Reports, Monthly, Per Month, ${year}`,
  description: ([year]: any[]) => {
    const highestMonthlyTotal = (
      data[year as keyof typeof data] as DataYearType
    ).totals_monthly.highest_monthly_total;
    return `${getInYear(year)}, reports peaked in ${dynamicTextSpanOpen}${
      highestMonthlyTotal.name
    } (${numberFormatter(highestMonthlyTotal.total)})${dynamicTextSpanClose}.`;
  },
  data: ([year]: any[]) =>
    (data[year as keyof typeof data] as DataYearType).totals_monthly.totals,
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
        payload[0] ? payload[0].payload.name : ""
    },
    components: [
      {
        type: "bar",
        dataKey: "d_total",
        fill: sequentialColors[0],
        maxBarSize: 30,
        name: "Domestic",
        stackId: "total"
      },
      {
        type: "bar",
        dataKey: "nd_total",
        fill: sequentialColors[1],
        maxBarSize: 30,
        name: "Nondomestic",
        stackId: "total"
      }
    ]
  }
};

export default yearMonthlyTotalReportsChart;
