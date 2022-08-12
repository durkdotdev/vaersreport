import data from "../data/data.json";
import totalAgesChart from "./charts/report/totalAgesChart";
import totalOutcomesChart from "./charts/report/totalOutcomes";
import totalReportsChart from "./charts/report/totalReportsChart";
import totalSexesChart from "./charts/report/totalSexesChart";
import totalVaccineTotalsChart from "./charts/report/totalVaccineTotalsChart";
import yearlyAgesChart from "./charts/reportYear/yearlyAgesChart";
import yearlyOutcomesChart from "./charts/reportYear/yearlyOutcomesChart";
import yearlySexesChart from "./charts/reportYear/yearlySexesChart";
import yearlyVaccineTotalsChart from "./charts/reportYear/yearlyVaccineTotalsChart";
import yearMonthlyTotalReportsChart from "./charts/reportYear/yearMonthlyTotalReportsChart";
import { dynamicPointSpanClose, dynamicPointSpanOpen } from "./dynamicText";
import { getTense, numberFormatter } from "./helpers";
import { DataYearType } from "./types";

const charts = {
  "/report": {
    title: () => `VAERS Report, 1990-${new Date().getFullYear()}`,
    points: () => [
      `There have been ${dynamicPointSpanOpen}${numberFormatter(
        data.total_reports
      )}${dynamicPointSpanClose} total reports submitted to VAERS.`
    ],
    sections: [
      {
        title: "General Overview",
        charts: [totalReportsChart, totalSexesChart, totalAgesChart]
      },
      {
        title: "Outcomes of Adverse Events",
        charts: [totalOutcomesChart]
      },
      {
        title: "Vaccine Analysis",
        charts: [totalVaccineTotalsChart]
      }
    ]
  },
  "/report/[year]": {
    title: ([year]: any[]) => `VAERS Report, ${year}`,
    points: ([year]: any[]) => [
      `There ${getTense(year)} ${dynamicPointSpanOpen}${numberFormatter(
        (data[year as keyof typeof data] as DataYearType).totals.total
      )}
      ${dynamicPointSpanClose} total reports submitted to VAERS in ${year}.`
    ],
    sections: [
      {
        title: "General Overview",
        charts: [
          yearMonthlyTotalReportsChart,
          yearlySexesChart,
          yearlyAgesChart
        ]
      },
      {
        title: "Outcomes of Adverse Events",
        charts: [yearlyOutcomesChart]
      },
      {
        title: "Vaccine Analysis",
        charts: [yearlyVaccineTotalsChart]
      }
    ]
  }
};

export default charts;
