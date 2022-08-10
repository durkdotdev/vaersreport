import { GetStaticPaths, GetStaticProps } from "next";

import ChartsWrapper from "../../components/charts/ChartsWrapper";
import Page from "../../components/layout/Page";
import { getYears } from "../../lib/helpers";

interface YearPageProps {
  year: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getYears().map((year) => {
      return { params: { year: year.toString() } };
    }),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { year: params?.year } };
};

const ReportYear = ({ year }: YearPageProps) => {
  return (
    <>
      <Page>
        <ChartsWrapper args={[year]} chartsKey="/report/[year]" />
      </Page>
    </>
  );
};

export default ReportYear;
