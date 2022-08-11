import Link from "next/link";

import LinkTag from "../typography/LinkTag";
import Paragraph from "../typography/Paragraph";
import Divider from "./Divider";

const ContributeBanner = () => {
  return (
    <div className="my-16 flex w-full justify-center px-6 md:mt-20">
      <div className="flex w-full max-w-4xl flex-col items-center space-y-8 ">
        <Divider>Contribute</Divider>
        <Paragraph>
          VAERS Report is proudly{" "}
          <Link href="https://github.com/durkdotdev/vaers-report">
            <a target="_blank">
              <LinkTag>open-source</LinkTag>
            </a>
          </Link>
          . Want to contribute? This project is open to the community for
          proposed contributions and new features.
        </Paragraph>
      </div>
    </div>
  );
};

export default ContributeBanner;
