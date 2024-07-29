import { CSSObject } from "@emotion/react";

type Props = {
  x?: number;
  y?: number;
  style?: CSSObject;
};

const Spacer: React.FC<Props> = ({ x, y, style }) => (
  <div
    css={{
      width: x,
      height: y,
      ...style,
    }}
  />
);

export default Spacer;
