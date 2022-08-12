import data from "../data/data.json";
import reportAgesChart from "./charts/report/reportAgesChart";
import reportOutcomesChart from "./charts/report/reportOutcomesChart";
import reportSexChart from "./charts/report/reportSexesChart";
import reportTotalsChart from "./charts/report/reportTotalsChart";
import reportVaccinesChart from "./charts/report/reportVaccinesChart";
import { dynamicPointSpanClose, dynamicPointSpanOpen } from "./dynamicText";
import { getTense, numberFormatter } from "./helpers";
import { DataYearType } from "./types";

const charts = {
  report: {
    title: ([year]: any[]) =>
      year
        ? `VAERS Report, ${year}`
        : `VAERS Report, 1990-${new Date().getFullYear()}`,
    points: ([year]: any[]) => {
      const computedDataPoint1 = year
        ? (data[year as keyof typeof data] as DataYearType).totals.total
        : data.total_reports;
      return [
        `There ${getTense(year)} ${dynamicPointSpanOpen}${numberFormatter(
          computedDataPoint1
        )}
      ${dynamicPointSpanClose} total reports submitted to VAERS in ${year}.`
      ];
    },
    sections: [
      {
        title: "General Overview",
        charts: [reportTotalsChart, reportSexChart, reportAgesChart]
      },
      {
        title: "Outcomes of Adverse Events",
        charts: [reportOutcomesChart]
      },
      {
        title: "Vaccine Analysis",
        subText: () => `<b>*</b>For vaccine codes and descriptions, see
        <a href="https://vaers.hhs.gov/docs/VAERSDataUseGuide_en_September2021.pdf#page=9" target="_blank">
          <span class="font-bold text-blue-500 underline hover:text-blue-600">the VAERS' Data Use Guide</span>
        </a>.`,
        charts: [reportVaccinesChart]
      }
    ]
  }
};

export default charts;
