import React from "react";

type ImageProps = {
  uri: string;
};

const Image: React.FC<ImageProps> = async ({ uri }) => {
  const response = await fetch(uri);
  const data = await response.json();

  return (
    <img src={data.image} alt="NFT Image" className="h-80 hover:transition" />
  );
};

export default Image;
