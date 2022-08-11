import data from "../../../data/data.json";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { getTense, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const yearlyVaccineTotalsChart: ChartType = {
  title: ([year]: any[]) => `VAERS Reports, By Vaccine, ${year}`,
  description: ([year]: any[]) => {
    const yearlyVaccines = (data[year as keyof typeof data] as DataYearType)
      .vaccines;
    return `There ${getTense(year)} ${dynamicTextSpanOpen}${
      yearlyVaccines.vaccines_list.length
    }${dynamicTextSpanClose} vaccines with at least one VAERS report submitted.`;
  },
  data: ([year]: any[]) =>
    (data[year as keyof typeof data] as DataYearType).vaccines.totals,
  props: {
    type: "treemap",
    dataKey: "total",
    fill: "#8884d8",
    tooltip: {
      formatter: (value: number) => [numberFormatter(value), "Reports"],
      labelFormatter: (name: string, payload: any) =>
        payload && payload[0] ? payload[0].payload.vax_type : ""
    }
  }
};

export default yearlyVaccineTotalsChart;
