import data from "../data/data.json";
import { compareGreaterThan, getYears, numberFormatter } from "./helpers";

export const getTotalReports = (format = true) => {
  const total = getYears().reduce((total, year) => {
    return total + data[year as keyof typeof data].totals.total;
  }, 0);
  return format ? numberFormatter(total) : total;
};

export const getYearlyTotalReports = (year: string, format = true) => {
  const total = data[year as keyof typeof data].totals.total;
  return format ? numberFormatter(total) : total;
};

export const getYearlyMonthlyTotalReports = (year: string) => {
  return data[year as keyof typeof data].totals_monthly;
};

export const getHighestYearlyReportsYear = (format = true) => {
  let highestYear = data[1990].totals;
  getYears().forEach((year) => {
    const yearTotals = data[year as keyof typeof data].totals;
    if (yearTotals.total > highestYear.total) highestYear = yearTotals;
  });
  return format
    ? { ...highestYear, total: numberFormatter(highestYear.total) }
    : highestYear;
};

export const getComparisonYearlyMonthlyReportsMonth = (
  year: string,
  comparison = compareGreaterThan,
  format = true
) => {
  const monthlyTotals = data[year as keyof typeof data].totals_monthly;
  let targetMonth = monthlyTotals[0];
  monthlyTotals.forEach((month) => {
    if (targetMonth.total === 0 && month.total > 0) targetMonth = month;
    else if (month.total > 0 && comparison(month.total, targetMonth.total))
      targetMonth = month;
  });
  return format
    ? { ...targetMonth, total: numberFormatter(targetMonth.total) }
    : targetMonth;
};
