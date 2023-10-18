import React from "react";

type ImageProps = {
  uri: string;
};

const Image: React.FC<ImageProps> = async ({ uri }) => {
  const response = await fetch("https://ipfs.io/ipfs/" + uri.split("//")[1]);
  const data = await response.json();
  let imageUrl = "https://ipfs.io/ipfs/" + data.image.split("//")[1];

  return (
    <img src={imageUrl} alt="NFT Image" className="h-80 hover:transition" />
  );
};

export default Image;
