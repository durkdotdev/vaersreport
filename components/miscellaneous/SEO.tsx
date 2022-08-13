import { NextSeo } from "next-seo";

interface SEOProps {
  description: string;
  title: string;
}

const SEO = ({ description, title }: SEOProps) => {
  return <NextSeo description={description} title={title} />;
};

export default SEO;
