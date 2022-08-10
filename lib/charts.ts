import { getTotalReports, getYearlyTotalReports } from "./calculations";
import totalReportsChart from "./charts/report/totalReportsChart";
import yearMonthlyTotalReportsChart from "./charts/reportYear/monthlyTotalReportsChart";
import { dynamicPointSpanClose, dynamicPointSpanOpen } from "./dynamicText";
import { getTense } from "./helpers";

const charts = {
  "/report": {
    title: () => `VAERS Report, 1990-${new Date().getFullYear()}`,
    points: () => [
      `There have been ${dynamicPointSpanOpen}${getTotalReports()}${dynamicPointSpanClose} total reports submitted to VAERS.`
    ],
    sections: [
      {
        title: "General Overview",
        charts: [totalReportsChart]
      },
      {
        title: "Outcomes of Adverse Events",
        charts: []
      },
      {
        title: "Vaccine Analysis",
        charts: []
      }
    ]
  },
  "/report/[year]": {
    title: ([year]: any[]) => `VAERS Report, ${year}`,
    points: ([year]: any[]) => [
      `There ${getTense(year)} ${dynamicPointSpanOpen}${getYearlyTotalReports(
        year
      )}${dynamicPointSpanClose} total reports submitted to VAERS in ${year}.`
    ],
    sections: [
      {
        title: "General Overview",
        charts: [yearMonthlyTotalReportsChart]
      },
      {
        title: "Outcomes of Adverse Events",
        charts: []
      },
      {
        title: "Vaccine Analysis",
        charts: []
      }
    ]
  }
};

export default charts;
