import data from "../../../data/data.json";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { getTense, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const reportVaccinesChart: ChartType = {
  title: ([year]: any[]) =>
    year
      ? `VAERS Reports, By Vaccine, ${year}`
      : "VAERS Reports, By Vaccine, All Years",
  description: ([year]: any[]) => {
    const computedData = year
      ? (data[year as keyof typeof data] as DataYearType).vaccines
      : data.total_vaccines;
    return `There ${getTense(year)} ${dynamicTextSpanOpen}${
      computedData.vaccines_list.length
    }${dynamicTextSpanClose} vaccines with at least one VAERS report submitted.`;
  },
  data: ([year]: any[]) =>
    year
      ? (data[year as keyof typeof data] as DataYearType).vaccines.totals
      : data.total_vaccines.totals,
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

export default reportVaccinesChart;
