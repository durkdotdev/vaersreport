import data from "../../../data/data.json";
import { divergingColors } from "../../colors";
import {
  dynamicPointSpanClose,
  dynamicPointSpanOpen,
  dynamicTextSpanClose,
  dynamicTextSpanOpen
} from "../../dynamicText";
import { getTense, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const reportSexChart: ChartType = {
  title: ([year]: any[]) =>
    year ? `VAERS Victims, Sexes, ${year}` : "VAERS Victims, Sexes, All Years",
  description: ([year]: any[]) => {
    const computedData = year
      ? (data[year as keyof typeof data] as DataYearType).sexes
      : data.total_sexes;
    const higherSex =
      computedData.total_female > computedData.total_male
        ? { number: computedData.total_female, sex: "female" }
        : { number: computedData.total_male, sex: "male" };
    return `${dynamicTextSpanOpen}${numberFormatter(
      100 *
        (higherSex.number /
          (computedData.total_female + computedData.total_male))
    )}%${dynamicTextSpanClose} of report victims ${getTense(
      year
    )} ${dynamicTextSpanOpen}${higherSex.sex}${dynamicTextSpanClose}.`;
  },
  subText: ([year]: any[]) => {
    const computedData = year
      ? (data[year as keyof typeof data] as DataYearType).sexes
      : data.total_sexes;
    return `*Note: For ${dynamicPointSpanOpen}${numberFormatter(
      computedData.total_unkown
    )}${dynamicPointSpanClose} reports the gender of the victim was unkown.`;
  },
  data: ([year]: any[]) => [
    year
      ? (data[year as keyof typeof data] as DataYearType).sexes
      : data.total_sexes
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
      labelFormatter: () => "Sexes"
    },
    components: [
      {
        type: "bar",
        dataKey: "total_female",
        fill: divergingColors[0],
        name: "Females",
        stackId: "sexes"
      },
      {
        type: "bar",
        dataKey: "total_male",
        fill: divergingColors[8],
        name: "Males",
        stackId: "sexes"
      }
    ]
  }
};

export default reportSexChart;
