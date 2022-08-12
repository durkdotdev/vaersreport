import data from "../../../data/data.json";
import { sequentialColors } from "../../colors";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { getInYear, getYears, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const reportTotalsChart: ChartType = {
  title: ([year]: any[]) =>
    year
      ? `VAERS Reports, Per Month, ${year}`
      : "VAERS Reports, Per Year, All Years",
  description: ([year]: any[]) => {
    if (year) {
      const highestMonthlyTotal = (
        data[year as keyof typeof data] as DataYearType
      ).totals_monthly.highest_monthly_total;
      return `${getInYear(year)}, reports peaked in ${dynamicTextSpanOpen}${
        highestMonthlyTotal.name
      } (${numberFormatter(
        highestMonthlyTotal.total
      )})${dynamicTextSpanClose}.`;
    }
    return `Adverse events have steadily increased since 1990. Reports for a single year peaked in ${dynamicTextSpanOpen}${
      data.highest_yearly_total.year
    }${dynamicTextSpanClose} with ${dynamicTextSpanOpen}${numberFormatter(
      data.highest_yearly_total.total
    )}${dynamicTextSpanClose} total reports.`;
  },
  data: ([year]: any[]) =>
    year
      ? (data[year as keyof typeof data] as DataYearType).totals_monthly.totals
      : getYears().map(
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

export default reportTotalsChart;
