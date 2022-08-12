import data from "../../../data/data.json";
import { sequentialColors } from "../../colors";
import {
  dynamicPointSpanClose,
  dynamicPointSpanOpen,
  dynamicTextSpanClose,
  dynamicTextSpanOpen
} from "../../dynamicText";
import { getTense, numberFormatter } from "../../helpers";
import { ChartType, DataYearType } from "../../types";

const broadAgeGroups = {
  total_0_5: "0-5 years",
  total_6_14: "6-14 years",
  "total_15-24": "15-24 years",
  total_25_64: "25-64 years",
  total_65_plus: "65+ years"
};

const yearlyAgesChart: ChartType = {
  title: ([year]: any[]) => `VAERS Victims, Ages, ${year}`,
  description: ([year]: any[]) => {
    const yearlySexes = (data[year as keyof typeof data] as DataYearType).ages;
    const highestAge = Object.keys(yearlySexes).reduce((a, b) =>
      yearlySexes[a as keyof typeof yearlySexes] >
        yearlySexes[b as keyof typeof yearlySexes] && !a.includes("unknown")
        ? a
        : b
    );
    return `The broad age group of ${dynamicTextSpanOpen}${
      broadAgeGroups[highestAge as keyof typeof broadAgeGroups]
    } (${numberFormatter(
      100 *
        (yearlySexes[highestAge as keyof typeof yearlySexes] /
          ((data[year as keyof typeof data] as DataYearType).totals.total -
            yearlySexes.total_unknown))
    )}%)${dynamicTextSpanClose}${
      getTense(year).includes("have") ? " has" : ""
    } experienced the most adverse events.`;
  },
  subText: ([year]: any[]) => {
    const yearlySexes = (data[year as keyof typeof data] as DataYearType).ages;
    return `*Note: For ${dynamicPointSpanOpen}${numberFormatter(
      yearlySexes.total_unknown
    )}${dynamicPointSpanClose} reports the age of the victim was unkown.`;
  },
  data: ([year]: any[]) => [
    (data[year as keyof typeof data] as DataYearType).ages
  ],
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

export default yearlyAgesChart;
