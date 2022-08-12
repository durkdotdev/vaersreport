import data from "../../../data/data.json";
import { divergingColors } from "../../colors";
import {
  dynamicPointSpanClose,
  dynamicPointSpanOpen,
  dynamicTextSpanClose,
  dynamicTextSpanOpen
} from "../../dynamicText";
import { numberFormatter } from "../../helpers";
import { ChartType } from "../../types";

const totalSexesChart: ChartType = {
  title: () => "VAERS Victims, Sexes, All Years",
  description: () => {
    const higherSex =
      data.total_sexes.total_female > data.total_sexes.total_male
        ? { number: data.total_sexes.total_female, sex: "female" }
        : { number: data.total_sexes.total_male, sex: "male" };
    return `${dynamicTextSpanOpen}${numberFormatter(
      100 *
        (higherSex.number /
          (data.total_sexes.total_female + data.total_sexes.total_male))
    )}%${dynamicTextSpanClose} of reports with a specified victim gender have been ${dynamicTextSpanOpen}${
      higherSex.sex
    }s${dynamicTextSpanClose}.`;
  },
  subText: () =>
    `*Note: For ${dynamicPointSpanOpen}${numberFormatter(
      data.total_sexes.total_unkown
    )}${dynamicPointSpanClose} reports the gender of the victim was unkown.`,
  data: () => [data.total_sexes],
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

export default totalSexesChart;
