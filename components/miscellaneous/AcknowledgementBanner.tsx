const AcknowledgementBanner = () => {
  return (
    <div className="w-full bg-blue-500 px-6 py-2 text-center text-sm font-bold text-white md:text-base">
      <span>
        Made with 💕 by{" "}
        <a
          className="underline"
          href="https://github.com/durkdotdev"
          target="_blank"
          rel="noreferrer"
        >
          durkdotdev
        </a>
        .
      </span>
    </div>
  );
};

export default AcknowledgementBanner;
