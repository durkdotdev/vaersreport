import charts from "./charts";

export type ChartType = {
  title: (args: any[]) => string;
  description: (args: any[]) => string;
  data: (args: any[]) => any;
  props: {
    type: string;
    [index: string]: any;
  };
  [index: string]: any;
};

const exampleSection = charts["/report"].sections[0];
export type SectionType = typeof exampleSection;
