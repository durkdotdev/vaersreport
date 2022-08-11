import data from "../../../data/data.json";
import { dynamicTextSpanClose, dynamicTextSpanOpen } from "../../dynamicText";
import { numberFormatter } from "../../helpers";
import { ChartType } from "../../types";

const totalVaccineTotalsChart: ChartType = {
  title: () => "VAERS Reports, By Vaccine, All Years",
  description: () =>
    `There have been ${dynamicTextSpanOpen}${data.total_vaccines.vaccines_list.length}${dynamicTextSpanClose} vaccines with at least one VAERS report submitted.`,
  data: () => data.total_vaccines.totals,
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

export default totalVaccineTotalsChart;
