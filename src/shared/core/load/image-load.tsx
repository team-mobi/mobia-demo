import { useTheme } from "@emotion/react";
import React, { useState } from "react";

type CarClassesImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageLoad: React.FC<CarClassesImageProps> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTheme();

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <div
          css={{
            backgroundColor: t.colors.gray[1],
            width: props.style?.width,
            height: props.style?.height,
          }}
        />
      )}
      <img {...props} onLoad={handleImageLoad} />
    </div>
  );
};

export default ImageLoad;
