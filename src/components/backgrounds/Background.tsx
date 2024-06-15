import * as React from "react";

interface BackgroundProps {
  image: string;
}

const Background: React.FunctionComponent<BackgroundProps> = ({ image }) => {
  return (
    <div
      className="hidden min-h-screen lg:flex lg:w-1/2 xl:w-2/3 2xl:w-3/4
        bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default Background;
