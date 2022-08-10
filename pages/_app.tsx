import "../styles/styles.css";

import type { AppProps } from "next/app";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import ContributeBanner from "../components/miscellaneous/ContributeBanner";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <ContributeBanner />
      <Footer />
    </>
  );
};

export default MyApp;
