"use client";

import React, { useState, useEffect } from "react";

type ImageProps = {
  uri: string;
};

const Image: React.FC<ImageProps> = ({ uri }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(uri);
        const data = await response.json();
        setImageUrl(data.image);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchData();
  }, [uri]);

  if (!imageUrl) return null;

  return <img src={imageUrl} alt="NFT Image" className="h-24" />;
};

export default Image;
