import { css } from "@emotion/react";
import styled from "@emotion/styled";

const getSpacingStyles = (
  spacing: number[] | number,
  type: "margin" | "padding"
) => {
  if (Array.isArray(spacing)) {
    switch (spacing.length) {
      case 1:
        return `${type}: ${spacing[0]}px;`;
      case 2:
        return `${type}: ${spacing[0]}px ${spacing[1]}px;`;
      case 3:
        return `${type}: ${spacing[0]}px ${spacing[1]}px ${spacing[2]}px;`;
      case 4:
        return `${type}: ${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px;`;
      default:
        return `${type}: 0px;`;
    }
  }
  return `${type}: ${spacing}px;`;
};

export const Box = styled.div<{
  margin?: number | number[];
  padding?: number | number[];
}>`
  ${({ margin }) =>
    css`
      ${getSpacingStyles(margin || 0, "margin")}
    `}
  ${({ padding }) =>
    css`
      ${getSpacingStyles(padding || 0, "padding")}
    `}
`;
