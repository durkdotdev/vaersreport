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
  total_15_24: "15-24 years",
  total_25_64: "25-64 years",
  total_65_plus: "65+ years"
};

const reportAgesChart: ChartType = {
  title: ([year]: any[]) =>
    year ? `VAERS Victims, Ages, ${year}` : "VAERS Victims, Ages, All Years",
  description: ([year]: any[]) => {
    const computedData = year
      ? (data[year as keyof typeof data] as DataYearType).ages
      : data.total_ages;
    const highestAge = Object.keys(computedData).reduce((a, b) => {
      if (a.includes("unknown")) return b;
      if (b.includes("unknown")) return a;
      return computedData[a as keyof typeof computedData] >
        computedData[b as keyof typeof computedData]
        ? a
        : b;
    });
    return `Victims aged ${dynamicTextSpanOpen}${
      broadAgeGroups[highestAge as keyof typeof broadAgeGroups]
    }${dynamicTextSpanClose}${
      getTense(year).includes("have") ? " have" : ""
    } experienced ${dynamicTextSpanOpen}${numberFormatter(
      100 *
        (computedData[highestAge as keyof typeof computedData] /
          (year
            ? (data[year as keyof typeof data] as DataYearType).totals.total -
              computedData.total_unknown
            : data.total_reports - computedData.total_unknown))
    )}%${dynamicTextSpanClose} of adverse events.`;
  },
  subText: ([year]: any[]) => {
    const computedData = year
      ? (data[year as keyof typeof data] as DataYearType).ages
      : data.total_ages;
    return `*Note: For ${dynamicPointSpanOpen}${numberFormatter(
      computedData.total_unknown
    )}${dynamicPointSpanClose} reports the age of the victim was unkown.`;
  },
  data: ([year]: any[]) => [
    year
      ? (data[year as keyof typeof data] as DataYearType).ages
      : data.total_ages
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

export default reportAgesChart;
