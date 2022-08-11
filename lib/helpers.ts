import data from "../data/data.json";

export const compareLessThan = (x: number, y: number) => x < y;
export const compareGreaterThan = (x: number, y: number) => x > y;

export const getInYear = (year: string) => {
  return year === new Date().getFullYear().toString()
    ? `So far, in ${year}`
    : `In ${year}`;
};

export const getTense = (year: string) => {
  return year === new Date().getFullYear().toString() ? "have been" : "were";
};

export const getYears = () => {
  return Object.keys(data).filter((key) => parseInt(key) >= 1990);
};

export const numberFormatter = (value: number) => {
  return new Intl.NumberFormat("en").format(value);
};
