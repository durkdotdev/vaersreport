import { NextPage } from "next";

import ChartsWrapper from "../components/charts/ChartsWrapper";
import Page from "../components/layout/Page";

const HomePage: NextPage = () => {
  return (
    <>
      <Page>
        <ChartsWrapper chartsKey="/report" />
      </Page>
    </>
  );
};

export default HomePage;
