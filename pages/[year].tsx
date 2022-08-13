import { GetStaticPaths, GetStaticProps } from "next";

import ChartsWrapper from "../components/charts/ChartsWrapper";
import Page from "../components/layout/Page";
import SEO from "../components/miscellaneous/SEO";
import { getYears } from "../lib/helpers";

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

const YearPage = ({ year }: YearPageProps) => {
  return (
    <>
      <SEO
        title={`VAERS Report, ${year}`}
        description={`Analysis and interactive charts covering VAERS reports for ${year}.`}
      />
      <Page>
        <ChartsWrapper args={[year]} chartsKey="report" />
      </Page>
    </>
  );
};

export default YearPage;
