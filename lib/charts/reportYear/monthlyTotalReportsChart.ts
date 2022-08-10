import data from "../../../data/data.json";
import { getComparisonYearlyMonthlyReportsMonth } from "../../calculations";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import {
  compareLessThan,
  getInYear,
  getTense,
  numberFormatter
} from "../../helpers";
import { ChartType } from "../../types";

const yearMonthlyTotalReportsChart: ChartType = {
  title: ([year]: any[]) => `VAERS Reports, Per Month, ${year}`,
  description: ([year]: any[]) => {
    const highestMonth = getComparisonYearlyMonthlyReportsMonth(year);
    const lowestMonth = getComparisonYearlyMonthlyReportsMonth(
      year,
      compareLessThan
    );
    return `${getInYear(year)}, reports peaked in ${dynamicTextSpanOpen}${
      highestMonth.name
    } (${highestMonth.total}) ${dynamicTextSpanClose} and ${getTense(
      year
    )} lowest in ${dynamicTextSpanOpen}${lowestMonth.name} (${
      lowestMonth.total
    })${dynamicTextSpanClose}.`;
  },
  data: ([year]: any[]) => data[year as keyof typeof data].totals_monthly,
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
        // fill: colors,
        maxBarSize: 30,
        name: "Domestic",
        stackId: "total"
      },
      {
        type: "bar",
        dataKey: "nd_total",
        // fill: color,
        maxBarSize: 30,
        name: "Nondomestic",
        stackId: "total"
      }
    ]
  }
};

export default yearMonthlyTotalReportsChart;
