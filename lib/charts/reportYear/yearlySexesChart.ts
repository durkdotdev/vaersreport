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

const yearlySexesChart: ChartType = {
  title: ([year]: any[]) => `VAERS Victims, Sexes, ${year}`,
  description: ([year]: any[]) => {
    const yearlySexes = (data[year as keyof typeof data] as DataYearType).sexes;
    const higherSex =
      yearlySexes.total_female > yearlySexes.total_male
        ? { number: yearlySexes.total_female, sex: "female" }
        : { number: yearlySexes.total_male, sex: "male" };
    return `${dynamicTextSpanOpen}${numberFormatter(
      100 *
        (higherSex.number / (yearlySexes.total_female + yearlySexes.total_male))
    )}%${dynamicTextSpanClose} of reports with a specified victim gender ${getTense(
      year
    )} ${dynamicTextSpanOpen}${higherSex.sex}s${dynamicTextSpanClose}.`;
  },
  subText: ([year]: any[]) => {
    const yearlySexes = (data[year as keyof typeof data] as DataYearType).sexes;
    return `*Note: For ${dynamicPointSpanOpen}${numberFormatter(
      yearlySexes.total_unkown
    )}${dynamicPointSpanClose} reports the gender of the victim was unkown.`;
  },
  data: ([year]: any[]) => [
    (data[year as keyof typeof data] as DataYearType).sexes
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

export default yearlySexesChart;
