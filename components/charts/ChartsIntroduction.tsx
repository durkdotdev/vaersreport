import Divider from "../miscellaneous/Divider";
import PageTitle from "../typography/PageTitle";

interface ChartsIntroductionProps {
  points: string[];
  title: string;
}

const ChartsIntroduction = ({ points, title }: ChartsIntroductionProps) => {
  return (
    <div className="!mb-12 flex w-full flex-col items-center space-y-8">
      <PageTitle>{title}</PageTitle>
      <Divider className="!mt-4" />
      <div className="flex min-h-[3rem] w-full max-w-xl flex-col space-y-4">
        {points.map((point, index) => (
          <div className="flex w-full space-x-4" key={index}>
            <div className="mt-2 h-2.5 w-2.5 bg-black" />
            <span
              className="flex-1 text-lg font-light"
              dangerouslySetInnerHTML={{ __html: point }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsIntroduction;
