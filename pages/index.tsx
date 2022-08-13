import { NextPage } from "next";

import ChartsWrapper from "../components/charts/ChartsWrapper";
import Page from "../components/layout/Page";
import SEO from "../components/miscellaneous/SEO";

const HomePage: NextPage = () => {
  return (
    <>
      <SEO
        title={`VAERS Report, 1990-${new Date().getFullYear()}`}
        description="VAERS Report is an open source project presenting analysis of VAERS reports in interactive and dynamic charts."
      />
      <Page>
        <ChartsWrapper chartsKey="report" />
      </Page>
    </>
  );
};

export default HomePage;
