import data from "../../../data/data.json";
import { sequentialColors } from "../../colors";
import {
  dynamicPointSpanClose,
  dynamicPointSpanOpen,
  dynamicTextSpanClose,
  dynamicTextSpanOpen
} from "../../dynamicText";
import { numberFormatter } from "../../helpers";
import { ChartType } from "../../types";

const broadAgeGroups = {
  total_0_5: "0-5 years",
  total_6_14: "6-14 years",
  "total_15-24": "15-24 years",
  total_25_64: "25-64 years",
  total_65_plus: "65+ years"
};

const totalAgesChart: ChartType = {
  title: () => "VAERS Victims, Ages, All Years",
  description: () => {
    const highestAge = Object.keys(data.total_ages).reduce((a, b) =>
      data.total_ages[a as keyof typeof data.total_ages] >
        data.total_ages[b as keyof typeof data.total_ages] &&
      !a.includes("unknown")
        ? a
        : b
    );
    return `The broad age group of ${dynamicTextSpanOpen}${
      broadAgeGroups[highestAge as keyof typeof broadAgeGroups]
    } (${numberFormatter(
      100 *
        (data.total_ages[highestAge as keyof typeof data.total_ages] /
          data.total_reports)
    )}%)${dynamicTextSpanClose} has experienced the most adverse events.`;
  },
  subText: () =>
    `*Note: For ${dynamicPointSpanOpen}${numberFormatter(
      data.total_ages.total_unknown
    )}${dynamicPointSpanClose} reports the age of the victim was unkown.`,
  data: () => [data.total_ages],
  props: {
    type: "bar",
    maxBarSize: 60,
    xAxis: {
      dataKey: "abbreviation",
      tick: false
    },
    yAxis: {
      width: 55
    },
    legend: {},
    tooltip: {
      formatter: numberFormatter,
      labelFormatter: () => "Ages"
    },
    components: [
      {
        type: "bar",
        dataKey: "total_0_5",
        fill: sequentialColors[0],
        name: "0-5 years"
      },
      {
        type: "bar",
        dataKey: "total_6_14",
        fill: sequentialColors[1],
        name: "6-14 years"
      },
      {
        type: "bar",
        dataKey: "total_15_24",
        fill: sequentialColors[2],
        name: "15-24 years"
      },
      {
        type: "bar",
        dataKey: "total_25_64",
        fill: sequentialColors[3],
        name: "25-64 years"
      },
      {
        type: "bar",
        dataKey: "total_65_plus",
        fill: sequentialColors[4],
        name: "65+ years"
      }
    ]
  }
};

export default totalAgesChart;
